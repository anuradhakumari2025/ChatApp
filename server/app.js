import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/User.routes.js";
import connectDB from "./configs/mongodb.js";
import dotenv from "dotenv";
import chatRouter from "./routes/Chat.route.js";
import adminRouter from "./routes/Admin.route.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/Events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/Helper.js";
import { NEW_MESSAGE_ALERT } from "./constants/Events.js";
import Message from "./models/Message.js";
import cors from "cors";
import cloudinary from "./configs/cloudinary.js";
import { corsOptions } from "./configs/corsOptions.js";
import { socketAuth } from "./middlewares/AuthSocket.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

const userSocketIDs = new Map();

const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

await connectDB();
// console.log("Cloudinary connected successfully", cloudinary);

app.get("/", (req, res) => {
  res.send("Good Day!");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/admin", adminRouter);

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (error) => {
    if (error) {
      console.error("Error in cookieParser:", error);
      return next(error);
    }
    await socketAuth(error, socket, next);
  });
});

io.on("connection", (socket) => {
  const user = socket.user;

  userSocketIDs.set(user._id.toString(), socket.id);
  // console.log("User Socket IDs", userSocketIDs);// ✅
  // console.log("User Connected", socket.id);// ✅

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      content: message,
      chat: chatId,
      sender: user._id,
    };
    const membersSocket = getSockets(members);
    // console.log("Members array:", members);//✅
    // console.log("Members Socket IDs:", membersSocket);//✅
    membersSocket.forEach((socketId) => {
      if (socketId) {
        io.to(socketId).emit(NEW_MESSAGE, {
          chatId,
          message: messageForRealTime,
        });
        // console.log("Emitting NEW_MESSAGE:", {
        //   chatId,
        //   message: messageForRealTime,
        // });//✅
        io.to(socketId).emit(NEW_MESSAGE_ALERT, {
          chatId,
        });
      }
    });
    
    

    try {
      await Message.create(messageForDb);
    } catch (error) {
      console.log("Error in saving message", error);
    }
    // console.log("New Message ", messageForRealTime);//✅
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

httpServer.listen(port, () => {
  console.log(`Server is listening at port ${port} in ${envMode} mode`);
});

export { envMode, userSocketIDs };
