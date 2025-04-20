import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import { dummyChat } from "../../constants/dummyChats.js";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams()
    const chatId = params.chatId
    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault();
      console.log(_id,groupChat,"Delete Chat")
    }
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
            <ChatList
              chats={dummyChat}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
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
           <Profile/> 
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
