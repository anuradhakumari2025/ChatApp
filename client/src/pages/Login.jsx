import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { usernameValidator } from "../utils/validator";
import { bgGradient } from "../constants/color";

// Login Component - Handles both Login & Signup forms in a single UI
const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  // Custom hooks for form input validation and handling
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single"); // For profile image

  // Submit Handlers
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

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
          {isLogin ? (
            // Login Form
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                {/* Username Input */}
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {/* Password Input */}
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
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

                <Typography textAlign="center">Or</Typography>

                {/* Switch to Sign Up */}
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  onClick={() => setIsLogin(false)}
                >
                  Sign In Instead
                </Button>
              </form>
            </>
          ) : (
            // Sign Up Form
            <div style={{ width: "100%" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  marginBottom: "4px",
                }}
              >
                Sign Up
              </h2>

              <form style={{ width: "100%" }} onSubmit={handleSignUp}>
                {/* Avatar Upload */}
                <Stack position="relative" width="5rem" margin="auto">
                  <Avatar
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {/* Avatar Error */}
                {avatar.error && (
                  <Typography
                    m="0.5rem auto"
                    width="fit-content"
                    display="block"
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                {/* Name Input */}
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5px",
                    fontWeight: "300",
                  }}
                >
                  Name:
                </label>
                <input
                  style={{ width: "100%", padding: "8px 10px" }}
                  required
                  value={name.value}
                  onChange={name.changeHandler}
                />

                {/* Username Input */}
                <label
                  style={{
                    display: "block",
                    margin: "8px 0px ",
                    fontWeight: "300",
                  }}
                >
                  Username:
                </label>
                <input
                  style={{ width: "100%", padding: "8px 10px" }}
                  required
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                {/* Bio Input */}
                <label
                  style={{
                    display: "block",
                    margin: "8px 0px ",
                    fontWeight: "300",
                  }}
                >
                  Bio:
                </label>
                <input
                  style={{ width: "100%", padding: "8px 10px" }}
                  required
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                {/* Password Input */}
                <label
                  style={{
                    display: "block",
                    margin: "8px 0px ",
                    fontWeight: "300",
                  }}
                >
                  Password:
                </label>
                <input
                  style={{ width: "100%", padding: "8px 10px" }}
                  required
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography
                    m="0 0"
                    width="fit-content"
                    display="block"
                    color="error"
                    variant="caption"
                  >
                    {password.error}
                  </Typography>
                )}

                {/* Sign Up Button */}
                <Button
                  sx={{ marginTop: "30px", marginBottom: "5px" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Typography textAlign="center">Or</Typography>

                {/* Switch to Login */}
                <Button
                  sx={{ marginTop: "px" }}
                  fullWidth
                  variant="text"
                  onClick={() => setIsLogin(true)}
                >
                  Login Instead
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
