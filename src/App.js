import React, { useState, useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PersonalBest from './components/PersonalBest';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const createNewUser = async (nickname) => {
    const response = await fetch('/api/create_user', {
      method: 'POST',
      body: JSON.stringify({ nickname })
    });
    const user = await response.json();
    setCurrentUser(user);
  }

  const getCurrentUser = useCallback(async (nickname) => {
    const response = await fetch('/api/get_user', {
      method: 'POST',
      body: JSON.stringify({
          nickname
        })
      });
      const [user] = await response.json();
      if (!user) return createNewUser(nickname);
      setCurrentUser(user);
    }, [])
    
    useEffect(() => {
      if (isAuthenticated) getCurrentUser(user.nickname);
    })

  return (
    <>
      <Leaderboard />
      <hr/>
      <PersonalBest
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
      />
      <br/>
      <Profile />
      {!isAuthenticated 
        ? <LoginButton /> 
        : <LogoutButton currentUser={currentUser} />}
    </>
  );
}