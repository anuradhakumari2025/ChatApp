import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { faker, simpleFaker } from "@faker-js/faker";

export const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    let chatCount = 0; // Counter to track the number of chats created


    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (chatCount >= numChats) break; // Stop if the desired number of chats is reached

        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );

        chatCount++; // Increment the chat counter
      }

      if (chatCount >= numChats) break; // Stop outer loop if the desired number of chats is reached
      
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

        if(!members.includes(randomUser._id.toString())){
          members.push(randomUser._id)
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
