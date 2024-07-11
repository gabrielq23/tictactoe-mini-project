import React from 'react'
import GameState from './GameState'

const GameOver = ({ gameState }) => {
    switch (gameState) {
        case (GameState.inProgress):
            return <></>;
        case (GameState.player1wins):
            return <div className='game-over'>Player 1 Wins</div>;
        case (GameState.player2wins):
            return <div className='game-over'>Player 2 Wins</div>;
        case (GameState.draw):
            return <div className='game-over'>Draw</div>;
        default:
            return <></>;
    }
}

export default GameOver
