import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Container, Paper, Stack, Typography } from "@mui/material";
import AppBar from "../../components/shared/AppBar";
import { Group as GroupIcon, Person as PersonIcon } from "@mui/icons-material";
import Widgets from "../../components/shared/Widget/Widgets";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Container component={"main"}>
        <AppBar />
        <Stack
          direction={"row"}
          spacing={"1.5rem"}
          flexWrap={"wrap"}
          height={"52vh"}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "0rem 2rem",
              borderRadius: "1rem",
              width: "100%",
              height: "57vh",
              maxWidth: "38rem",
            }}
          >
            <Typography variant="h5" margin={"1rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={[23, 56, 76, 16]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: "57vh",
              // width: "100%",
              // maxWidth: "20rem",
            }}
          >
            <DoughnutChart
              value={[23, 66]}
              labels={["Single Chats", "Group Chats"]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        <Widgets />
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
