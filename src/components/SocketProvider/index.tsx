"use client";
import React, { ReactNode, useEffect } from "react";

import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { socketConnect, socketDisconnect } from "@/slice/config.slice";
import EVENTS from "@/events";

const SocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socketConnection = io(
      process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL || "",
      {
        path: "/api/socket",
      }
    );
    socketConnection.on(EVENTS.CONNECTION, () => {
      dispatch(socketConnect({ socket: socketConnection }));
    });
    return () => {
      dispatch(socketDisconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
export default SocketProvider;
