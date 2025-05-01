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
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";

const chatRouter = express.Router();

chatRouter.post("/new", authUser,newGroupValidator(),validateHandler, newGroupChat);
chatRouter.get("/my-chats", authUser, getMyChats);
chatRouter.get("/my-groups", authUser, getMyGroups);
chatRouter.put("/add-members", authUser,addMemberValidator(),validateHandler, addMembers);
chatRouter.put("/remove-members", authUser, removeMemberValidator(),validateHandler,removeMembers);
chatRouter.delete("/leave/:id", authUser, chatIdValidator(),validateHandler,leaveGroup);
chatRouter.post("/message", authUser,sendAttachmentValidator(),validateHandler, attachments, sendAttachments);
chatRouter
  .route("/:id")
  .get(authUser,chatIdValidator(),validateHandler, getChatDetails)
  .put(authUser,renameGroupValidator(),validateHandler,renameGroup)
  .delete(authUser,chatIdValidator(),validateHandler,deleteChat);
chatRouter.get("/message/:id",authUser,chatIdValidator(),validateHandler,getMessages)

export default chatRouter;
