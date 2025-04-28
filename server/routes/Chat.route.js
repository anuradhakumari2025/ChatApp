import express from "express";
import authUser from "../middlewares/AuthUser.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/ChatController.js";
import { attachments } from "../configs/multer.js";

const chatRouter = express.Router();

chatRouter.post("/new", authUser, newGroupChat);
chatRouter.get("/my-chats", authUser, getMyChats);
chatRouter.get("/my-groups", authUser, getMyGroups);
chatRouter.put("/add-members", authUser, addMembers);
chatRouter.put("/remove-members", authUser, removeMembers);
chatRouter.delete("/leave/:id", authUser, leaveGroup);
chatRouter.post("/message", authUser, attachments, sendAttachments);
chatRouter
  .route("/:id")
  .get(authUser, getChatDetails)
  .put(authUser,renameGroup)
  .delete(authUser,deleteChat);
chatRouter.get("/message/:id",authUser,getMessages)

export default chatRouter;
