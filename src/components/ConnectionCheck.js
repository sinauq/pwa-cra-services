import React, { useState,useEffect } from "react";

const ConnectionCheck = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    getStatus()
  }, [])
  
  function getStatus() {
    var xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      "https://weatherapi-com.p.rapidapi.com/forecast.json?q=tehran&days=3"
    );

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 0) setStatus("You're offline");
      else setStatus("You're online");
    };
    xhr.send();
  }

  return (
    <div>
      <button onClick={getStatus}>check connection</button>
      <p style={{ color: "red", fontSize: "14px" }}>{status}</p>
    </div>
  );
};

export default ConnectionCheck;
