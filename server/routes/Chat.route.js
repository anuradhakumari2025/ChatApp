import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import { addMembers, getMyChats, getMyGroups, newGroupChat } from '../controllers/ChatController.js';
const chatRouter = express.Router()

chatRouter.post("/new",authUser,newGroupChat)
chatRouter.get("/my-chats",authUser,getMyChats)
chatRouter.get("/my-groups",authUser,getMyGroups)
chatRouter.put("/add-members",authUser,addMembers)

export default chatRouter