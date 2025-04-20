import { Stack, Typography } from "@mui/material";
import React from "react";
import GroupListItem from "../shared/GroupListItem";

const GroupList = ({width = "100%", myGroups = [], chatId}) => {
  // console.log(chatId)
  return (
    <Stack  sx={{
      display: {
        xs: "none",
        sm: "block",
      },
      height:"100vh",
      overflowY:"auto"
    }}       bgcolor={"bisque"}
>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups Found
        </Typography>
      )}
    </Stack>
  );
};

export default GroupList;
