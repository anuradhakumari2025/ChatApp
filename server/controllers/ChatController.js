import { attachments } from "../configs/multer.js";
import {
  ALERT,
  NEW_ATTACHMENTS,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/Events.js";
import { deleteFilesFromCloudinary, getOtherMembers } from "../lib/Helper.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import emitEvent from "../utils/EmitEvent.js";

export const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body; // Destructure group name and members from request body

    // Check if at least 2 members are provided (excluding the creator)
    if (members.length < 2) {
      return res.json({
        success: false,
        message: "Group chat must have atleast 3 members!",
      });
    }

    const allMembers = [...members, req.userId]; // Add the current user (creator) to the members list

    // Create a new group chat in the database
    await Chat.create({
      name,
      groupChat: true, // Indicate this is a group chat
      members: allMembers, // List of all members including creator
      creator: req.userId, // Creator's userId
    });

    // Emit an alert event to all group members
    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);

    // Emit an event to refetch chat lists for the invited members
    emitEvent(req, REFETCH_CHATS, members);

    // Return success response
    return res.status(201).json({ success: true, message: "Group Created" });
  } catch (error) {
    console.log(error); // Log any server-side error
    res.json({ message: error.message, success: false }); // Send error response
  }
};

// Controller to get all chats for the logged-in user
export const getMyChats = async (req, res) => {
  try {
    // Find all chats where the current user is a member
    // Populate 'members' with their 'name' and 'avatar'
    const chats = await Chat.find({ members: req.userId }).populate(
      "members",
      "name avatar"
    );

    // Transform the fetched chat data for frontend consumption
    const transformedChats = chats.map(({ name, groupChat, members, _id }) => {
      // Get the other member(s) of the chat (excluding current user)
      const otherMembers = getOtherMembers(members, req.userId);

      return {
        _id, // Chat ID
        groupChat, // Boolean indicating if it's a group chat

        // For group chat, use avatars of up to first 3 members; for individual chat, use the other member's avatar
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMembers.avatar.url],

        // For group chat, show group name; for personal chat, show other user's name
        name: groupChat ? name : otherMembers.name,

        // List of member IDs excluding the current user
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.userId.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    // Send transformed chat list as response
    return res.status(201).json({ success: true, chats: transformedChats });
  } catch (error) {
    // Log and respond with error message if any exception occurs
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

// Controller to get all groups for the logged-in user
export const getMyGroups = async (req, res) => {
  try {
    // Find all chats where the current user is a member
    // Populate 'members' with their 'name' and 'avatar'
    const chats = await Chat.find({
      members: req.userId,
      groupChat: true,
      creator: req.userId,
    }).populate("members", "name avatar");

    // Transform the fetched chat data for frontend consumption
    const groups = chats.map(({ name, groupChat, members, _id }) => {
      return {
        _id, // Chat ID
        groupChat, // Boolean indicating if it's a group chat
        name, // show  user's name
        // Avatars of up to first 3 members
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
      };
    });

    // Send transformed chat list as response
    return res.status(201).json({ success: true, groups });
  } catch (error) {
    // Log and respond with error message if any exception occurs
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

// Controller to add members for the logged-in user
export const addMembers = async (req, res) => {
  try {
    const { chatId, members } = req.body; // Destructure chatId and new members from request body

    const chat = await Chat.findById(chatId); // Find the chat by ID

    // If chat not found, send error response
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // If the chat is not a group chat, send error response
    if (!chat.groupChat)
      return res.json({ success: false, message: "This is not a group chat" });

    // If no members provided, send error response
    if (!members || members.length < 1) {
      return res.json({ success: false, message: "Please Provide Members" });
    }

    // Only the group creator is allowed to add new members
    if (chat.creator.toString() !== req.userId.toString())
      return res.json({
        success: false,
        message: "You are not allowed to add members",
      });

    // Fetch all new members' names from User collection
    const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
    const allNewMembers = await Promise.all(allNewMembersPromise);

    // Filter out members already in the group to avoid duplication
    const uniqueMembers = allNewMembers
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id);

    // Add unique new members to the group
    chat.members.push(...uniqueMembers);

    // If group size exceeds 100 members, reject the addition
    if (chat.members.length > 100) {
      return res.json({
        success: false,
        message: "Group Members Limit reached",
      });
    }

    await chat.save(); // Save updated chat document

    // Prepare a string of all newly added member names
    const allUserName = allNewMembers.map((i) => i.name).join(",");
    console.log("All username are :- ", allUserName);

    // Emit an alert event notifying members about new additions
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUserName} has been added to ${chat.name} group`
    );

    // Emit an event to refresh chat data for all members
    emitEvent(req, REFETCH_CHATS, chat.members);

    // Send a success response with newly added members
    return res
      .status(201)
      .json({ success: true, message: "Members added successfully" });
  } catch (error) {
    // Log and respond with error message if any exception occurs
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

// Controller to remove members for the logged-in user
export const removeMembers = async (req, res) => {
  try {
    const { userId, chatId } = req.body; // Destructure userId (to remove) and chatId from request body

    // Fetch chat and user (to be removed) details simultaneously
    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

    // If chat is not found, return error
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // If chat is not a group chat, return error
    if (!chat.groupChat)
      return res.json({ success: false, message: "This is not a group chat" });

    // Only the group creator can remove members
    if (chat.creator.toString() !== req.userId.toString())
      return res.json({
        success: false,
        message: "You are not allowed to add members",
      });

    // Ensure that after removal, the group still has at least 3 members
    if (chat.members.length < 3) {
      return res.json({
        success: false,
        message: "Group must have at least 3 members",
      });
    }

    // Remove the specified member from the group
    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );

    await chat.save(); // Save updated chat document

    // Emit an alert event notifying other members about the removal
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userThatWillBeRemoved.name} has been removed from ${chat.name} group`
    );

    // Emit an event to refresh chat data for all members
    emitEvent(req, REFETCH_CHATS, chat.members);

    // Send success response
    return res
      .status(200)
      .json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    // Log any caught errors and send error response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.id; // Get chat ID from request parameters

    const chat = await Chat.findById(chatId); // Find the chat by ID

    // If chat is not found, return an error response
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // If the chat is not a group chat, return an error
    if (!chat.groupChat)
      return res.json({ success: false, message: "This is not a group chat" });

    console.log("chat creator before leaving group", chat.creator);

    // Remove the current user from the members list
    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== req.userId.toString()
    );

    // Ensure that the group has at least 3 members after leaving
    if (remainingMembers.length < 3) {
      return res.json({
        success: false,
        message: "Group must have at least 3 members",
      });
    }

    // If the current user is the creator, assign a new creator randomly
    if (chat.creator.toString() === req.userId.toString()) {
      const randomElem = Math.floor(Math.random() * remainingMembers.length);
      const newCreator = remainingMembers[randomElem];
      chat.creator = newCreator;
      console.log("chat creator after leaving group", chat.creator);
    }

    // Update the members list by removing the current user
    chat.members = remainingMembers;

    // Save the updated chat and fetch the user who left the group
    const [user] = await Promise.all([
      User.findById(req.userId, "name"),
      chat.save(),
    ]);

    // Emit a real-time event notifying other members that the user has left
    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);

    // Return a success response
    return res
      .status(200)
      .json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    // Handle and log any errors
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const sendAttachments = async (req, res) => {
  try {
    const { chatId } = req.body; // Extract chatId from the request body

    // Fetch chat details and current user details simultaneously
    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.userId, "name"),
    ]);

    // If chat is not found, return error
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    const files = req.files || []; // Get uploaded files from the request (default to empty array if none)

    // If no files provided, return error
    if (files.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide attachments" });
    }

    // upload files here (Note: Actual upload logic is assumed to be handled elsewhere or missing)

    const attachments = []; // Initialize empty attachments array

    // Prepare message object to be stored in database
    const messageForDB = {
      content: "",
      attachments,
      sender: me._id,
      chat: chatId,
    };

    // Prepare message object for real-time emission with sender's name included
    const messageForRealTime = {
      ...messageForDB,
      sender: { _id: me._id, name: me.name },
    };

    // Create and save message in database
    const message = await Message.create(messageForDB);

    // Emit real-time event to all chat members about the new attachments
    emitEvent(req, NEW_ATTACHMENTS, chat.members, {
      message: messageForRealTime,
      chatId,
    });

    // Emit another real-time event to alert about a new message
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
      chatId,
    });

    // Send success response with the created message
    return res.status(200).json({ success: true, message });
  } catch (error) {
    // Catch and log any errors, and send error response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();

      if (!chat) return res.json({ success: false, message: "Chat not found" });

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

      res.status(200).json({ success: true, chat });
    } else {
      const chat = await Chat.findById(req.params.id);

      if (!chat)
        return res
          .status(404)
          .json({ success: false, message: "Chat not found" });
      res.status(200).json({ success: true, chat });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//3:19:17 -> testing

export const renameGroup = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    if (!chat.groupChat)
      return res
        .status(402)
        .json({ success: false, message: "This is not a group chat" });

    if (chat.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to rename the group",
      });
    }

    chat.name = name;
    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    res
      .status(200)
      .json({ success: true, message: "Group renamed successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//3:23:00 -> testing

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    const members = chat.members;
    if (chat.groupChat && chat.creator.toString() !== req.userId.toString()) {
      return res.json({
        success: false,
        message: "You are not allowed to delete the group",
      });
    }

    if (!chat.groupChat && !chat.members.includes(req.userId.toString())) {
      return res.json({
        success: false,
        message: "You are not allowed to delete the group",
      });
    }

    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];

    messageWithAttachments.forEach(({ attachments }) => {
      attachments.forEach(({ public_id }) => {
        public_ids.push(public_id);
      });
    });

    await Promise.all([
      //delete files from Cloudinary
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    res
      .status(200)
      .json({ success: true, message: "Chat deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//3:33:10

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    const limit = 20;

    const skip = (page - 1) * limit;

    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / limit);

    res
      .status(200)
      .json({ success: true, messages: messages.reverse(), totalPages });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//3:41:00
