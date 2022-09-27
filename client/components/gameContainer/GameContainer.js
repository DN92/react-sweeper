import React, { useRef, useState, useReducer } from 'react';
import gameStatePresets, { generateGameBoard } from './gameStatePresets';
import GameBoard from '../gameBoard/GameBoard';
import GameMenu from './GameMenu';
import GameCellSingle from '../gameBoard/GameCellSingle';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function GameContainer() {
  const [gameStatus, dispatchGameStatus] = useReducer((state, action) => {
    switch (action.type) {
    case 'init':
      return INIT;
    case 'running':
      return RUNNING;
    case 'won':
      return WON;
    case 'lost':
      return LOST;
    default:
      return state;
    }
  }, 'init');

  const nextGameState = useRef(gameStatePresets.small);
  const [gameSettings, setGameSetting] = useState(nextGameState.current);
  const [gameBoard, setGameBoard] = useState(
    generateGameBoard(
      gameSettings.size.rows,
      gameSettings.size.columns,
      gameSettings.bombs,
    ),
  );

  return (
    <>
      <GameMenu gameStatus={gameStatus} />
      <GameBoard
        gameBoard={gameBoard}
        dispatchGameStatus={dispatchGameStatus}
      />
      <hr />
      {/* <GameCellSingle
        gameBoard={gameBoard}
        xCoor={2}
        yCoor={2}
      /> */}
    </>
  );
}

export default GameContainer;
