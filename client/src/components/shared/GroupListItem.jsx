import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link to={`?group=${_id}`}
    onClick={e=>{
      if(chatId === _id)
        e.preventDefault()
    }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        padding={"0.7rem"}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name} </Typography>
      </Stack>
    </Link>
  );
});
export default GroupListItem;
