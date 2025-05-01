import express from 'express';
import { acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, register, searchUser, sendFriendRequest } from '../controllers/UserController.js';
import {  singleAvatar } from '../configs/multer.js';
import authUser from '../middlewares/AuthUser.js';
import { acceptRequestValidator, loginValidator, registerValidator,  sendRequestValidator,  validateHandler } from '../lib/validators.js';

const userRouter = express.Router()

userRouter.post("/register",singleAvatar,registerValidator(),validateHandler,register)
userRouter.post("/login",loginValidator(),validateHandler,login)
userRouter.get("/profile",authUser,getMyProfile)
userRouter.get('/logout',authUser,logout)
userRouter.get('/search',authUser,searchUser)
userRouter.put('/send-request',authUser,sendRequestValidator(),validateHandler,sendFriendRequest)
userRouter.put('/accept-request',authUser,acceptRequestValidator(),validateHandler,acceptFriendRequest)
userRouter.get('/notifications',authUser,getMyNotifications)
userRouter.get("/friends",authUser,getMyFriends)


export default userRouter