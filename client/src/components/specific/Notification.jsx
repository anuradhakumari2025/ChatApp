import {
  Avatar,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  Button,
  Skeleton,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/dummyChats";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscellaneous";
import toast from "react-hot-toast";

const Notification = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.miscellaneous);
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const { data, isLoading, error, isError } = useGetNotificationsQuery();

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      dispatch(setIsNotification(false));
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use socket here");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useErrors([{ error, isError }]);
  const handleClose = () => {
    dispatch(setIsNotification(false));
  };
  return (
    <Dialog open={isNotification} onClose={handleClose}>
      <Stack p={{ xs: "1rem", sm: "1rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  key={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={avatar} />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {`${name} send you a friend request`}
          </Typography>
          <Stack
            direction={{
              sm: "row",
            }}
          >
            <Button onClick={() => handler({ _id, accept: true })}>
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => handler({ _id, accept: false })}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default Notification;
