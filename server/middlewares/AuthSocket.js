import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const socketAuth = async (error, socket, next) => {
  try {
    if (error) return next(error);
    const authToken = socket.request.cookies.token;
    if (!authToken) {
      return next(new Error("NOT AUTHORIZED"));
    }
    const tokenDecode = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(tokenDecode.id);
    if (!user) {
      return next(new Error("NOT AUTHORIZED"));
    }
    socket.user = user;
    next();
  } catch (error) {
    console.log("Error in socket auth", error);
    next(new Error("Authentication error"));
  }
};
