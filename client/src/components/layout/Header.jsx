import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import React, { Suspense, useState, lazy, use } from "react";
import { orange } from "../../constants/color";
import axios from "axios";
import { server } from "../../constants/config.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsNotification, setIsSearch } from "../../redux/reducers/miscellaneous.js";

const Search = lazy(() => import("../specific/Search"));
const Notification = lazy(() => import("../specific/Notification"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const { isSearch,isNotification } = useSelector((state) => state.miscellaneous);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const dispatch = useDispatch();

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const manageGroup = () => {
    console.log("manage group");
    navigate("/groups");
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
  };
  const logout = async () => {
    console.log("logout");
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(userNotExists());
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const tooltip = [
    { title: "Search", fun: openSearchDialog, icon: <SearchIcon /> },
    { title: "New Group", fun: openNewGroup, icon: <AddIcon /> },
    { title: "Manage Group", fun: manageGroup, icon: <GroupIcon /> },
    { title: "Notification", fun: openNotification, icon: <NotificationIcon /> },
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
