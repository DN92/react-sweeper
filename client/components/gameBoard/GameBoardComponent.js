import React, { useState, useEffect, useMemo } from 'react';
import GameBoardRow from './GameBoardRow';
import useRerender from '../../hooks/useRerender';

function GameBoardComponent({ rows = 5, columns = 10, gameBoard, dispatchGameStatus }) {
  const rerender = useRerender();
  const [currentCell, setCurrentCell] = useState({});
  const [enableHighlighting, setEnableHighlighting] = useState(false);
  const gameColumn = useMemo(() => new Array(rows).fill(1), [rows]);

  const [cellLeftClicked, setCellLeftClicked] = useState(false);
  const [cellRightClicked, setCellRightClicked] = useState(false);

  const clickHandler = (e) => {
    if (e.button === 0) setCellLeftClicked(true);
    if (e.button === 2) setCellRightClicked(true);
  };

  const clickReset = () => {
    setCellLeftClicked(false);
    setCellRightClicked(false);
  };

  const handleMouseOver = (e) => {
    if (e.target.getAttribute('cell-coor')) {
      const [x, y] = e.target.getAttribute('cell-coor').split(':');
      setCurrentCell(gameBoard.getCell(x, y));
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    clickHandler(e);
    if (e.button === 2 && !currentCell.isRevealed) {
      currentCell?.toggleFlagged();
      rerender();
    }
  };

  const handleMouseUp = (e) => {
    clickReset();
    setEnableHighlighting(false);
    if (e.button === 0 && currentCell) {
      if (gameBoard.hardCheckCell(currentCell) === -1) {
        dispatchGameStatus({ type: 'lost' });
      }
      const { xCoor, yCoor } = currentCell.coor;
      gameBoard.remakeCell(currentCell);

      setCurrentCell(gameBoard.getCell(xCoor, yCoor));
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    setEnableHighlighting(false);
    rerender();
  };

  useEffect(() => {
    setCellLeftClicked(false);
    setCellRightClicked(false);
    if (!currentCell?.isRevealed) setEnableHighlighting(false);
  }, [currentCell]);

  useEffect(() => {
    if (cellLeftClicked && cellRightClicked && currentCell?.isRevealed) {
      setEnableHighlighting(true);
    }
  }, [cellLeftClicked, cellRightClicked, currentCell]);

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
      onContextMenu={handleRightClick}
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
