import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  AlternateEmail as UserNameIcon,
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/feature";

const Profile = ({user}) => {
  return (
    <Stack
      spacing={"0.8rem"}
      paddingTop={"20px"}
      direction={"column"}
      alignItems={"center"}
    >
      <Avatar
      src={transformImage(user?.avatar?.url)}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} Icon={<UserNameIcon />} />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
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
