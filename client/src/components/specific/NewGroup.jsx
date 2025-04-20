import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/dummyChats";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  // Custom hook to handle group name input with validation
  const groupName = useInputValidation("");

  // Sample users list, assuming it’s coming from mock data or API
  const [members, setMembers] = useState(sampleUsers);

  // State to store selected member IDs
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Handler to add/remove members from selected list
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElem) => currElem !== id) // Remove if already selected
        : [...prev, id] // Add if not selected
    );
  };

  // Handler to perform group creation logic
  const submitHandler = () => {
    // You can call your backend API here to create the group with selected members and groupName.value
  };

  // Handler to close the Dialog/modal
  const closeHandler = () => {
    // You can navigate away or set some modal open state to false
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2.5rem" }} width={"25rem"}>
        {/* Dialog title */}
        <DialogTitle textAlign={"center"} variant="h5">
          New Group
        </DialogTitle>

        {/* Group name input field */}
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        {/* Members label */}
        <Typography
          variant="body1"
          sx={{ marginTop: "15px" }}
        >
          Members
        </Typography>

        {/* Listing all users to select as members */}
        <Stack>
          {members?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)} // Pass selected status
            />
          ))}
        </Stack>

        {/* Action buttons */}
        <Stack
          direction={"row"}
          marginTop={"1.5rem"}
          justifyContent={"space-between"}
        >
          {/* Cancel button */}
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>

          {/* Create button */}
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};



export default NewGroup;
