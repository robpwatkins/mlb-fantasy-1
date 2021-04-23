import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <><u onClick={() => loginWithRedirect()}>Login</u><span> to join the leaderboard!</span></>;
}