import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";

// Chat component that handles messaging UI and real-time communication
const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null); // Ref for the message container
  const socket = getSocket(); // Get the initialized socket instance

  // Fetch chat details like members of the chat
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const [message, setMessage] = useState(""); // Current message input
  const [messages, setMessages] = useState([]); // New real-time messages
  const [page, setPage] = useState(1); // Page number for infinite scroll

  // Fetch paginated old messages for the given chat
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  // Custom hook to manage infinite scrolling for older messages
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  // Get chat members from chat details
  const members = chatDetails?.data?.chat?.members;

  // Collect API errors for central error handling
  const errors = [
    { isError: chatDetails?.isError, error: chatDetails?.error },
    { isError: oldMessagesChunk?.isError, error: oldMessagesChunk?.error },
  ];

  // Handle message form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // Avoid sending empty messages

    // Emit the new message to the server with chatId and members
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage(""); // Clear input after sending
  };

  // Callback to handle receiving new messages via socket
  const newMessageHandler = useCallback(
    (data) => {
      setMessages((prev) => {
        return [...prev, data.message]; // Append new message to list
      });
    },
    [chatId]
  );

  // Attach socket event listeners using a custom hook
  const eventHandler = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEvents(socket, eventHandler);

  // Combine old messages from API and new messages from socket
  const allMessages = [...oldMessages, ...messages];

  // Display any API-related errors using custom error handler
  useErrors(errors);

  // Show skeleton loader while fetching chat details
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      {/* Message display area */}
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowY: "auto", // Enable vertical scroll
        }}
      >
        {/* Render all messages using the MessageComponent */}
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      {/* Chat input form */}
      <form
        style={{
          height: "10%",
        }}
        onSubmit={handleSubmit}
      >
        <Stack
          height={"100%"}
          direction={"row"}
          alignItems={"center"}
          position={"relative"}
          padding={"1rem"}
        >
          {/* File attachment icon button */}
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          {/* Text input for typing messages */}
          <InputBox
            placeholder="Type Message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Send button with icon */}
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              padding: "0.5rem",
              marginLeft: "1rem",
              color: "white",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon
              sx={{
                paddingLeft: "2.5px",
              }}
            />
          </IconButton>
        </Stack>
      </form>

      {/* File options menu (upload image, video, etc.) */}
      <FileMenu />
    </>
  );
};

export default AppLayout(Chat);
