import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendToken from "../utils/SendToken.js";
import Chat from "../models/Chat.js";
import Request from "../models/Request.js";
import emitEvent from "../utils/EmitEvent.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/Events.js";
import { getOtherMembers } from "../lib/Helper.js";
import { handleError } from "../utils/ErrorHandler.js";

// Create a new user and save it in the database and cookie
export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const { name, bio, username, password } = req.body;

    const file = req.file; // Get the uploaded file from the request
    
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an avatar" });
    }

    // Placeholder avatar object (replace with actual Cloudinary upload later)
    const avatar = {
      public_id: "odhflk", // Public ID for the image
      url: "kdoilk", // URL for the image
    };

    // Create a new user in the database
    const newUser = await User.create({
      name,
      avatar,
      username,
      bio,
      password,
    });

    // Send token to client and respond with success message
    sendToken(res, newUser, 201, "User created successfully!");
  } catch (error) {
    // Send error response to client
    const { statusCode, message } = handleError(error);
    res.status(statusCode).json({ success: false, message });
  }
};

// Login existing user and send token if credentials are valid
export const login = async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user in the database by username and explicitly select the password field
    const user = await User.findOne({ username }).select("+password");

    // If user is not found, return error
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Compare entered password with hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // If credentials are valid, send a token and welcome message
    sendToken(res, user, 200, `Welcome back ${user.name}`);
  } catch (error) {
   // Send error response to client
   const { statusCode, message } = handleError(error);
   res.status(statusCode).json({ success: false, message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the authenticated user
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "No User found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      maxAge: 0,
      secure: true,
      sameSite: "none",
    });
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function to search users excluding those already in chat with current user
export const searchUser = async (req, res) => {
  try {
    // Extract the 'name' query parameter; default to empty string if not provided
    const { name = "" } = req.query;

    // Find all non-group chats where the current user is a member
    const myChats = await Chat.find({ groupChat: false, members: req.userId });

    // Flatten the members array from all these chats to get a list of all user IDs in those chats
    const allUsersOfMyChats = myChats.flatMap((chat) => chat.members);

    // Find users who are NOT in chat with current user and whose names match the search query (case insensitive)
    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersOfMyChats }, // Exclude users already in chats
      name: { $regex: name, $options: "i" }, // Case-insensitive partial match on name
    });

    // Map the found users to return only relevant fields (_id, name, avatar URL)
    const users = allUsersExceptMeAndFriends.map(({ _id, avatar, name }) => {
      return {
        _id,
        name,
        avatar: avatar.url, // Assuming avatar is stored as an object with a 'url' field
      };
    });

    // Return the result with success status
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // Log any error and return failure response
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function to handle sending a friend request
export const sendFriendRequest = async (req, res) => {
  try {
    // Extract the target user's ID from the request body
    const { userId } = req.body;

    // Check if a friend request already exists between the users (in either direction)
    const request = await Request.findOne({
      $or: [
        { sender: req.userId, reciever: userId },
        { sender: userId, reciever: req.userId },
      ],
    });

    // If a request already exists, return an error response
    if (request)
      return res
        .status(400)
        .json({ success: false, message: "Request already sent" });

    // Create a new friend request with the current user as sender
    await Request.create({
      sender: req.userId,
      reciever: userId,
    });

    // Emit a socket event to notify the receiver of the new request
    emitEvent(req, NEW_REQUEST, [userId]);

    // Send a success response
    return res.json({ success: true, message: "Friend request send" });
  } catch (error) {
    // Log the error and return a failure response
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function to accept or reject a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    // Extract requestId and accept flag from request body
    const { requestId, accept } = req.body;

    // Find the friend request by its ID and also fetch names of sender and receiver
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("reciever", "name");

    // If no such request found, return an error
    if (!request) {
      return res
        .status(400)
        .json({ success: false, message: "Request not found" });
    }
    // Check if the current user is the receiver of the request
    if (request.reciever._id.toString() !== req.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to accept this request",
      });
    }

    // If user chose to reject the request
    if (!accept) {
      await request.deleteOne(); // Delete the friend request
      return res.json({ success: true, message: "Friend request rejected" });
    }

    // If accepted, create members array for new chat (1-on-1 chat)
    const members = [request.sender._id, request.reciever._id];

    // Create chat and delete request in parallel
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name} and ${request.reciever.name}`,
      }),
      request.deleteOne(),
    ]);

    // Emit a socket event to refresh chat list for both users
    emitEvent(req, REFETCH_CHATS, members);

    // Send success response with senderId (can be used on frontend to update UI)
    return res.json({
      success: true,
      message: "Friend request accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    // Log and return any unexpected errors
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller to get all friend requests received by the current user
export const getMyNotifications = async (req, res) => {
  try {
    // Find all friend requests where the logged-in user is the receiver
    const requests = await Request.find({
      reciever: req.userId, // filter by current user's ID
    }).populate("sender", "name avatar"); // fetch sender's name and avatar for each request

    // Format each request to send only necessary data
    const allRequests = requests.map(({ _id, sender }) => {
      return {
        _id, // request ID
        sender: {
          _id: sender._id, // sender's user ID
          name: sender.name, // sender's name
          avatar: sender.avatar.url, // sender's avatar URL
        },
      };
    });

    // Return all formatted requests as JSON
    return res.status(200).json({
      success: true,
      allRequests,
    });
  } catch (error) {
    // Log and handle any errors
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const chatId = req.query.chatId; // Get chatId from the query parameters if provided

    // Find all one-to-one chats (not group chats) where the current user is a member
    const chats = await Chat.find({
      members: req.userId,
      groupChat: false,
    }).populate("members", "name avatar"); // Populate member details (name and avatar)

    // If no chats are found, return an error response
    if (!chats) {
      return res.json({ success: false, message: "No friends found" });
    }

    // For each chat, get the other person (friend) involved in the chat
    const friends = chats.map(({ members }) => {
      const otherMembers = getOtherMembers(members, req.userId); // Helper function to exclude the current user from the members
      return {
        _id: otherMembers._id, // Friend's user ID
        name: otherMembers.name, // Friend's name
        avatar: otherMembers.avatar.url, // Friend's avatar image URL
      };
    });

    // If a specific chatId is provided
    if (chatId) {
      const chat = await Chat.findById(chatId); // Find the chat by ID

      // Filter out users who are already part of that chat (to avoid adding the same user again)
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );

      // Return the filtered list of friends
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      // If no chatId is provided, return the complete friend list
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
