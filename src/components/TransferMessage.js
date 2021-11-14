import React, { useEffect, useState } from "react";
import { subscribe } from "./pubsub";
import { TransferEvent } from "./project-events";
const broadcast = new BroadcastChannel("channel-123");

const TransferMessage = () => {
  const [message, setMessage] = useState("");

  broadcast.onmessage = event => {
    setMessage(event.data.msg);
    console.log("broadcast: ", event.data.msg);
  };

  useEffect(() => {
    const handle = subscribe(TransferEvent, ({ msg }) => {
      setMessage(msg);
    });

    return function cleanup() {
      handle.unsubscribe();
    };
  });
  return <p style={{ color: "red", fontSize: "14px" }}>{message}</p>;
};

export default TransferMessage;
