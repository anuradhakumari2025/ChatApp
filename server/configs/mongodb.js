import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB database connection established successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
