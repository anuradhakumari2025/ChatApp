import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setupAuthListener } from './services/authService';  

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Setup listener and get unsubscribe function
    const unsubscribe = setupAuthListener(setUser);
  
    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();  // Unsubscribe when the component is unmounted
      }
    };
  }, []);
  
  useEffect(() => {
    if (user === null) {
      navigate('/'); // Redirect if no user
    }else{
      navigate('/chat')
    }
  }, [user, navigate]);
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
