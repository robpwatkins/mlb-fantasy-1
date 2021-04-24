import React from 'react';

export default function PersonalBest({ isAuthenticated, highScore, currentScore, currentPlayer}) {
  return (
    (isAuthenticated && highScore) ? (
      <p>{currentScore <= highScore 
        ? `Personal best: ${currentPlayer.data && currentPlayer.data.high_score}` 
        : 'New personal best!'}
      </p>
    ) : null
  )
}