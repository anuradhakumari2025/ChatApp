import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { matBlack } from "../../constants/color";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const IconBtns = () => {
  const navigate = useNavigate();

  // Navigate back to homepage
  const navigateBack = () => {
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          right: "1rem",
          top: "1rem",
          display: {
            sm: "none",
            xs: "block",
          },
        }}
      >
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Back Button */}
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.5)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default IconBtns;
