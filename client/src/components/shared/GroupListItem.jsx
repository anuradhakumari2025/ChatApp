import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    // Navigates to the group based on its ID, unless it's already the active chat
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id)
          e.preventDefault(); // Prevent navigation if already selected
      }}
    >
      {/* Horizontal stack of avatar and group name */}
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        padding={"0.7rem"}
      >
        {/* Displays avatars of the group */}
        <AvatarCard avatar={avatar} />
        
        {/* Group name */}
        <Typography>{name} </Typography>
      </Stack>
    </Link>
  );
});

export default GroupListItem;
