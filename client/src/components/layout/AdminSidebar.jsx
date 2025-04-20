import { Stack, Typography, styled } from "@mui/material";
import React from "react";
import { adminTabs } from "../../constants/route";
import { useLocation, Link as LinkComponent } from "react-router-dom";
import { matBlack } from "../../constants/color";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 1.5rem;
  padding: 0.1rem 1rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const AdminSidebar = () => {
  const logoutHandler = () => {
    console.log("logout");
  };
  const location = useLocation();
  return (
    <Stack
      width={"100%"}
      direction={"column"}
      p={"1.5rem 2rem"}
      spacing={"2rem"}
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        Anuk
      </Typography>

      <Stack spacing={"0.3rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                backgroundColor: matBlack,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={"2rem"}
              sx={{
                padding: "0.6rem 1rem",
              }}
            >
              {tab.icon && <tab.icon />}
              {/* Render the icon as a JSX element */}
              <Typography fontSize={"1.2rem"}>{tab.name} </Typography>
            </Stack>
          </Link>
        ))}

        {/* Logout Icon */}
        <Link onClick={logoutHandler}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"2rem"}
            sx={{
              padding: "0.6rem 1rem",
            }}
          >
            <ExitToAppIcon />
            <Typography fontSize={"1.2rem"}>Logout </Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

export default AdminSidebar;
