import React from "react";
import { Grid } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { grayColor } from "../../constants/color";
import { Navigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const isAdmin = true
  if(!isAdmin) return <Navigate to={"/admin"}/>
  return (
    <Grid
      container
      sx={{
        width: "100%",
      }}
      height={"100vh"}
    >
      <Grid size={3}>
        <AdminSidebar />
      </Grid>

      <Grid
        size={9}
        sx={{
          bgcolor: grayColor,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
