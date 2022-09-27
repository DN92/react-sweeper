import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';
import GameBoardRow from './GameBoardRow';
import useRerender from '../../hooks/useRerender';
import { hardCheckCell, getAdjCells, resetStylesOfBoard } from '../gameContainer/gameStatePresets';

function GameBoard({ rows = 5, columns = 10, gameBoard, dispatchGameStatus }) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState({});
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const gameColumn = useMemo(() => new Array(rows).fill(1), [rows]);

  const handleMouseOver = (e) => {
    if (e.target.getAttribute('cell-coor')) {
      const [x, y] = e.target.getAttribute('cell-coor').split(':');
      setCurrentCell(gameBoard[y][x]);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnableHighlighting(true);
  };

  const handleMouseUp = (e) => {
    setEnableHighlighting(false);
    const cellCoors = e.target.getAttribute('cell-coor');
    if (!cellCoors) return;
    const [x, y] = cellCoors.split(':');
    const result = hardCheckCell(x, y, gameBoard);
    console.log('hard checked ', x, y);
    if (result === -1) {
      dispatchGameStatus({ type: 'lost' });
      setCurrentCell((prev) => ({ ...prev, isRevealed: true, style: 'cleared' }));
      rerender();
    }
  };

  const handleMouseLeave = () => {
    setEnableHighlighting(false);
    setCurrentCell(null);
  };

  useEffect(() => {
    console.log('current cell', currentCell?.coor?.xCoor, currentCell?.coor?.yCoor);
    resetStylesOfBoard(gameBoard);
    if (currentCell && enableHighlighting) {
      const adjCells = getAdjCells(currentCell, gameBoard);
      adjCells.forEach((cell) => { cell.setStyle('highlighted'); });
    }
    rerender();
  }, [currentCell, enableHighlighting, gameBoard]);

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

export default GameBoard;
