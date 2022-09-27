import React, { useMemo, useEffect } from 'react';

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
  border: `${(remSize * 20) / 100}rem outset #ECECEC`,
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
  const cell = gameBoard[yCoor][xCoor];

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

  return (
    <div
      className="game-board-cell"
      cell-coor={`${xCoor}:${yCoor}`}
      style={style}
      role="gridcell"
      tabIndex={0}
      // onClick={() => console.log(cell.coor.xCoor, cell.coor.yCoor)}
    >
      {image
        ? (
          <img
            className="cell-image"
            src={image}
            alt="mine"
          />
        )
        : (
          <p>
            {cell.adjBombs}
          </p>
        )}
    </div>
  );
}

export default GameCellSingle;
