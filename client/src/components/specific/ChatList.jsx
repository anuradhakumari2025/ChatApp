import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} 
    sx={{
      overflow:"auto",
      height:"100%"
    }}
    >
      {chats?.map((data, idx) => {
        const { _id, avatar, name, groupChat, members } = data;

        const currentMessageAlert = newMessageAlert?.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(_id));
        return (
          <ChatItem
          index={idx}
            newMessageAlert={currentMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
