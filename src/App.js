import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const sampleApi = 'https://reqres.in/api/users';

function App({ broadcast }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(sampleApi)
      .then(res => res.json())
      .then(res => setUsers(res))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {users && JSON.stringify(users)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            console.log('clicked')
            broadcast.postMessage({
              type: 'MSG_ID',
              location: sampleApi
            })
          }}>Register Router</button>
      </header>
    </div>
  );
}

export default App;
