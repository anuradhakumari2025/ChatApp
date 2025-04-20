import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import { CurveButton, SearchField } from "../styles/StyledComponents";

// AppBar component displaying admin icon, search field, current date/time, and notification icon
const AppBar = () => {
  return (
    // MUI Paper component used as a container with shadow and padding
    <Paper
      elevation={3}
      sx={{
        padding: "1rem 1.5rem",
        margin: "0.9rem 0",
        borderRadius: "1rem",
      }}
    >
      {/* Stack to arrange child components horizontally with spacing */}
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {/* Admin panel icon */}
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "2.5rem",
          }}
        />

        {/* Custom search input field */}
        <SearchField placeholder="Search..." />

        {/* Custom curved button for triggering search */}
        <CurveButton>Search</CurveButton>

        {/* Empty space to push the date/time and notification icon to the right */}
        <Box flexGrow={1} />

        {/* Current date and time using moment.js */}
        <Typography>{moment().format("MMMM Do YYYY,h:mm:ss a")} </Typography>

        {/* Notification icon */}
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
};

export default AppBar;
