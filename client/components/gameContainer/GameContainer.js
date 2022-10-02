import React, { useMemo, useRef, useState, useReducer, useEffect } from 'react';
import gameStatePresets from './gameStatePresets';
import GameBoardComponent from './gameBoard/GameBoardComponent';
import GameBoard from '../../classes/GameBoard';
import GameHeader from './gameHeader/GameHeader';
import useGameClock from '../../hooks/useGameClock';


const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function GameContainer() {
  const [displayTime, clockActions] = useGameClock();
  const [gameStatus, dispatchGameStatus] = useReducer((state, action) => {
    switch (action.type) {
    case INIT:
      return INIT;
    case RUNNING:
      return RUNNING;
    case WON:
      return WON;
    case LOST:
      return LOST;
    default:
      return state;
    }
  }, INIT);

  const initialRender = useRef(true);
  const [mouseDownOnBoard, setMouseDownOnBoard] = useState(false);
  const nextGameState = useRef(gameStatePresets.small);
  const [gameSettings, setGameSetting] = useState(nextGameState.current);
  const [gameBoard, setGameBoard] = useState(new GameBoard(
    gameSettings.size.rows,
    gameSettings.size.columns,
    gameSettings.bombs,
  ));

  useEffect(() => {
    initialRender.current = false;
  }, []);

  useEffect(() => {
    if (gameStatus === INIT) {
      clockActions.resetClock();
      if (!initialRender.current) {
        setGameBoard(new GameBoard(
          gameSettings.size.rows,
          gameSettings.size.columns,
          gameSettings.bombs,
        ));
      }
    }
    if (gameStatus === RUNNING) {
      clockActions.startRunning();
    }
    if (gameStatus === WON || gameStatus === LOST) {
      clockActions.stopRunning();
    }
  }, [gameStatus, clockActions, gameSettings]);

  return (
    <>
      <GameHeader
        displayTime={displayTime}
        gameStatus={gameStatus}
        dispatchGameStatus={dispatchGameStatus}
        mouseDownOnBoard={mouseDownOnBoard}
        clockReset={clockActions.resetClock}
      />
      <GameBoardComponent
        gameBoard={gameBoard}
        gameStatus={gameStatus}
        setMouseDownOnBoard={setMouseDownOnBoard}
        dispatchGameStatus={dispatchGameStatus}
      />
      <hr />
    </>
  );
}

export default GameContainer;
