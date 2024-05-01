import { Col, List, Row, Typography } from "antd";

const data = [
  { title: 19 },
  { title: 19 },
  { title: 19 },
  { title: 19 },
  { title: 19 },
  { title: 19 },
];
const ChatApp = () => {
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col lg={8}>
          {data.map((d, i) => (
            <span key={i}>{d.title}</span>
          ))}
        </Col>
        <Col lg={16}>Chats</Col>
      </Row>
    </div>
  );
};

export default ChatApp;
