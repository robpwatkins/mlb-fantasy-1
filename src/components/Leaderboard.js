import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [topFive, setTopFive] = useState([]);

  const getAllPlayers = async () => {
    const resp = await fetch('/api/getPlayers');
    const playersArr = await resp.json();
    const allPlayers = playersArr.map(player => player.data).sort((a, b) => (a.high_score < b.high_score) ? 1 : -1);
    setAllPlayers(allPlayers);
    setTopFive(allPlayers.filter((_, idx) => idx <= 4));
  }

  useEffect(() => {
    getAllPlayers();
  }, [])

  return (
    <div>
      <h3>Leaderboard:</h3>
      {topFive.length && topFive.map((player, idx) => {
        return <p key={idx}>{player.nickname}: {player.high_score}</p>
      })}
    </div>
  )
}