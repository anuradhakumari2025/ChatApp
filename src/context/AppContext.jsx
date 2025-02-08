import { createContext, useState } from "react";
import React from "react";
import { getCurrentUser, updateUserLastSeen } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Function to fetch user data manually
  const loadUserData = async (id) => {
    try {
      setLoading(true);
      const user = await getCurrentUser(id);
      // console.log("User data are ", user);
      await updateUserLastSeen(user.id);

      // Fetch the updated user data
      const updatedUser = await getCurrentUser(id);
      setUserData(updatedUser);
      setLoading(false);
      if (updatedUser.avatar && updatedUser.name) {
        navigate("/chat");
      } else {
        navigate("/profile-update");
      }
      setInterval(() => {
        updateUserLastSeen(updatedUser.id);
      }, 60000); // 60000 milliseconds = 1 minute
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const value = {
    userData,
    setChatData,
    setUserData,
    chatData,
    loadUserData,
    loading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
