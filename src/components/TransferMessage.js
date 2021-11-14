import React, { useState } from "react";
const broadcast = new BroadcastChannel("channel-123");

const TransferMessage = () => {
  const [message, setMessage] = useState("");

  broadcast.onmessage = event => {
    setMessage(event.data.msg);
    console.log(event.data.msg);
  };

  return <p style={{ color: "red", fontSize: "14px" }}>{message}</p>;
};

export default TransferMessage;
