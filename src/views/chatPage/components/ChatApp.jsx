import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Menu, Popconfirm, theme } from "antd";
const { Header, Sider, Content } = Layout;
import "./chatapp.css";
import Message from "./Message";
import { LuFolderEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/prompt/test/");
    ws.onopen = (event) => {
      ws.send();
    };
    ws.onmessage = function (event) {
      console.log(event);
      try {
        setMessages([]);
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("decidable_token");
    navigate("/login");
  };
  return (
    <div className="chatapp">
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.ItemGroup
              key="sub"
              title={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <LuFolderEdit
                    style={{ marginRight: "8px", color: "gold", fontSize: 22 }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                    }}
                  >
                    <i>{collapsed ? "DH" : "Decidable History"}</i>
                  </span>
                </span>
              }
            >
              <Menu.Item key="1">Why do I have a bald Head</Menu.Item>
              <Menu.Item key="2">How do I get good in coding</Menu.Item>
              <Menu.Item key="3">Pregnancy signs!</Menu.Item>
              <Menu.Item key="4">How to get rich!</Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <h4 style={{ marginTop: "-1px", color: "green", paddingRight: 10 }}>
              <i style={{ marginRight: "16px" }}>Decidable AI</i>
              <Popconfirm
                title="Wanna Logout?"
                placement="leftBottom"
                onConfirm={handleLogout}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ borderRadius: "5px 5px 5px 5px" }}
                >
                  Logout
                </Button>
              </Popconfirm>
            </h4>
          </Header>
          <Content
            style={{
              position: "relative",
              overflowY: "auto",
              flex: "1",
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
              // Hide scroll bars but allow scrolling
              WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
              scrollbarWidth: "none", // Firefox
              MsOverflowStyle: "none", // IE and Edge
              marginLeft: 50,
              marginRight: 50,
              paddingTop: 10,
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
              <Message alignment="left" />
              <Message alignment="right" />
            </div>
          </Content>
          <div
            style={{
              background: colorBgContainer,
              padding: "16px",
              borderTop: "1px solid #e8e8e8",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Type a message"
              style={{ flex: "1", marginRight: "16px" }}
            />
            <SendOutlined style={{ fontSize: 20, color: "#1890ff" }} />
          </div>
        </Layout>
      </Layout>
    </div>
  );
};
export default ChatApp;
