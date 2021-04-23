import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [highScore, setHighScore] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  const createNewPlayer = async nickname => {
    const resp = await fetch('/api/createPlayer', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
      })
    })
    const player = await resp.json();
    setCurrentPlayer(player);
    setHighScore(player.data.high_score);
  }

  const getCurrentPlayer = async nickname => {
    const resp = await fetch('/api/getPlayer', {
      method: 'POST',
      body: JSON.stringify({
          nickname
        })
      });
      const [player] = await resp.json();
      if (!player) {
        return createNewPlayer(nickname);
      }
      setCurrentPlayer(player);
      setHighScore(player.data.high_score);
    }
    
    useEffect(() => {
      if (isAuthenticated) {
        getCurrentPlayer(user.nickname);
      }
    }, [isAuthenticated])

  return (
    <div>
      <Leaderboard />
      <hr/>
      {isAuthenticated &&
        <p>{currentScore <= highScore 
        ? `Personal best: ${currentPlayer.data && currentPlayer.data.high_score}` : 'New personal best!'}</p>}
      <span>{currentScore}</span>
      <button className="incrementer" onClick={() => setCurrentScore(currentScore + 1)}>+</button>
      <br/>
      <Profile />
      {!isAuthenticated 
        ? <LoginButton /> 
        : <LogoutButton currentPlayer={currentPlayer} newScore={currentScore} />}
    </div>
  );
}

export default App;
