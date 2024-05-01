import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Menu, theme } from "antd";
const { Header, Sider, Content, Footer } = Layout;
import "./chatapp.css";

const ChatApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="chatapp">
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "Why do I have a bald Head",
              },
              {
                key: "2",
                label: "How do I get good in coding",
              },
              {
                key: "3",
                label: "Pregnancy signs!",
              },
              {
                key: "4",
                label: "How to get rich!",
              },
            ]}
          />
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
            <h4 style={{ marginTop: "-1px", color: "green" }}>
              <i>Decidable AI</i>
            </h4>
          </Header>
          <Content
            style={{
              position: "relative",
              overflowY: "auto",
              flex: "1",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              // Hide scroll bars but allow scrolling
              WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
              scrollbarWidth: "none", // Firefox
              MsOverflowStyle: "none", // IE and Edge
              marginLeft: 50,
              marginRight: 50,
              border: "2px solid whitesmoke",
              padding: 10,
            }}
          >
            {/* Sample content to fill the area */}
            {[...Array(20)].map((_, index) => (
              <p key={index}>Content line {index + 1}</p>
            ))}
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
