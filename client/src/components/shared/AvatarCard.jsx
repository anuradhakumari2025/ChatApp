import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/feature";

// AvatarCard component to render a group of avatars with overlap styling
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    // Stack used to arrange avatars horizontally with slight spacing
    <Stack direction={"row"} spacing={0.5}>
      
      {/* Group wrapper to handle avatar stacking (though AvatarGroup isn't fully used here) */}
      <AvatarGroup
        sx={{
          position: "relative", // Allows absolute positioning of child avatars
        }}
      >
        {/* Container to limit the width and height of the avatar group */}
        <Box width={"5rem"} height={"3rem"}>
          
          {/* Mapping over the avatar array to render each avatar */}
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100} // Temporary unique key (not ideal for production)
              src={transformImage(i)} // Transforming image URL before setting as avatar source
              alt={`Avatar ${index}`} // Alt text for accessibility
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute", // Positioning avatars to overlap
                left: {
                  sm: `${index + 0.8}rem`, // Slight shift for each avatar on small screens and up
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};


export default AvatarCard;
