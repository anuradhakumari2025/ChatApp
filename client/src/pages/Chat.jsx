import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessages } from "../constants/dummyChats";
import MessageComponent from "../components/shared/MessageComponent";

// Dummy user object for current logged-in user
const user = {
  _id: "askkdlf",
  name: "Aniket",
};

const Chat = () => {
  // Ref for the message container (used for auto-scrolling etc.)
  const containerRef = useRef(null);

  return (
    <>
      {/* Message display area */}
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}          // Custom background color
        height={"90%"}               // Takes up 90% of the parent height
        sx={{
          overflowY: "hidden",       // Initially hidden (possibly for animation or performance)
          overflowY: "auto",         // Enables vertical scroll for messages
        }}
      >
        {/* Rendering each message using MessageComponent */}
        {sampleMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      {/* Chat input form */}
      <form
        style={{
          height: "10%",             // Remaining 10% of the container
        }}
      >
        <Stack
          height={"100%"}
          direction={"row"}          // Horizontal layout
          alignItems={"center"}      // Vertically center items
          position={"relative"}
          padding={"1rem"}
        >
          {/* File attachment button */}
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          {/* Text input field for typing messages */}
          <InputBox placeholder="Type Message here..." />

          {/* Send message button */}
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,       // Button background color
              padding: "0.5rem",
              marginLeft: "1rem",
              color: "white",
              "&:hover": {
                bgcolor: "error.dark", // Darker red on hover
              },
            }}
          >
            <SendIcon
              sx={{
                paddingLeft: "2.5px",  // Slight padding to align the icon
              }}
            />
          </IconButton>
        </Stack>
      </form>

      {/* Additional file options (e.g., upload menu) */}
      <FileMenu />
    </>
  );
};


export default AppLayout()(Chat);
