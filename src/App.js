import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState();

  const getHighScore = async () => {
    const resp = await fetch('/api/getPlayers');
    const players = await resp.json();
    setHighScore(players.find(player => player.data.email === 'test@tester.com').data.high_score);
  }

  useEffect(() => {
    getHighScore();
  }, [])

  return (
    <div>
      <p>High score: {highScore}</p>
      <span>{currentScore}</span>
      <button className="incrementer" onClick={() => setCurrentScore(currentScore + 1)}>+</button>
      <br/>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
