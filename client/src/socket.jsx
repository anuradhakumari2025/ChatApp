import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();
const getSocket =()=> useContext(SocketContext)

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };

// ✅ This code creates a SocketProvider component that initializes a socket connection using the socket.io-client library. The socket instance is then provided to the rest of the application through the SocketContext, allowing any component to access the socket instance using the getSocket hook. This is useful for managing real-time communication in a React application, such as chat applications or live notifications.