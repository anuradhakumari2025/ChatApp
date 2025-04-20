import { Menu } from '@mui/material'
import React from 'react'

// FileMenu Component: Displays a contextual menu for file options (like attachments)
const FileMenu = ({ anchorE1 }) => {
  return (
    // MUI Menu component - anchored to a provided element (currently closed with open={false})
    <Menu anchorEl={anchorE1} open={false}>
      {/* Menu content container */}
      <div
        style={{
          width: "10rem",            // Fixed width for the menu box
          padding: "0.5rem 1rem",    // Internal spacing for better layout
        }}
      >
        {/* Placeholder text - can be replaced with file options or tools */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
        voluptatem eaque nemo eveniet accusantium autem.
      </div>
    </Menu>
  );
};


export default FileMenu