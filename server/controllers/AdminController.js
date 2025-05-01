import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const verifyAdmin = async(req,res)=>{
  try {
    res.status(200).json({success:true,admin:true})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;
    const isMatch = secretKey === process.env.ADMIN_SECRET_KEY;
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign(secretKey, process.env.JWT_SECRET);
    const options = {
      httpOnly: true,
      maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      secure: true,
      sameSite: "none",
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message: "Admin logged in successfully!",
      });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
 
    res.clearCookie("token", {
      httpOnly: true,
      maxAge: 0,
      secure: true,
      sameSite: "none",
    });
    return res.json({ success: true, message: "Admin logged out successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller to fetch and return all users along with their group and friend chat counts
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({});

    // Transform each user with additional details: group chat count and friend chat count
    const transformedUsers = await Promise.all(
      users.map(async ({ _id, name, username, avatar }) => {
        // Count the number of group chats and individual (friend) chats the user is part of
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: _id }),
          Chat.countDocuments({ groupChat: false, members: _id }),
        ]);

        // Return the user object with additional computed properties
        return {
          _id,
          name,
          username,
          avatar: avatar.url,
          groups,
          friends,
        };
      })
    );

    // Send a successful response with the transformed user data
    res.status(200).json({ success: true, users: transformedUsers });
  } catch (error) {
    // Log and return error in case of failure
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to fetch and return all chat details with enriched member and message info
export const getAllChats = async (req, res) => {
  try {
    // Fetch all chats and populate member and creator details (name and avatar)
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    // Transform each chat with additional details
    const transformedChats = await Promise.all(
      chats.map(async ({ members, creator, name, groupChat, _id }) => {
        // Count total number of messages in the chat
        const totalMessages = await Message.countDocuments({ chat: _id });

        // Construct a transformed chat object with required data
        return {
          name,
          _id,
          groupChat,
          avatar: members.slice(0, 3).map((member) => member.avatar.url), // Limit to first 3 avatars
          members: members.map(({ name, _id, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || "None", // Fallback if creator is null
            avatar: creator?.avatar.url || "", // Fallback to empty string if no avatar
          },
          totalMessages,
          totalMembers: members.length,
        };
      })
    );

    // Send a successful response with the transformed chat data
    res.json({ success: true, chats: transformedChats });
  } catch (error) {
    // Log and return error in case of failure
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to fetch and return all messages with sender and chat details
export const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages and populate sender (name, avatar) and chat (groupChat flag)
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    // Transform messages to return only required fields
    const transformedMessages = messages.map(
      ({ content, attachments, _id, sender, createdAt, chat }) => {
        return {
          content,
          createdAt,
          chat: chat._id, // ID of the associated chat
          chat: chat.groupChat, // Whether the chat is a group chat
          _id,
          attachments,
          sender: {
            _id: sender?._id || null, // Safe access in case sender is null
            avatar: sender?.avatar?.url || null,
            name: sender?.name || null,
          },
        };
      }
    );

    // Return the transformed messages in response
    res.json({ success: true, messages: transformedMessages });
  } catch (error) {
    // Log and respond with the error message
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [groupCount, usersCount, messagesCount, totalChatsCount] =
      await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const dayInMilliseconds = 1000 * 60 * 60 * 24;

    const last7DaysMessages = await Message.find({
      createdAt: {
        $gte: last7Days,
        $lte: today,
      },
    }).select("createdAt");

    const messages = new Array(7).fill(0);

    last7DaysMessages.forEach((message) => {
      const idxApprox =
        (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
      const idx = Math.floor(idxApprox);
      messages[6 - idx]++;
    });

    const stats = {
      groupCount,
      usersCount,
      messagesCount,
      totalChatsCount,
      messages,
    };
    res.json({ success: true, stats });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
