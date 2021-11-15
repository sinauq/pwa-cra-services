import React, { useState,useEffect } from "react";
const fakeApi = "https://weatherapi-com.p.rapidapi.com/forecast.json?q=tehran&days=3"
const ConnectionCheck = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    getStatus()
  }, [])
  
  function getStatus() {
    var xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      fakeApi
    );

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) {
        return;
      }
      setStatus(xhr.status === 0 ? "You're offline" : "You're online");
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
