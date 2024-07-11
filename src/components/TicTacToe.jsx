import React, { useEffect, useState } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import PlayAgain from './PlayAgain';

const PLAYER_1 = "X";
const PLAYER_2 = "O";

const winReqs = [
    { combo: [0, 1, 2], strikeType: "strike-row-1" },
    { combo: [3, 4, 5], strikeType: "strike-row-2" },
    { combo: [6, 7, 8], strikeType: "strike-row-3" },
    { combo: [0, 3, 6], strikeType: "strike-col-1" },
    { combo: [1, 4, 7], strikeType: "strike-col-2" },
    { combo: [2, 5, 8], strikeType: "strike-col-3" },
    { combo: [0, 4, 8], strikeType: "strike-diag-1" },
    { combo: [2, 4, 6], strikeType: "strike-diag-2" }
]

const checkWinner = (tiles, setStrikeType, setGameState) => {
    for (const { combo, strikeType } of winReqs) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeType(strikeType);
            if (tileValue1 === PLAYER_1) {
                setGameState(GameState.player1wins);
            }
            else if (tileValue1 === PLAYER_2) {
                setGameState(GameState.player2wins);
            }
            return;
        }
    }
    const allTilesFilled = tiles.every((tile) => tile !== null);
    if (allTilesFilled) {
        setGameState(GameState.draw);
    }
}

const TicTacToe = () => {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_1);
    const [strikeType, setStrikeType] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }
        if (tiles[index] !== null) {
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if (playerTurn === PLAYER_1) {
            setPlayerTurn(PLAYER_2);
        }
        else {
            setPlayerTurn(PLAYER_1);
        }
    }

    const handlePlayAgain = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_1);
        setStrikeType(null);
    }

    useEffect(() => {
        checkWinner(tiles, setStrikeType, setGameState);
    }, [tiles])

    return (
        <div>
            <h1>hello world~!</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeType={strikeType} />
            <GameOver gameState={gameState} />
            <PlayAgain gameState={gameState} playAgain={handlePlayAgain} />
        </div>
    )
}

export default TicTacToe
