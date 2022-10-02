import React, { useRef, useState, useReducer, useEffect, useCallback } from 'react';
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
  const initialRender = useRef(true);
  const nextGameState = useRef(gameStatePresets.small);
  const [gameSettings, setGameSetting] = useState(nextGameState.current);
  const [gameBoard, setGameBoard] = useState(new GameBoard(
    gameSettings.size.rows,
    gameSettings.size.columns,
    gameSettings.bombs,
  ));
  const createNewGame = useCallback(() => {
    setGameBoard(new GameBoard(
      gameSettings.size.rows,
      gameSettings.size.columns,
      gameSettings.bombs,
    ));
  }, [gameSettings.size.rows, gameSettings.size.columns, gameSettings.bombs]);
  const [displayTime, clockActions] = useGameClock(3);
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

  const [mouseDownOnBoard, setMouseDownOnBoard] = useState(false);
  const [bombCounter, setBombCounter] = useState(gameBoard.getBombCounter());
  const updateBombCounter = useCallback(() => {
    setBombCounter(gameBoard.getBombCounter());
  }, [gameBoard]);

  useEffect(() => {
    initialRender.current = false;
  }, []);

  useEffect(() => {
    if (gameStatus === INIT) {
      clockActions.resetClock();
    }
    if (gameStatus === RUNNING) {
      clockActions.startRunning();
    }
    if (gameStatus === WON || gameStatus === LOST) {
      clockActions.stopRunning();
    }
  }, [gameStatus, clockActions, gameSettings]);


  return (
    <div className="game-container">
      <GameHeader
        displayTime={displayTime}
        gameStatus={gameStatus}
        bombCounter={bombCounter}
        dispatchGameStatus={dispatchGameStatus}
        mouseDownOnBoard={mouseDownOnBoard}
        clockReset={clockActions.resetClock}
        createNewGame={createNewGame}
      />
      <GameBoardComponent
        gameBoard={gameBoard}
        gameStatus={gameStatus}
        updateBombCounter={updateBombCounter}
        setMouseDownOnBoard={setMouseDownOnBoard}
        dispatchGameStatus={dispatchGameStatus}
      />
    </div>
  );
}

export default GameContainer;
