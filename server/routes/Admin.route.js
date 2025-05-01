import express from "express";
import {
  adminLogin,
  adminLogout,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getDashboardStats,
  verifyAdmin,
} from "../controllers/AdminController.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import authAdmin from "../middlewares/AuthAdmin.js";

const adminRouter = express.Router();

adminRouter.get('/',verifyAdmin)
adminRouter.post("/login", adminLoginValidator(), validateHandler, adminLogin);
adminRouter.get("/logout", adminLogout);
adminRouter.get("/users", authAdmin, getAllUsers);
adminRouter.get("/chats", authAdmin, getAllChats);
adminRouter.get("/messages", authAdmin, getAllMessages);
adminRouter.get("/dashboard", authAdmin, getDashboardStats);

export default adminRouter;
