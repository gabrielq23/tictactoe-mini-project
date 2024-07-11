import React from 'react'
import GameState from './GameState'

const PlayAgain = ({ gameState, playAgain }) => {
    if (gameState === GameState.inProgress) {
        return;
    }
    return (
        <button onClick={playAgain} className='play-again-btn'>Play Again</button>
    )
}

export default PlayAgain
