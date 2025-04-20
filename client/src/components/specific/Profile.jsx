import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  AlternateEmail as UserNameIcon,
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack
      spacing={"0.8rem"}
      paddingTop={"20px"}
      direction={"column"}
      alignItems={"center"}
    >
      <Avatar
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"GOod girl"} />
      <ProfileCard heading={"Username"} text={"Anu"} Icon={<UserNameIcon />} />
      <ProfileCard heading={"Name"} text={"Cute"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2025-04-03T18:30:00.000Z").fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={"1.5rem"}
    direction={"row"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text} </Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
