import React, { useEffect } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useErrors } from "../../hooks/hook.jsx";

const AppLayout =  (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.miscellaneous);
    const {user} = useSelector((state) => state.auth);
    
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(_id, groupChat, "Delete Chat");
    };
    return (
      <>
        <Title />
        <Header />
        <div
          style={{
            // backgroundColor: "red",
            height: "calc(100vh - 4rem)",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "0.7fr 1.5fr 0.7fr",
          }}
        >
          {/* Left Side */}
          <div
            style={{
              // backgroundColor: "blue",
              height: "calc(100vh - 4rem)",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </div>

          {/* Middle Part */}
          <div
            style={{
              // backgroundColor: "yellow",
              height: "calc(100vh - 4rem)",
            }}
          >
            <WrappedComponent {...props} />
          </div>

          {/* Right Side */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.85)",
              height: "calc(100vh - 4rem)",
            }}
          >
            <Profile user={user} />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
