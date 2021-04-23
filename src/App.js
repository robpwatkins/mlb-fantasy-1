import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [players, setPlayers] = useState({});
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [currentPlayer, setCurrentPlayer] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const getAllPlayers = async () => {
    const resp = await fetch('/api/getPlayers');
    const playersArr = await resp.json();
    const players = playersArr.map(player => player.data);
    players.sort((a, b) => (a.high_score < b.high_score) ? 1 : -1);
    setPlayers(players);
  }

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

    useEffect(() => {
      getAllPlayers();
    }, [])

    useEffect(() => {
      if (isAuthenticated) {
        getCurrentPlayer(user.nickname);
      }
    }, [isAuthenticated])
    
    useEffect(() => {
      if (currentScore > highScore) {
        updateHighScore(currentScore);
        setHighScore(currentScore);
      }
    }, [currentScore])

  return (
    <div>
      <div>
        <h3>Leaderboard:</h3>
        {players.length && players.map((player, idx) => {
          return <p key={idx}>{player.nickname}: {player.high_score}</p>
        })}
      </div>
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
