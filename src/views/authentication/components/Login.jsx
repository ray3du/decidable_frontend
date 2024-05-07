import { Button, Card, Form, Input, Row } from "antd";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatchHook } from "../../../utils/Customhooks";
import { login } from "../../../redux/actions/login/login";
import { useSelector } from "react-redux";

const Login = () => {
  const { ...hooks } = useDispatchHook();
  const { loading } = useSelector((state) => ({
    loading: state.loginReducer.loading,
  }));

  console.log("Loaidng \t", loading);
  const handleSubmit = (values) => {
    login(values, hooks);
  };

  return (
    <div className="login">
      <Card size="small" type="inner" className="cardWidth" style={cardStyle}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <p style={{ textAlign: "center" }}>
          Welcome to <i>Decidable.</i>
        </p>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row style={{ justifyContent: "right" }}>
            <Link>Forgot Password</Link>
          </Row>
          <Button
            style={{ width: "100%", marginTop: "10px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
          <Row
            style={{
              justifyContent: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Link style={{ color: "blue" }} to="/register">
              Dont have an account? Please Register
            </Link>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

const cardStyle = {
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", // Add a box shadow for lift effect
  borderRadius: "14px", // Optional: add border-radius for rounded corners
  paddingLeft: 15,
  paddingRight: 15,
};

export default Login;
