import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import BackgroundSync from "./components/BackgroundSync";

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
      .then(res => setUsers(res))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {users && JSON.stringify(users)}
        </p>
        <BackgroundSync sampleApi={sampleApi}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => addCache([sampleApi])}>Register Router</button>
      </header>
    </div>
  );
}

export default App;
