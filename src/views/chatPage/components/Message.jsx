const Message = ({ alignment }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: alignment === "right" ? "flex-end" : "flex-start",
        alignItems: alignment === "right" ? "flex-end" : "flex-start",
        marginBottom: "10px", // Add some margin between messages
      }}
    >
      <div
        style={{
          backgroundColor: alignment === "right" ? "#92c070" : "#69a5cc", // Different background colors for right and left messages
          borderRadius:
            alignment === "right" ? "24px 0px 24px 10px" : "0px 10px 24px 24px", // Curved borders based on alignment
          padding: "10px",
          maxWidth: "70%", // Limit message width to 70% of the container
          wordWrap: "break-word", // Wrap long messages
        }}
      >
        {alignment === "right" ? (
          <p style={paragraphStyle}>Is it okay to go back to your ex?</p>
        ) : (
          <p style={paragraphStyle}>
            It might be okay but its also important to move forward as a person
          </p>
        )}
      </div>
    </div>
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
