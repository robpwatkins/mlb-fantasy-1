import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [currentPlayer, setCurrentPlayer] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const createNewPlayer = async email => {
    const resp = await fetch('/api/createPlayer', {
      method: 'POST',
      body: JSON.stringify({
        email,
      })
    })
    const player = await resp.json();
    setCurrentPlayer(player);
    setHighScore(player.data.high_score);
  }

  const getCurrentPlayer = async email => {
    const resp = await fetch('/api/getPlayers', {
      method: 'POST',
      body: JSON.stringify({
          email
        })
      });
      const [player] = await resp.json();
      if (!player) {
        return createNewPlayer(email);
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
      if (isAuthenticated) {
        getCurrentPlayer(user.email);
      }
    }, [isAuthenticated])
    
    useEffect(() => {
      if (currentScore > highScore) {
        updateHighScore(currentScore);
        setHighScore(currentScore);
      }
    }, [currentScore])

  console.log(currentPlayer);
  return (
    <div>
      <p>High score: {currentPlayer.data && currentPlayer.data.high_score}</p>
      <span>{currentScore}</span>
      <button className="incrementer" onClick={() => setCurrentScore(currentScore + 1)}>+</button>
      <br/>
      {/* <button onClick={createNewPlayer}>TEst Create!</button> */}
      <br/>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;
