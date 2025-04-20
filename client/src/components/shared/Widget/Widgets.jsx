import React from "react";
import { Stack } from "@mui/material";
import Widget from "./Widget";
import {
  Person as PersonIcon,
  Group as GroupIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

const Widgets = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"1.2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      // margin={"2rem 0"}
      marginTop={"3.2rem"}
    >
      <Widget title={"Users"} value={3} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={4} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={30} Icon={<MessageIcon />} />
    </Stack>
  );
};

export default Widgets;
