import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  const getAllPlayers = async () => {
    const resp = await fetch('/api/getPlayers');
    const playersArr = await resp.json();
    const players = playersArr.map(player => player.data).sort((a, b) => (a.high_score < b.high_score) ? 1 : -1);
    setPlayers(players);
  }

  useEffect(() => {
    getAllPlayers();
  }, [])

  return (
    <div>
      <h3>Leaderboard:</h3>
      {players.length && players.map((player, idx) => {
        return <p key={idx}>{player.nickname}: {player.high_score}</p>
      })}
    </div>
  )
}