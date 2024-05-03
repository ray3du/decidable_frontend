import { FiMessageSquare } from "react-icons/fi";

const Message = ({ data }) => {
  if (data?.length === 0)
    return (
      <div
        style={{
          backgroundColor: "#dcd8d8",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          fontSize: "16px",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
        }}
      >
        <FiMessageSquare
          style={{ fontSize: "36px", marginBottom: "10px", color: "green" }}
        />
        Please type your message below to start chatting!
      </div>
    );
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#92c070", // Different background colors for right and left messages
          borderRadius: "24px 0px 24px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px", // Add some margin between messages
        }}
      >
        <div
          style={{
            padding: "10px",
            maxWidth: "100%", // Limit message width to 70% of the container
            wordWrap: "break-word", // Wrap long messages
          }}
        >
          <p style={paragraphStyle}>{data?.user_response}</p>
        </div>
      </div>
      {data?.ai_response && (
        <div
          style={{
            backgroundColor: "#69a5cc", // Different background colors for right and left messages
            borderRadius: "0px 10px 24px 24px", // Curved borders based on alignment
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px", // Add some margin between messages
          }}
        >
          <div
            style={{
              padding: "10px",
              maxWidth: "100%", // Limit message width to 70% of the container
              wordWrap: "break-word", // Wrap long messages
            }}
          >
            <p style={paragraphStyle}>{data?.ai_response}</p>
          </div>
        </div>
      )}
    </>
  );
};

const paragraphStyle = {
  textAlign: "left",
  margin: 0,
  color: "black",
  fontSize: "15px",
  padding: 6,
};

export default Message;
