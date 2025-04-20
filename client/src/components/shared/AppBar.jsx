import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { CurveButton, SearchField } from "../styles/StyledComponents";

const AppBar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem 1.5rem",
        margin: "0.9rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "2.5rem",
          }}
        />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography>{moment().format("MMMM Do YYYY,h:mm:ss a")} </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
};

export default AppBar;
