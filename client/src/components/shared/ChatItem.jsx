import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <>
      {/* Link to navigate to the chat page; on right-click, trigger chat deletion */}
      <Link
        sx={{
          padding: "0",
        }}
        to={`/chat/${_id}`}
        onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      >
        <div
          style={{
            display: "flex", // Horizontal layout
            gap: "1rem", // Space between avatar and text
            alignItems: "center", // Vertical centering
            padding: "1rem",
            backgroundColor: sameSender ? "black" : "unset", // Highlight if it's the same sender
            color: sameSender ? "white" : "unset",
            position: "relative", // For positioning online dot
          }}
        >
          {/* Avatar section */}
          <AvatarCard avatar={avatar} />

          {/* Chat name and new message info */}
          <Stack>
            <Typography> {name} </Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert?.count} New Message </Typography>
            )}
          </Stack>

          {/* Green dot indicator for online users */}
          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </div>
      </Link>
    </>
  );
};


export default memo(ChatItem);
