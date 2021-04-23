import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton({ currentPlayer, newScore }) {

  const updateHighScore = async () => {
    fetch('/api/updatePlayers', {
      method: 'PATCH',
      body: JSON.stringify({
        currentPlayer, newScore
      })
    })
  }

  const handleClick = () => {
    updateHighScore();
    logout();
  }

  const { logout } = useAuth0();

  return <u onClick={handleClick}>quit and logout</u>;
}