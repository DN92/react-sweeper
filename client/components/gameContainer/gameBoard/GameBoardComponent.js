import React, { useState, useEffect, useMemo } from 'react';
import useRerender from '../../../hooks/useRerender';
import useClickTracker from '../../../hooks/useClickTracker';
import GameBoardRow from './GameBoardRow';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function GameBoardComponent({
  rows,
  columns,
  gameBoard,
  createNewGame,
  setMouseDownOnBoard,
  setCellToReveal,
  updateBombCounter,
  gameStatus,
  dispatchGameStatus,
}) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState(null);
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const gameGrid = useMemo(() => new Array(rows).fill(1), [rows]);
  const [clickTracker, checkMouseDown, checkMouseUp, resetClickTracker] = useClickTracker();

  const handleMouseOver = (e) => {
    if (e.target.getAttribute('cell-coor')) {
      const [x, y] = e.target.getAttribute('cell-coor').split(':');
      setCurrentCell(gameBoard.getCell(x, y));
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!currentCell || ([WON, LOST].includes(gameStatus))) return;
    checkMouseDown(e);
    if (e.button === 0
      && !currentCell.getIsRevealed()
      && !currentCell.getIsFlagged()) {
      setMouseDownOnBoard(true); // this is solely for the expressive face state
    }
    if (e.button === 2 && !currentCell.getIsRevealed()) {
      currentCell.toggleFlagged();
    }
  };

  const handleMouseUp = (e) => {
    setEnableHighlighting(false);
    if (e.button === 0) {
      setMouseDownOnBoard(false);
    }
    if (e.button === 2) {
      updateBombCounter();
    }
    if ([WON, LOST].includes(gameStatus)) return;
    if (
      (clickTracker.hasOneThreeClick() && currentCell?.getIsRevealed())
      || (e.button === 0 && !currentCell?.getIsRevealed())) {
      const result = gameBoard.hardCheckCell(currentCell);
      if (result === -2) {
        setCellToReveal(currentCell);
        createNewGame();
      }
      if (result === -1) {
        dispatchGameStatus({ type: LOST });
      }
      if (result === 1) {
        dispatchGameStatus({ type: RUNNING });
      }
      const { xCoor, yCoor } = currentCell.coor;
      gameBoard.remakeCell(currentCell);
      setCurrentCell(gameBoard.getCell(xCoor, yCoor));
      if (result === 2) {
        dispatchGameStatus({ type: WON });
      }
    }
    checkMouseUp(e);
  };

  const handleMouseLeave = () => {
    setMouseDownOnBoard(false);
    resetClickTracker();
    setEnableHighlighting(false);
    setCurrentCell(null);
    rerender();
  };

  useEffect(() => {
    if (!currentCell) return;
    if (clickTracker.hasOneThreeClick() && currentCell.getIsRevealed()) {
      setEnableHighlighting(true);
    } else {
      setEnableHighlighting(false);
    }
  }, [clickTracker, currentCell]);

  useEffect(() => {
    if (!currentCell || [WON, LOST].includes(gameStatus)) return;
    gameBoard.resetStylesOfBoard();
    if (enableHighlighting) {
      gameBoard.highLightAdjCells(currentCell);
    }
    rerender();
  }, [currentCell, enableHighlighting, gameBoard, gameStatus, rerender]);

  return (
    <div
      role="button"
      className="game-board"
      onMouseUp={(e) => handleMouseUp(e)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseOver={(e) => handleMouseOver(e)}
      onFocus={(e) => handleMouseOver(e)}
      tabIndex={0}
      draggable={false}
    >
      {gameGrid.map((row, idx) => (
        <GameBoardRow
          key={`${row}:${idx}`}
          columns={columns}
          yCoor={idx}
          gameBoard={gameBoard}
          gameStatus={gameStatus}
        />
      ))}
    </div>
  );
}

export default GameBoardComponent;
