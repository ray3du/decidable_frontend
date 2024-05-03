import { FiMessageSquare } from "react-icons/fi";
import { FaArtstation, FaUserPlus } from "react-icons/fa";

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
        style={{ display: "flex", flexDirection: "row", gap: 10, margin: 6 }}
      >
        <div>
          <FaUserPlus color="green" fontSize={18} />
        </div>
        <div>
          <b>You</b>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "lightgray", // Different background colors for right and left messages
          borderRadius: "0px 0px 0px 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
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
          <p style={{ fontWeight: "bold", ...paragraphStyle }}>
            {data?.user_response}
          </p>
        </div>
      </div>
      {data?.ai_response && (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              margin: 6,
            }}
          >
            <div>
              <FaArtstation color="blue" fontSize={18} />
            </div>
            <div>
              <b>Decidable AI</b>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e2e0e0", // Different background colors for right and left messages
              borderRadius: "0px 0px 0px 0px", // Curved borders based on alignment
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
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
        </>
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
