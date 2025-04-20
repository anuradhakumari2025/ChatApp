import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import GroupList from "../components/specific/GroupList";
import { dummyChat, sampleUsers } from "../constants/dummyChats";
import IconBtns from "../components/shared/IconBtns";
import UserItem from "../components/shared/UserItem";
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const Groups = () => {
  const [isEdit, setIsEdit] = useState(false); // Toggles group name edit mode
  const chatId = useSearchParams()[0].get("group"); // Get group id from query params
  const [groupName, setGroupName] = useState("Group Name"); // Displayed group name
  const [groupNameUpdatedVal, setGroupNameUpdatedVal] = useState(""); // Editable group name field
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false); // Toggle for delete dialog
  const addMember = false; // Controls add member dialog (set true to open)

  // Update group name and close edit mode
  const updateGroupName = () => {
    setIsEdit(false);
    // Call backend to update name here (if needed)
  };

  // Open confirmation dialog for deleting group
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  // Close confirmation dialog
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const removeMemberHandler = (id)=>{
    console.log("remove member",id)
  }

  // Open Add Member Dialog handler (to be implemented)
  const openAddMemberHandler = () => {};

  // Delete group handler (to be implemented)
  const deleteHandler = () => {};

  // Group action buttons (Delete & Add Member)
  const ButtonGroup = (
    <Stack direction={"row"} spacing={"3rem"} p={"2rem 3rem"}>
      <Button
        startIcon={<DeleteIcon />}
        variant="outlined"
        color="error"
        size="large"
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        onClick={openAddMemberHandler}
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
      >
        Add Member
      </Button>
    </Stack>
  );

  // Editable / static group name display
  const GroupName = (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      direction={"row"}
      padding={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedVal}
            onChange={(e) => setGroupNameUpdatedVal(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  // Runs when `chatId` changes (loads the group name)
  useEffect(() => {
    if(chatId){
      setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedVal(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedVal("");
      setIsEdit(false);
    };
  }, [chatId]);

  return (
    <Grid container spacing={2} height={"100vh"}>
      {/* Left Panel: Group List */}
      <Grid
        size={4}
        
      >
        <GroupList myGroups={dummyChat} chatId={chatId} />
      </Grid>

      {/* Right Panel: Group Details */}
      <Grid
        size={8}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        <IconBtns />

        {/* If group name is loaded, show details */}
        {groupName && (
          <>
            {GroupName}

            {/* Members Label */}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            {/* Members List (Add your member components here) */}
            <Stack
              maxWidth={"45rem"}
              // bgcolor={"bisque"}
              width={"100%"}
              height={"50vh"}
              overflow={"auto"}
              spacing={"2rem"}
              boxSizing={"border-box"}
              padding={"1rem"}
            >
              {/* Members */}
              {sampleUsers.map((i) => (
                <UserItem key={i._id} user={i} isAdded styling={{
                  boxShadow:"0 0 0.5rem 0.5rem rgba(0,0,0,0.2)",
                  padding:"0.6rem 1.6rem",
                  borderRadius:"1rem"
                }} handler={removeMemberHandler}/>
              ))}
            </Stack>

            {/* Delete / Add Buttons */}
            {ButtonGroup}
          </>
        )}
      </Grid>

      {/* Add Member Dialog (conditionally rendered) */}
      {addMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
    </Grid>
  );
};

export default Groups;
