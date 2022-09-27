const gameStatePresets = {
  small: {
    size: {
      rows: 5,
      columns: 10,
    },
    bombs: 10,
  },
  medium: {
    size: {
      rows: 12,
      columns: 20,
    },
    bombs: 50,
  },
  large: {
    size: {
      rows: 12,
      columns: 40,
    },
    bombs: 100,
  },
};

class GameCell {
  constructor(x, y) {
    this.coor = {
      xCoor: x,
      yCoor: y,
    };
    this.adjBombs = null;
    this.hasBomb = false;
    this.isFlagged = false;
    this.isRevealed = false;
    this.style = 'base';
  }

  setAdjBombCount(gameBoard) {
    this.adjBombs = getAdjBombCount(this, gameBoard);
  }

  setStyle(newStyle) {
    const possibleStyles = ['base', 'highlighted', 'revealed'];
    if (possibleStyles.includes(newStyle.toLowerCase())) {
      this.style = newStyle;
      return true;
    }
    return false;
  }

  setDerivedStyle() {
    if (this.isFlagged) {
      this.style = 'base';
      return;
    }
    if (this.isRevealed) {
      this.setStyle('revealed');
      return;
    }
    this.setStyle('base');
  }
}

export const generateGameBoard = (rows, columns, bombs) => {
  const gameBoard = [];
  const gameBoardMemo = [];
  for (let i = 0; i < rows; i++) {
    const arrayRow = [];
    for (let j = 0; j < columns; j++) {
      arrayRow.push(new GameCell(i, j));
    }
    gameBoard.push(arrayRow);
  }

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      gameBoardMemo.push([i, j]);
    }
  }

  for (let i = 0; i < bombs; i++) {
    const randomIdx = Math.floor(Math.random() * gameBoardMemo.length);
    const [xCoor, yCoor] = gameBoardMemo[randomIdx];
    gameBoard[xCoor][yCoor].hasBomb = true;
    gameBoardMemo.splice(randomIdx, 1);
  }

  gameBoard.flat()
    .forEach((cell) => {
      cell.setAdjBombCount(gameBoard);
    });

  console.log('gameBoard', gameBoard);
  return gameBoard;
};

export const resetStylesOfBoard = (gameBoard) => {
  gameBoard.forEach((row) => {
    row.forEach((cell) => {
      cell.setDerivedStyle();
    });
  });
};

export const getAdjCells = (gameCell, gameBoard) => {
  if (!gameBoard) throw new Error('no gameBoard argument provided to getAdjCells');
  if (!(gameCell instanceof GameCell)) {
    return [];
  }
  const { xCoor, yCoor } = gameCell.coor;
  if (xCoor === null || yCoor === null) return [];
  const result = [];
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
  possibleCells.forEach(([y, x]) => {
    if (!gameBoard[y] || !gameBoard[y][x]) return;
    result.push(gameBoard[y][x]);
  });
  return result;
};

export const hardCheckCell = (xCoor, yCoor, gameBoard, checkedCells = []) => {
  const cell = gameBoard[yCoor][xCoor];
  const { x, y } = cell.coor;
  let counter = 0;

  const adjCells = getAdjCells(cell, gameBoard);

  // if cell has a flag on it, do nothing
  if (cell.isFlagged) {
    return null;
  }

  //  if there is a bomb on this cell, return -1
  if (cell.hasBomb) {
    return -1;
  }

  // if it's not yet been clicked on, get its surrounding bomb count
  if (!cell.isRevealed) {
    cell.isRevealed = true;
    adjCells.forEach((cell) => {
      if (!gameBoard[y] || !gameBoard[y][x]) return;
      if (gameBoard[y][x].hasBomb) counter++;
    });
    cell.adjBombs = counter;
    if (counter === 0) {
      adjCells.forEach((cell) => {
        if (
          !gameBoard[y]
          || !gameBoard[y][x]
          || checkedCells.some((ele) => ele === cell)
        ) { return; }
        checkedCells.push(cell);
        hardCheckCell(x, y, gameBoard, checkedCells);
      });
    }
    //  if cell has already been opened and this is a follow up click
  } else if (cell.isRevealed) {
    const adjFlags = getAdjFlagCount(xCoor, yCoor, gameBoard);

    // if flag count equals bomb count, open adj squares
    if (adjFlags === counter) {
      const resultsOfAdjCheck = [];
      adjCells.forEach((cell) => {
        const { x, y } = cell.coor;
        if (
          !gameBoard[y]
          || !gameBoard[y][x]
          || checkedCells.some((ele) => ele === cell)
        ) { return; }
        checkedCells.push(cell);
        resultsOfAdjCheck.push(hardCheckCell(x, y, gameBoard, checkedCells));
      });
      if (resultsOfAdjCheck.includes(-1)) return -1;
    }
  }

  return counter;
};

export const getAdjFlagCount = (xCoor, yCoor, gameBoard) => {
  let counter = 0;

  getAdjCells(gameBoard[yCoor][xCoor], gameBoard).forEach((cell) => {
    const { x, y } = cell.coor;
    if (!gameBoard[y] || !gameBoard[y][x]) return;
    if (gameBoard[y][x].isFlagged) counter++;
  });

  return counter;
};

export const getAdjBombCount = (cell, gameBoard) => {
  let counter = 0;
  getAdjCells(cell, gameBoard).forEach((cell) => {
    if (cell.hasBomb) counter++;
  });
  return counter;
};

export default gameStatePresets;
