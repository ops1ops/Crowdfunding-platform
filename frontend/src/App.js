import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
        .then(res => res.json())
        .then(users => setUsers(users));
  });

  return (
    <div className="App">
      <ul>
        {users.map(el => (
            <li key={el.id}>{el.id + " 223 " + el.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
