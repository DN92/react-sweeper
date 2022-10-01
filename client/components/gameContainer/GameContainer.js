import React, { useMemo, useRef, useState, useReducer, useEffect } from 'react';
import gameStatePresets from './gameStatePresets';
import GameBoardComponent from './gameBoard/GameBoardComponent';
import GameBoard from '../../classes/GameBoard';
import GameMenu from './gameHeader/GameMenu';

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
  const gameBoard = useMemo(() => {
    return new GameBoard(
      gameSettings.size.rows,
      gameSettings.size.columns,
      gameSettings.bombs,
    );
  }, [gameSettings]);

  return (
    <>
      <GameMenu gameStatus={gameStatus} />
      <GameBoardComponent
        gameBoard={gameBoard}
        dispatchGameStatus={dispatchGameStatus}
      />
      <hr />
    </>
  );
}

export default GameContainer;
