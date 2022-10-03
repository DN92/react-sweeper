import { useState } from 'react';
import useGameCell from './useGameCell';

const useGameBoard = (rows, columns, bombs) => {
  const [board, setBoard] = useState([]);

  const generateBoard = () => {
    const gameBoardMemo = [];

    for (let i = 0; i < rows; i++) {
      const arrayRow = [];
      for (let j = 0; j < columns; j++) {
        arrayRow.push(useGameCell(j, i));
      }
      board.push(arrayRow);
      setBoard((board) => [...board, arrayRow]);
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        gameBoardMemo.push([i, j]);
      }
    }

    for (let i = 0; i < bombs; i++) {
      const randomIdx = Math.floor(Math.random() * gameBoardMemo.length);
      const [xCoor, yCoor] = gameBoardMemo[randomIdx];
      board[xCoor][yCoor].hasBomb = true;
      gameBoardMemo.splice(randomIdx, 1);
    }

    board.flat()
      .forEach((cell) => {
        cell.setAdjBombs(getAdjBombCount(cell));
      });
  };
  generateBoard();

  const getAdjCells = (gameCell) => {
    if (!gameCell) return [];
    const { xCoor, yCoor } = gameCell.coor;
    if (xCoor === null || yCoor === null) return [];
    const adjCells = [];
    const possibleCells = [
      [xCoor - 1, yCoor - 1],
      [xCoor, yCoor - 1],
      [xCoor + 1, yCoor - 1],
      [xCoor - 1, yCoor],
      [xCoor + 1, yCoor],
      [xCoor - 1, yCoor + 1],
      [xCoor, yCoor + 1],
      [xCoor + 1, yCoor + 1],
    ];
    possibleCells.forEach(([x, y]) => {
      if (!board[y] || !board[y][x]) return;
      adjCells.push(board[y][x]);
    });

    return adjCells;
  };

  const getAdjBombCount = (gameCell) => {
    let counter = 0;
    getAdjCells(gameCell).forEach((cell) => {
      if (cell.hasBomb) counter++;
    });
    return counter;
  };

  const getBoardSize = () => {
    return board.flat().length;
  };

  const getCell = (xCoor, yCoor) => {
    return board[yCoor][xCoor];
  };

  const getRedFlags = () => {
    let counter = 0;
    board.flat()
      .forEach((cell) => {
        if (cell.getIsFlagged()) counter++;
      });
    return counter;
  };

  const getBombCounter = () => {
    const bombCount = bombs - getRedFlags();
    return bombCount < 0 ? 0 : bombCount;
  };

  const getRevealedCount = () => {
    let counter = 0;
    board.flat()
      .forEach((cell) => {
        if (cell.getIsRevealed()) counter++;
      });
    return counter;
  };

  const getAdjFlagCount = (gameCell) => {
    let counter = 0;
    getAdjCells(gameCell).forEach((cell) => {
      if (cell.isFlagged) counter++;
    });
    return counter;
  };

  const isFirstMove = () => {
    return getRevealedCount() === 0;
  };

  const resetStylesOfBoard = () => {
    board.flat()
      .forEach((cell) => {
        cell.setDerivedStyle();
      });
  };

  const highLightAdjCells = (gameCell) => {
    getAdjCells(gameCell).forEach((cell) => {
      cell.setStyle('highlighted');
    });
  };

  const isCleared = () => {
    return getRevealedCount() >= (getBoardSize() - bombs);
  };

  const hardCheckCell = (gameCell, checkedCells = []) => {
    const adjCells = getAdjCells(gameCell);

    // if cell has a flag on it, do nothing
    if (gameCell.isFlagged) {
      return null;
    }

    //  if there is a bomb on this cell, return -1
    if (gameCell.hasBomb) {
      return isFirstMove() ? -2 : -1;
    }

    // if it's not yet been clicked on, get its surrounding bomb count
    if (!gameCell.isRevealed) {
      gameCell.setIsRevealed(true);
      if (gameCell.adjBombs === 0 && !gameCell.hasBomb) {
        adjCells.forEach((cell) => {
          checkedCells.push(cell);
          hardCheckCell(cell, checkedCells);
        });
      }
      //  if cell has already been opened and this is a follow up click
    } else if (gameCell.isRevealed) {
      const adjFlags = getAdjFlagCount(gameCell);

      // if flag count equals bomb count, open adj squares
      if (adjFlags === gameCell.adjBombs && adjFlags !== 0) {
        const resultsOfAdjCheck = [];
        adjCells.forEach((cell) => {
          if (checkedCells.some((ele) => ele === cell)) return; // exit condition
          checkedCells.push(cell);
          resultsOfAdjCheck.push(hardCheckCell(cell, checkedCells));
        });
        if (resultsOfAdjCheck.includes(-1)) return -1;
      }
    }

    if (isCleared()) return 2;

    return 1;
  };
};

export default useGameBoard;
