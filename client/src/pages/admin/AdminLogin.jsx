import { useInputValidation, useStrongPassword } from "6pp";
import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { bgGradient } from "../../constants/color";
import { Navigate } from "react-router-dom";

const isAdmin = true

const AdminLogin = () => {
  const submitHandler = () => {
    e.preventDefault();
  };
  const secretKey = useInputValidation("")

  if(isAdmin) return <Navigate to={'/admin/dashboard'}/>
  return (
    <div
      style={{
        backgroundImage: bgGradient,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "350px" }}>
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 40px",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
         

            {/* Password Input */}
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            {/* Login Button */}
            <Button
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
