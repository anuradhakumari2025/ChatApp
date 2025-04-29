import express from "express";
import cookieParser from "cookie-parser"
import userRouter from "./routes/User.routes.js";
import connectDB from "./configs/mongodb.js";
import dotenv from "dotenv";
import chatRouter from "./routes/Chat.route.js";
import { createUser } from "./seeders/UserSeeder.js";
import { createMessages, createMessagesInAChat } from "./seeders/MessageSeeder.js";
import { createGroupChats, createSingleChats } from "./seeders/ChatSeeder.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000

//Middleware
app.use(express.json())
app.use(cookieParser())

await connectDB()
//Creating fake data in mongodb
// createUser(10)
// createSingleChats(10)
// createGroupChats(10)
// createMessages(10)
// createMessagesInAChat("6810cfc2db0137c7f670d3fc",20)

app.get("/", (req, res) => {
  res.send("Good Day!");
});
app.use("/user",userRouter)
app.use("/chat",chatRouter)

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
