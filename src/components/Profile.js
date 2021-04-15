import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name}/>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        {/* {JSON.stringify(user, null, 2)} */}
      </div>
    )
  );
}