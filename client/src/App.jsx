import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoaders from "./components/layout/LayoutLoaders";
const MessageManagement = lazy(()=>import("./pages/admin/MessageManagement")) ;
const ChatManagement =lazy(()=>import("./pages/admin/ChatManagement")) ;
const UserManagement =lazy(()=>import("./pages/admin/UserManagement")) ;
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))

const App = () => {
  const user = true;
  return (
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
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/users" element={<UserManagement/>}/>
          <Route path="/admin/chats" element={<ChatManagement/>}/>
          <Route path="/admin/messages" element={<MessageManagement/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
