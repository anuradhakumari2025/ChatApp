import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { faker, simpleFaker } from "@faker-js/faker";

export const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);

    console.log("Chats created successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    
    for (let i = 0; i <numChats; i++) {
      const numMembers = simpleFaker.number.int({min:3,max:users.length})
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIdx = Math.floor(Math.random() * users.length)
        const randomUser = users[randomIdx]

        if(!members.includes(randomUser)){
          members.push(randomUser)
        }
      }
      const chat = Chat.create({
        groupChat:true,
        name:faker.lorem.words(1),
        members,
        creator:members[0]
      })
      chatsPromise.push(chat)
    }
    await Promise.all(chatsPromise);

    console.log("Chats created successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
