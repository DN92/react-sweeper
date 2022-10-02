import React, { useState, useEffect, useMemo } from 'react';
import useRerender from '../../../hooks/useRerender';
import useClickTracker from '../../../hooks/useClickTracker';
import GameBoardRow from './GameBoardRow';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function GameBoardComponent({
  rows = 5,
  columns = 10,
  gameBoard,
  setMouseDownOnBoard,
  updateBombCounter,
  gameStatus,
  dispatchGameStatus,
}) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState(null);
  const [firstMove, setFirstMove] = useState(false);
  const [recheckCell, setRecheckCell] = useState(false);
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
    checkMouseDown(e);
    if (!currentCell || ([WON, LOST].includes(gameStatus))) return;
    if (e.button === 0
      && !currentCell.getIsRevealed()
      && !currentCell.getIsFlagged()) {
      setMouseDownOnBoard(true);
    }
    if (e.button === 2 && !currentCell.getIsRevealed()) {
      currentCell.toggleFlagged();
      rerender();
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
      if (result === -1 && firstMove) {
        dispatchGameStatus({ type: INIT });
        setRecheckCell(true);
      }
      if (result === -1 && !firstMove) {
        dispatchGameStatus({ type: 'lost' });
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
    if (!currentCell.getIsRevealed()) setEnableHighlighting(false);
  }, [currentCell]);

  useEffect(() => {
    if (!currentCell) return;
    if (clickTracker.hasOneThreeClick() && currentCell.getIsRevealed()) {
      setEnableHighlighting(true);
    }
  }, [clickTracker, currentCell]);

  useEffect(() => {
    if (!currentCell) return;
    gameBoard.resetStylesOfBoard();
    if (enableHighlighting) {
      gameBoard.highLightAdjCells(currentCell);
    }
    rerender();
  }, [currentCell, enableHighlighting, gameBoard, rerender]);

  useEffect(() => {
    if (recheckCell) {
      setRecheckCell(false);
      gameBoard.hardCheckCell(currentCell);
    }
  }, [recheckCell, currentCell, gameBoard]);

  return (
    <div
      role="button"
      className="game-board"
      onMouseUp={(e) => handleMouseUp(e)}
      onContextMenu={(e) => e.preventDefault()}
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
        />
      ))}
    </div>
  );
}

export default GameBoardComponent;
