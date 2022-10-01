import React, { useState, useEffect, useMemo } from 'react';
import useRerender from '../../hooks/useRerender';
import useClickTracker from '../../hooks/useClickTracker';
import GameBoardRow from './GameBoardRow';

function GameBoardComponent({ rows = 5, columns = 10, gameBoard, dispatchGameStatus }) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState(null);
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const gameColumn = useMemo(() => new Array(rows).fill(1), [rows]);
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
    if (e.button === 2 && !currentCell.getIsRevealed()) {
      currentCell?.toggleFlagged();
      rerender();
    }
  };

  const handleMouseUp = (e) => {
    setEnableHighlighting(false);
    if (
      (clickTracker.hasOneThreeClick() && currentCell?.getIsRevealed())
      || (e.button === 0 && !currentCell?.getIsRevealed())) {
      if (gameBoard.hardCheckCell(currentCell) === -1) {
        dispatchGameStatus({ type: 'lost' });
      }
      const { xCoor, yCoor } = currentCell.coor;
      gameBoard.remakeCell(currentCell);
      setCurrentCell(gameBoard.getCell(xCoor, yCoor));
    }
    checkMouseUp(e);
  };

  const handleMouseLeave = () => {
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
    if (clickTracker.hasOneThreeClick() && currentCell?.getIsRevealed()) {
      console.log('here');
      setEnableHighlighting(true);
    }
  }, [clickTracker, currentCell]);

  useEffect(() => {
    if (!currentCell) return;
    gameBoard.resetStylesOfBoard();
    if (currentCell && enableHighlighting) {
      gameBoard.highLightAdjCells(currentCell);
    }
    rerender();
  }, [currentCell, enableHighlighting, gameBoard, rerender]);

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
      {gameColumn.map((row, idx) => (
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
