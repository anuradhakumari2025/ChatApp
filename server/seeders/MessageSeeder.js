import { faker } from "@faker-js/faker";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);
    console.log("Messaged created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const createMessagesInAChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagePromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);
    console.log("Messaged created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//3:44:00
