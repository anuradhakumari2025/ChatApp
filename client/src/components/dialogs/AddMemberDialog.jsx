import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/dummyChats'
import UserItem from '../shared/UserItem'

// AddMemberDialog Component: Dialog for selecting and adding members to a chat
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

  // State to hold all potential members (sample data used here)
  const [members, setMembers] = useState(sampleUsers);

  // State to track selected member IDs
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Toggle selection of a member
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElem) => currElem !== id)  // Remove if already selected
        : [...prev, id]                                // Add if not selected
    );
  };

  // Closes the dialog
  const closeHandler = () => {
    setSelectedMembers([])
    setMembers([])
  };

  // Submit selected members (logic to be implemented)
  const addMemberSubmitHandler = () => {
    closeHandler()
  };

  return (
    // Material UI Dialog - opens by default
    <Dialog open onClose={closeHandler}>
      <Stack width={"25rem"} padding={"0.5rem"}>
        
        {/* Dialog Title */}
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        {/* Members List */}
        <Stack padding={"0.5rem"}>
          {members.length > 0 ? (
            // Display list of users if available
            members.map((i) => (
              <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={
                selectedMembers.includes(i._id)
              }/>
            ))
          ) : (
            // Fallback if no users are available
            <Typography textAlign={"center"} paddingBottom={"0.8rem"}>
              No Friends
            </Typography>
          )}
        </Stack>

        {/* Action Buttons */}
        <Stack
          direction={"row"}
          padding={"0.8rem 0rem"}
          justifyContent={"space-evenly"}
        >
          {/* Cancel button to close the dialog */}
          <Button variant="outlined" color="error" onClick={closeHandler}>
            Cancel
          </Button>

          {/* Submit button to confirm member addition */}
          <Button
            variant="contained"
            disabled={isLoadingAddMember}  // Disabled while loading
            onClick={addMemberSubmitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};


export default AddMemberDialog