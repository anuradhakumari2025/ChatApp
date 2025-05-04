import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/miscellaneous";
import {
  useAcceptFriendRequestMutation,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.miscellaneous);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest,isLoading] = useAsyncMutation(useSendFriendRequestMutation);
  const [acceptRequest] = useAcceptFriendRequestMutation()

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
   sendFriendRequest("Sending friend request...", {
    userId: id,
   }
   )
  };

  const handleClose = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          if (data.success) {
            setUsers(data.users);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }, 800);
    return () => clearTimeout(timeOutId);
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={handleClose}>
      <Stack
        paddingTop={"0.4rem"}
        paddingLeft={"2rem"}
        paddingRight={"2rem"}
        direction={"column"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"} fontSize={"1.8rem"}>
          Find Gigglemate
        </DialogTitle>
        <TextField
          label=""
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          value={search.value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoading}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
