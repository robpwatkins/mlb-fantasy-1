import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <>
        <img src={user.picture} alt={user.name}/>
        <h3>{user.nickname}</h3>
        <h4>{user.email}</h4>
      </>
    )
  );
}