import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [seeAllClicked, setSeeAllClicked] = useState(false);

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
    <>
      <h3>Leaderboard:</h3>
      {!seeAllClicked 
        ? topFive.map((player, idx) => <p key={idx}>{player.nickname}: {player.high_score}</p>) 
        : allPlayers.map((player, idx) => <p key={idx}>{player.nickname}: {player.high_score}</p>)}
      <u onClick={() => setSeeAllClicked(!seeAllClicked)}>{!seeAllClicked ? 'see all' : 'see less'}</u>
    </>
  )
}