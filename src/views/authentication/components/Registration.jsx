import { Button, Card, Form, Input, message, Row } from "antd";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatchHook } from "../../../utils/Customhooks";
import { register } from "../../../redux/actions/registration/register";
import { useSelector } from "react-redux";

const Registration = () => {
  const { ...hooks } = useDispatchHook();
  const { loading } = useSelector((state) => ({
    loading: state.registrationReducer.loading,
  }));
  const handleSubmit = (values) => {
    if (values?.password !== values?.confirm_password)
      return message.warning("Passwords do not match!");
    register(values, hooks);
  };
  return (
    <div className="login">
      <Card size="small" type="inner" style={cardStyle} className="cardWidth">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <p style={{ textAlign: "center" }}>
          Put in the below details to register
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
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            style={{ width: "100%", marginTop: "10px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Register
          </Button>
          <Row
            style={{
              justifyContent: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Link style={{ color: "darkblue" }} to="/login">
              Already have an account? Please Login
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

export default Registration;
