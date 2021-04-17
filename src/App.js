import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState();

  const getCount = async () => {
    const resp = await fetch('/api/getCount');
    const data = await resp.json();
    console.log(data);
    setHighScore(data[0].data.high_score);
  }

  useEffect(() => {
    getCount();
  })

  return (
    <div>
      <p>High score: {highScore}</p>
      <span>{count}</span>
      <button className="incrementer" onClick={() => setCount(count + 1)}>+</button>
      <br/>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
