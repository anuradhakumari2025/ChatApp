import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import React, { Suspense, useState,lazy } from "react";
import { orange } from "../../constants/color";
const Search = lazy(() => import("../specific/Search"));
const Notification = lazy(() => import("../specific/Notification"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    // console.log("hello new group");
  };
  const manageGroup = () => {
    console.log("manage group");
    navigate("/groups");
  };
  const notification = () => {
    setIsNotification((prev) => !prev);
  };
  const logout = () => {
    console.log("logout");
  };

  const tooltip = [
    { title: "Search", fun: openSearchDialog, icon: <SearchIcon /> },
    { title: "New Group", fun: openNewGroup, icon: <AddIcon /> },
    { title: "Manage Group", fun: manageGroup, icon: <GroupIcon /> },
    { title: "Notification", fun: notification, icon: <NotificationIcon /> },
    {
      title: "Logout",
      fun: logout,
      icon: <LogoutIcon />,
    },
  ];
  return (
    <>
      <Box height={"4rem"} sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Anuk
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              {tooltip.map((item, idx) => (
                <Tooltip key={idx} title={item.title}>
                  <IconButton color="inherit" size="large" onClick={item.fun}>
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

export default Header;
