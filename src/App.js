import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";

const sampleApi = "https://reqres.in/api/users";

async function addCache(urls) {
  const myCache = await window.caches.open("response-cache");
  await myCache.addAll(urls);
  console.log("added cache", myCache);
}

function App({ broadcast }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(sampleApi)
      .then(res => res.json())
      .then(res => setUsers(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{users && JSON.stringify(users)}</p>
        <Form sampleApi={sampleApi} />
        <button onClick={() => addCache([sampleApi])}>Register Router</button>
      </header>
    </div>
  );
}

export default App;
