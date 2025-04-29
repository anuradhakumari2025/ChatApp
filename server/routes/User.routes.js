import express from 'express';
import { getMyProfile, login, logout, register, searchUser } from '../controllers/UserController.js';
import {  singleAvatar } from '../configs/multer.js';
import authUser from '../middlewares/AuthUser.js';
import { registerValidator,  validateHandler } from '../lib/validators.js';
const userRouter = express.Router()

userRouter.post("/register",singleAvatar,registerValidator(),validateHandler,register)
userRouter.post("/login",login)
userRouter.get("/profile",authUser,getMyProfile)
userRouter.get('/logout',authUser,logout)
userRouter.get('/search',authUser,searchUser)


export default userRouter