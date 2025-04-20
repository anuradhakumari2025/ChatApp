import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

// Component to display a confirmation dialog before deleting a group
const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    // Dialog component from MUI, opens/closes based on the 'open' prop
    <Dialog open={open} onClose={deleteHandler}>
      
      {/* Title of the dialog */}
      <DialogTitle>Confirm Delete</DialogTitle>
      
      {/* Main content of the dialog */}
      <DialogContent>
        <DialogContentText>
          Are you sure, you want to delete this group?
        </DialogContentText>
      </DialogContent>

      {/* Action buttons at the bottom of the dialog */}
      <DialogActions>
        {/* Cancel button - calls 'handleClose' to close the dialog */}
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>

        {/* Delete button - calls 'deleteHandler' to proceed with deletion */}
        <Button variant="outlined" color="error" onClick={deleteHandler}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ConfirmDeleteDialog;
