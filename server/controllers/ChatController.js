import { ALERT, REFETCH_CHATS } from "../constants/Events.js";
import { getOtherMembers } from "../lib/Helper.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

import emitEvent from "../utils/EmitEvent.js";

export const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (members.length < 2) {
      return res.json({
        success: false,
        message: "Group chat must have atleast 3 members!",
      });
    }
    // console.log("req.user:", req.userId);

    const allMembers = [...members, req.userId];
    await Chat.create({
      name,
      groupChat: true,
      members: allMembers,
      creator: req.userId,
    });
    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);
    return res.status(201).json({ success: true, message: "Group Created" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
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
    const { chatId, members } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.json({ success: false, message: "Chat not found" });
    if (!chat.groupChat)
      return res.json({ success: false, message: "This is not a group chat" });
    if (chat.creator.toString() !== req.userId.toString())
      return res.json({
        success: false,
        message: "You are not allowed to add members",
      });

    const allMembersPromise = members.map((i) => User.findById(i, "name"));
    const allMembers = await Promise.all(allMembersPromise);

    chat.members.push(...allMembers.map((i) => i._id));

    if (chat.members.length > 100) {
      return res.json({
        success: false,
        message: "Group  Members Limit reached",
      });
    }

    await chat.save();

    return res.status(201).json({ success: true, groups });
  } catch (error) {
    // Log and respond with error message if any exception occurs
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
