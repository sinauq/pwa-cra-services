import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ConnectionCheck from "./components/ConnectionCheck";
const sampleApi = "https://reqres.in/api/users";

function App({ broadcast }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch(sampleApi)
      .then(res => res.json())
      .then(res => setUsers(res));
  }, []);

  async function addCache(urls) {
    const myCache = await window.caches.open("response-cache");
    await myCache.addAll(urls);
    console.log("added cache", myCache);
    setMessage("added cache")
  }

  return (
    <div className="App">
      <header className="App-header">
        <ConnectionCheck />
        <p>{users && JSON.stringify(users)}</p>
        <button onClick={() => addCache([sampleApi])}>Register Router</button>
        <p style={{ color: "red", fontSize: "14px" }}>{message}</p>
        <Form sampleApi={sampleApi} />
      </header>
    </div>
  );
}

export default App;
