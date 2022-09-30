import React, { useMemo } from 'react';

const remSize = 2;
const remAsString = `${remSize}rem`;

const boardCellBaseStyle = {
  height: remAsString,
  width: remAsString,
  background: '#c0c0c0',
  border: `${(remSize * 20) / 100}rem outset #ECECEC`,
  overflow: 'none',
  boxSizing: 'border-box',
};

const boardCellHighlightedStyle = {
  height: remAsString,
  width: remAsString,
  background: 'aqua',
  border: `${(remSize * 20) / 100}rem outset aqua`,
  overflow: 'none',
  boxSizing: 'border-box',
};

const boardCellClearedStyle = {
  height: remAsString,
  width: remAsString,
  background: '#ECECEC',
  border: `${(remSize * 8) / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
};

function GameCellSingle({ xCoor, yCoor, gameBoard }) {
  // const cell = gameBoard.getCell(xCoor, yCoor);
  const cell = useMemo(
    () => gameBoard.getCell(xCoor, yCoor),
    [xCoor, yCoor, gameBoard],
  );

  const image = (() => {
    if (cell.hasBomb) {
      return '/images/mine1.jpg';
    }
    if (cell.isRevealed && cell.hasBomb) {
      return '/images/mine1.jpg';
    }
    if (cell.isFlagged) {
      return '/images/redFlag.jpg';
    }
    if (!cell.isRevealed || cell.adjBombs === 0) {
      return null;
    }
    return null;
  })();

  const style = (() => {
    switch (cell.style) {
    case 'base':
      return boardCellBaseStyle;
    case 'highlighted':
      return boardCellHighlightedStyle;
    case 'revealed':
      return boardCellClearedStyle;
    default:
      return boardCellBaseStyle;
    }
  })();


  return (
    <div
      className="game-board-cell"
      cell-coor={`${xCoor}:${yCoor}`}
      style={style}
      role="gridcell"
      tabIndex={0}
    >
      {image
        ? (
          <img
            cell-coor={`${xCoor}:${yCoor}`}
            src={image}
            alt=""
          />
        )
        : (
          <p
            cell-coor={`${xCoor}:${yCoor}`}
          >
            {cell.adjBombs}
          </p>
        )}
    </div>
  );
}

export default GameCellSingle;
