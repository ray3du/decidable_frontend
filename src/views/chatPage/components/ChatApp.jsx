import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Layout,
  Menu,
  Popconfirm,
  Typography,
  theme,
  message,
  Spin,
} from "antd";
const { Header, Sider, Content } = Layout;
import "./chatapp.css";
import Message from "./Message";
import { LuFolderEdit, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "../../../redux/actions/history/history";
import { useDispatchHook } from "../../../utils/Customhooks";
import { FaPenAlt } from "react-icons/fa";

const ChatApp = () => {
  const navigate = useNavigate();
  const { ...hooks } = useDispatchHook();
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [dataValue, setData] = useState(null);

  const { historyMessages, historyLoader } = useSelector((state) => ({
    historyMessages: state.historyReducer.data,
    historyLoader: state.historyReducer.loading,
  }));
  let newArray = [...historyMessages];
  let reversedArray = newArray.reverse();

  useEffect(() => {
    history(hooks);
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("decidable_token");
    if (ws == null) {
      setWs(
        new WebSocket(
          `wss://ca29-154-159-237-154.ngrok-free.app/ws/prompt/test/?token=${token}`
        )
      );
    }
    if (ws) {
      ws.onopen = () => {
        console.log("Connected");
      };
      ws.onmessage = function (event) {
        let data = JSON.parse(event.data);
        try {
          setMessages((prevState) => [...prevState, data?.message]);
          setLoading(false);
          setMessage("");
          history(hooks);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
        //clean up function
        return () => {
          ws.close();
        };
      };
    }
  }, [ws]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (message) => {
    if (message === "new_chat") {
      history(hooks);
      setMessages([]);
      setData(null);
    } else {
      setData(message);
      setMessages(message?.messages);
    }
  };

  const handleChange = (value) => {
    setMessage(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("decidable_token");
    navigate("/login");
  };

  const handleSubmit = () => {
    if (messageValue === "")
      return message.warning("Please input message to submit!");

    ws.send(
      JSON.stringify({
        message: messageValue,
        conversation_id: dataValue?.id || null,
      })
    );
    setLoading(true);
  };
  return (
    <div className="chatapp">
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={300}
          display={collapsed ? "none" : "block"}
          style={{ overflowY: "auto", height: "100vh" }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["new_chat"]}>
            <Menu.ItemGroup
              key="sub"
              title={
                <span
                  style={{
                    position: "sticky", // Make the title sticky
                    top: 0, // Stick it to the top of the container
                    zIndex: 1, // Ensure it stays above other content
                    background: "rgba(0,0,0,0.8)", // Add background color for visibility
                    padding: "8px 16px", // Add padding for spacing
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4em",
                    }}
                  >
                    <LuFolderEdit
                      style={{
                        marginRight: "8px",
                        color: "gold",
                        fontSize: 22,
                      }}
                    />
                    <i>{collapsed ? "DH" : "Decidable History"}</i>
                  </span>
                </span>
              }
            >
              <div
                style={{
                  fontSize: "15px",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Menu.Item
                  key={"new_chat"}
                  style={{ color: "lightblue" }}
                  onClick={() => handleMenuItemClick("new_chat")}
                >
                  New Chat{" "}
                  <FaPenAlt color="magenta" style={{ marginLeft: "20px" }} />
                </Menu.Item>
              </div>
              {historyLoader ? (
                <Spin style={{ display: "flex", justifyContent: "center" }} />
              ) : (
                reversedArray.map((message, i) => {
                  return (
                    <Menu.Item
                      key={i}
                      onClick={() => handleMenuItemClick(message)}
                    >
                      {message?.title}
                    </Menu.Item>
                  );
                })
              )}
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
              alignItems: "center",
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
            <div>
              <Popconfirm
                title="Wanna Logout?"
                placement="leftBottom"
                onConfirm={handleLogout}
                okText="Yes"
                cancelText="No"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.6em",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <Typography.Text>Logout</Typography.Text>
                  <LuLogOut color="black" />
                </div>
              </Popconfirm>
            </div>
          </Header>
          <Content
            style={{
              position: "relative",
              overflowY: "auto",
              flex: "1",
              // background: "lightgray",
              // borderRadius: borderRadiusLG,
              // Hide scroll bars but allow scrolling
              WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
              scrollbarWidth: "none", // Firefox
              MsOverflowStyle: "none", // IE and Edge
              marginLeft: 30,
              marginRight: 30,
              paddingTop: 10,
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {messages?.length === 0 ? (
                <Message key={"new"} data={[]} />
              ) : (
                messages &&
                messages.map((data, i) => (
                  <Message
                    key={i}
                    data={data}
                    alignment={data.api_response ? "left" : "right"}
                  />
                ))
              )}
            </div>
          </Content>
          <div style={cardStyle}>
            <Input
              disabled={loading}
              placeholder="Type a message"
              style={{
                flex: "1",
                marginRight: "16px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              onChange={(e) => handleChange(e.target.value)}
              value={messageValue}
            />
            {messageValue &&
              (loading ? (
                <Spin />
              ) : (
                <SendOutlined
                  style={{
                    fontSize: 20,
                    color: "#1890ff",
                    height: "54px",
                  }}
                  onClick={() => handleSubmit()}
                />
              ))}
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

const cardStyle = {
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", // Add a box shadow for lift effect
  borderRadius: "10px", // Optional: add border-radius for rounded corners
  paddingLeft: 15,
  paddingRight: 15,
  padding: "16px",
  borderTop: "1px solid #e8e8e8",
  display: "flex",
  alignItems: "center",
  height: "54px",
};

export default ChatApp;
