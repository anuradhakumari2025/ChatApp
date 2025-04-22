import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendToken from "../utils/SendToken.js";

// Create a new user and save it in the database and cookie
export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const { name, bio, username, password } = req.body;

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
    // Log error in console for debugging
    console.log(error);

    // Send error response to client
    res.json({
      success: false,
      message: error.message,
    });
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
    // Log any error that occurs during the process
    console.log(error);

    // Return error response to the client
    res.json({ success: false, message: error.message });
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

export const searchUser = async (req, res) => {
  try {
    const {name} = req.query;
    return res.status(200).json({
      success:true,
      message:name
    })
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
