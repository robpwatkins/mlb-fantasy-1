import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [currentPlayer, setCurrentPlayer] = useState({});

  const getCurrentPlayer = async () => {
    const resp = await fetch('/api/getPlayers');
    const players = await resp.json();
    let player = players.find(player => player.data.email === 'test@tester.com');
    setCurrentPlayer(player);
    setHighScore(player.data.high_score);
  }

  const updateHighScore = async (newScore) => {
    console.log(currentPlayer);
    fetch('/api/updatePlayer', {
      method: 'PATCH',
      body: JSON.stringify({
        currentPlayer, newScore
      })
    })
  }

  const handleClick = () => {
    setCurrentScore(currentScore + 1);
  }

  useEffect(() => {
    getCurrentPlayer();
  }, [])

  useEffect(() => {
    console.log(currentScore, highScore);
    if (currentScore > highScore) {
      // let newScore = currentScore;
      updateHighScore(currentScore);
      setHighScore(currentScore);
    }
  }, [currentScore])

  return (
    <div>
      <p>High score: {currentPlayer.data && currentPlayer.data.high_score}</p>
      <span>{currentScore}</span>
      <button className="incrementer" onClick={handleClick}>+</button>
      <br/>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
