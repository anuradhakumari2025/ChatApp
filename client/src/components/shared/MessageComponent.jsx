import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { blue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/feature";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { attachments = [], sender, createdAt, content } = message;
  // console.log(attachments)
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={blue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {/* Attachments */}

      {attachments.length > 0 &&
        attachments.map((attachment, idx) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={idx}>
              <a
                href={url}
                download
                target="_blank"
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file,url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
