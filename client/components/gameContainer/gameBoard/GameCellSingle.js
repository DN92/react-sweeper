import React from 'react';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

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

const boardCellClearedStyle = {
  height: remAsString,
  width: remAsString,
  background: '#ECECEC',
  border: `${(remSize * 8) / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
};

function GameCellSingle({ xCoor, yCoor, gameBoard, gameStatus }) {
  const { isRevealed, hasBomb, isFlagged, adjBombs, style } = gameBoard.getCell(xCoor, yCoor);

  const image = (() => {
    if (style === 'bust') {
      return '/images/lastMine.png';
    }
    if ([LOST].includes(gameStatus) && !hasBomb && isFlagged) {
      return '/images/redX.png';
    }
    if ([WON, LOST].includes(gameStatus) && hasBomb && !isFlagged) {
      return '/images/mine1.jpg';
    }
    if (isFlagged) {
      return '/images/redFlag.jpg';
    }
    if (!isRevealed || adjBombs === 0) {
      return null;
    }
    return null;
  })();

  const cellStyle = (() => {
    switch (style) {
    case 'base':
      return boardCellBaseStyle;
    case 'highlighted':
      // return boardCellHighlightedStyle;
      return boardCellClearedStyle;
    case 'revealed':
      return boardCellClearedStyle;
    case 'bust': {
      return boardCellClearedStyle;
    }
    default:
      return boardCellBaseStyle;
    }
  })();
  const color = (() => {
    switch (adjBombs) {
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'red';
    case 4:
      return 'purple';
    case 5:
      return 'maroon';
    case 6:
      return 'turquoise';
    case 7:
      return 'orange';
    case 8:
      return 'black';
    default:
      return '';
    }
  })();


  return (
    <div
      className="game-board-cell"
      cell-coor={`${xCoor}:${yCoor}`}
      style={cellStyle}
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
            className="game-board-cell-text"
            style={{ color }}
            cell-coor={`${xCoor}:${yCoor}`}
          >
            {isRevealed && adjBombs > 0 ? adjBombs : ''}
          </p>
        )}
    </div>
  );
}

export default GameCellSingle;
