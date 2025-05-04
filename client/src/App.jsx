import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoaders from "./components/layout/LayoutLoaders";
import { server } from "./constants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import {Toaster} from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));


const App = () => {
  const {user,loader} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Checking user authentication...");
    axios
      .get(`${server}/api/v1/user/profile`,{withCredentials:true})
      .then(({data}) => {
        dispatch(userExists(data.user))
        console.log("Api response" ,data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(userNotExists())
      });
  }, [dispatch]);
  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          {/* Admin Path */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster/>
    </BrowserRouter>
  );
};

export default App;
