import { Paper, Typography, Stack } from "@mui/material";
import React from "react";

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      sx={{
        padding: "1rem 0.6rem",
        margin: "0.5rem 0",
        borderRadius: "1rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.9)",
            width: "4rem",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1.2rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Widget;
