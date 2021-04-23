import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';

function App() {
  const [players, setPlayers] = useState({});
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
    
    const updateHighScore = async (newScore) => {
      fetch('/api/updatePlayers', {
        method: 'PATCH',
        body: JSON.stringify({
          currentPlayer, newScore
        })
      })
    }

    // useEffect(() => {
    // }, [])
    
    useEffect(() => {
      if (isAuthenticated) {
        getCurrentPlayer(user.nickname);
      }
      // getAllPlayers();
      console.log('heyoo');
    }, [isAuthenticated])
    
    useEffect(() => {
      if (currentScore > highScore) {
        updateHighScore(currentScore);
        setHighScore(currentScore);
      }
    }, [currentScore])

  return (
    <div>
      <Leaderboard />
      <hr/>
      <p>Personal best: {currentPlayer.data && currentPlayer.data.high_score}</p>
      <span>{currentScore}</span>
      <button className="incrementer" onClick={() => setCurrentScore(currentScore + 1)}>+</button>
      <br/>
      <Profile />
      {!isAuthenticated && <LoginButton />}
      <LogoutButton />
    </div>
  );
}

export default App;
