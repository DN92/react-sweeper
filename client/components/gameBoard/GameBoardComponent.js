import React, { useState, useEffect, useMemo } from 'react';
import GameBoardRow from './GameBoardRow';
import useRerender from '../../hooks/useRerender';

function GameBoardComponent({ rows = 5, columns = 10, gameBoard, dispatchGameStatus }) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState({});
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const gameColumn = useMemo(() => new Array(rows).fill(1), [rows]);

  const handleMouseOver = (e) => {
    if (e.target.getAttribute('cell-coor')) {
      const [x, y] = e.target.getAttribute('cell-coor').split(':');
      setCurrentCell(gameBoard.board[y][x]);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnableHighlighting(true);
  };

  const handleMouseUp = (e) => {
    setEnableHighlighting(false);
    const [x, y] = e.target.getAttribute('cell-coor').split(':');
    if (!(x && y)) return;
    if (!gameBoard.hardCheckCell(gameBoard.board[y][x])) {
      dispatchGameStatus({ type: 'lost' });
    }
  };

  const handleMouseLeave = () => {
    setEnableHighlighting(false);
    setCurrentCell(null);
  };

  useEffect(() => {
    gameBoard.resetStylesOfBoard();
    if (currentCell && enableHighlighting) {
      const adjCells = gameBoard.getAdjCells(currentCell);
      adjCells.forEach((cell) => { cell.setStyle('highlighted'); });
    }
    rerender();
  }, [currentCell, enableHighlighting, gameBoard, rerender]);

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

export default GameBoardComponent;
