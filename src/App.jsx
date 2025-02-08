import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setupAuthListener } from './services/authService';  
import { AppContext } from "./context/AppContext";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {loadUserData} = useContext(AppContext)

  useEffect(() => {
    // Setup listener and get unsubscribe function
    const unsubscribe = setupAuthListener(setUser);

    if (user === null) {
      navigate('/'); // Redirect if no user
    }else{
      navigate('/chat')
      // console.log(user)
      loadUserData(user.id)
    }
    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();  // Unsubscribe when the component is unmounted
      }
    };
  }, [user]);
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
}

export default App;
