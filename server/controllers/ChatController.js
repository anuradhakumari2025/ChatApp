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
import { handleError } from "../utils/ErrorHandler.js";

export const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body; // Destructure group name and members from request body

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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
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

    // console.log("chat creator before leaving group", chat.creator);

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
      // console.log("chat creator after leaving group", chat.creator);
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
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

export const sendAttachments = async (req, res) => {
  try {
    // Extract chatId from the request body
    const { chatId } = req.body;

    // Retrieve files from the request (if any), or default to an empty array
    const files = req.files || [];

    if (files.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide attachments" });
    }

    if (files.length > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Attachments can't be more than 5" });
    }

    // Fetch chat details and current user details (name only) in parallel
    const [chat, me] = await Promise.all([
      Chat.findById(chatId), // Get the chat by ID
      User.findById(req.userId, "name"), // Get the current user by ID, only fetching the name
    ]);

    // If the chat is not found, return an error response
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // If no files were provided, return a 400 error response
    if (files.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide attachments" });
    }

    // Placeholder for file upload logic
    // This is where you'd typically upload the files to a storage service like Cloudinary or AWS S3
    const attachments = []; // Initialize an array to store uploaded attachment info (e.g., URLs)

    // Prepare the message object for database storage
    const messageForDB = {
      content: "", // No text content since it's an attachment
      attachments, // Array of uploaded attachment references
      sender: me._id, // Sender ID
      chat: chatId, // Chat ID
    };

    // Prepare the message object for real-time use with the sender's name included
    const messageForRealTime = {
      ...messageForDB,
      sender: { _id: me._id, name: me.name }, // Include sender name for the frontend
    };

    // Save the message with attachments to the database
    const message = await Message.create(messageForDB);

    // Emit a real-time event to all chat members with the new attachment message
    emitEvent(req, NEW_ATTACHMENTS, chat.members, {
      message: messageForRealTime,
      chatId,
    });

    // Emit a separate alert event to notify users of a new message (used for notifications/badges)
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
      chatId,
    });

    // Respond with the saved message object
    return res.status(200).json({ success: true, message });
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

// Function to get chat details based on chat ID and optionally populate member details
export const getChatDetails = async (req, res) => {
  try {
    // Check if the 'populate' query parameter is set to "true"
    if (req.query.populate === "true") {
      // Find the chat by ID and populate the 'members' field with only 'name' and 'avatar'
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar") // Populate only selected fields
        .lean(); // Convert Mongoose document to a plain JavaScript object

      // If chat not found, send response with success: false
      if (!chat) return res.json({ success: false, message: "Chat not found" });

      // Format the 'members' array to return avatar URL instead of full avatar object
      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url, // Access nested avatar URL
      }));

      // Send success response with chat data
      res.status(200).json({ success: true, chat });
    } else {
      // If populate is not true, fetch the chat without populating member details
      const chat = await Chat.findById(req.params.id);

      // If chat not found, send 404 response
      if (!chat)
        return res
          .status(404)
          .json({ success: false, message: "Chat not found" });

      // Send success response with raw chat data
      res.status(200).json({ success: true, chat });
    }
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

export const renameGroup = async (req, res) => {
  try {
    // Extract chat ID from route parameters
    const chatId = req.params.id;

    // Extract new group name from request body
    const { name } = req.body;

    // Find the chat by ID
    const chat = await Chat.findById(chatId);

    // If chat not found, return 401 error
    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    // Check if the chat is a group chat
    if (!chat.groupChat)
      return res
        .status(402)
        .json({ success: false, message: "This is not a group chat" });

    // Ensure only the group creator can rename the group
    if (chat.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to rename the group",
      });
    }

    // Update the group's name
    chat.name = name;
    await chat.save(); // Save the updated chat

    // Emit an event to notify all group members to refetch their chat list
    emitEvent(req, REFETCH_CHATS, chat.members);

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Group renamed successfully!" });
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    // Extract chat ID from request parameters
    const chatId = req.params.id;

    // Find the chat in the database by ID
    const chat = await Chat.findById(chatId);

    // If chat doesn't exist, return an error
    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    const members = chat.members; // Store members for later use

    // If it's a group chat, only the creator is allowed to delete it
    if (chat.groupChat && chat.creator.toString() !== req.userId.toString()) {
      return res.json({
        success: false,
        message: "You are not allowed to delete the group",
      });
    }

    // If it's a one-to-one chat, only participants are allowed to delete it
    if (!chat.groupChat && !chat.members.includes(req.userId.toString())) {
      return res.json({
        success: false,
        message: "You are not allowed to delete the group",
      });
    }

    // Find all messages in the chat that have attachments
    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = []; // Initialize an array to collect Cloudinary public IDs

    // Loop through all attachments and collect their public IDs for deletion
    messageWithAttachments.forEach(({ attachments }) => {
      attachments.forEach(({ public_id }) => {
        public_ids.push(public_id);
      });
    });

    // Perform all deletion operations in parallel:
    await Promise.all([
      deleteFilesFromCloudinary(public_ids), // Delete files from Cloudinary
      chat.deleteOne(), // Delete the chat from database
      Message.deleteMany({ chat: chatId }), // Delete all messages from the chat
    ]);

    // Emit an event to notify all members to refetch their chat list
    emitEvent(req, REFETCH_CHATS, members);

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Chat deleted Successfully!" });
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id; // Extract chat ID from request parameters
    const { page = 1 } = req.query; // Extract page number from query (default is 1)

    // Find the chat to ensure it exists
    const chat = await Chat.findById(chatId);

    // If chat is not found, return error
    if (!chat)
      return res
        .status(401)
        .json({ success: false, message: "Chat not found" });

    const limit = 20; // Number of messages per page
    const skip = (page - 1) * limit; // Calculate number of documents to skip for pagination

    // Fetch messages and total count of messages in parallel
    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId }) // Find messages for the given chat
        .sort({ createdAt: -1 }) // Sort messages from newest to oldest
        .skip(skip) // Skip messages for pagination
        .limit(limit) // Limit the number of messages returned
        .populate("sender", "name") // Populate sender field with only the name
        .lean(), // Convert Mongoose documents to plain JavaScript objects
      Message.countDocuments({ chat: chatId }), // Get total message count for pagination
    ]);

    const totalPages = Math.ceil(totalMessagesCount / limit); // Calculate total number of pages

    // Return messages (reversed to show oldest first), along with total pages info
    res
      .status(200)
      .json({ success: true, messages: messages.reverse(), totalPages });
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};
