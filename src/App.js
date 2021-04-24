import React, { useState, useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

export default function App() {
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

  const getCurrentPlayer = useCallback(async nickname => {
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
    }, [])
    
    useEffect(() => {
      if (isAuthenticated) {
        getCurrentPlayer(user.nickname);
      }
    }, [isAuthenticated, getCurrentPlayer])

  return (
    <>
      <Leaderboard />
      <hr/>
      {isAuthenticated && (
        <p>{currentScore <= highScore 
          ? `Personal best: ${currentPlayer.data && currentPlayer.data.high_score}` 
          : 'New personal best!'}
        </p>)}
      <span>{currentScore}</span>
      <button onClick={() => setCurrentScore(currentScore + 1)}>+</button>
      <br/>
      <Profile />
      {!isAuthenticated 
        ? <LoginButton /> 
        : <LogoutButton currentPlayer={currentPlayer} newScore={currentScore} />}
    </>
  );
}