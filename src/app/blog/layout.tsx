"use client";
import React, { useEffect } from "react";
import { Button, Layout, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EVENTS from "@/events";
import { logout } from "@/slice/auth.slice";
import { googleLogout } from "@react-oauth/google";

const { Header, Content } = Layout;

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSelector((state: any) => state.config);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.BLOG_UPDATE, (payload: any) => {
        if (payload.type === "SUCCESS") {
          messageApi.open({
            type: "success",
            content: `${payload.payload.title} has been updated! Please refresh the page to view changes`,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleLogout = () => {
    dispatch(logout());
    googleLogout();
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Header className="bg-gray-800 text-white flex justify-between items-center p-4">
          <div className="text-2xl font-bold">Blog </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </Header>
        <Content className="h-screen">{children}</Content>
      </Layout>
    </>
  );
};

export default BlogLayout;
