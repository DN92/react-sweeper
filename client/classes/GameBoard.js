import GameCell from './GameCell';

class GameBoard {
  constructor(rows, columns, bombs) {
    this.rows = rows;
    this.columns = columns;
    this.bombs = bombs;
    this.board = [];
    this.generateBoard();
  }

  generateBoard() {
    const gameBoardMemo = [];

    for (let i = 0; i < this.rows; i++) {
      const arrayRow = [];
      for (let j = 0; j < this.columns; j++) {
        arrayRow.push(new GameCell(j, i));
      }
      this.board.push(arrayRow);
    }

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        gameBoardMemo.push([i, j]);
      }
    }

    for (let i = 0; i < this.bombs; i++) {
      const randomIdx = Math.floor(Math.random() * gameBoardMemo.length);
      const [xCoor, yCoor] = gameBoardMemo[randomIdx];
      this.board[xCoor][yCoor].hasBomb = true;
      gameBoardMemo.splice(randomIdx, 1);
    }

    this.board.flat()
      .forEach((cell) => {
        cell.setAdjBombCount(this.getAdjBombCount(cell));
      });
  }

  resetStylesOfBoard() {
    this.board.flat()
      .forEach((cell) => {
        cell.setDerivedStyle();
      });
  }

  getCell(xCoor, yCoor) {
    return this.board[yCoor][xCoor];
  }

  getTotalBombs() {
    return this.bombs;
  }

  remakeCell(cell) {
    const { yCoor, xCoor } = cell.coor;
    this.board[yCoor][xCoor] = new GameCell(null, null, { ...cell });
  }

  eachCells(callback) {
    this.board.flat().forEach((cell) => {
      callback(cell);
    });
  }

  getAdjCells(gameCell) {
    if (!(gameCell instanceof GameCell)) {
      return [];
    }
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
      if (!this.board[y] || !this.board[y][x]) return;
      adjCells.push(this.board[y][x]);
    });

    return adjCells;
  }

  getAdjFlagCount(gameCell) {
    let counter = 0;
    this.getAdjCells(gameCell).forEach((cell) => {
      if (cell.isFlagged) counter++;
    });
    return counter;
  }

  getAdjBombCount(gameCell) {
    let counter = 0;
    this.getAdjCells(gameCell).forEach((cell) => {
      if (cell.hasBomb) counter++;
    });
    return counter;
  }

  highLightAdjCells(gameCell) {
    this.getAdjCells(gameCell).forEach((cell) => {
      cell.setStyle('highlighted');
    });
  }

  hardCheckCell(gameCell, checkedCells = []) {
    const adjCells = this.getAdjCells(gameCell);

    // if cell has a flag on it, do nothing
    if (gameCell.isFlagged) {
      return null;
    }

    //  if there is a bomb on this cell, return -1
    if (gameCell.hasBomb) {
      return -1;
    }

    // if it's not yet been clicked on, get its surrounding bomb count
    if (!gameCell.isRevealed) {
      gameCell.setIsRevealed(true);
      if (gameCell.adjBombs === 0 && !gameCell.hasBomb) {
        adjCells.forEach((cell) => {
          checkedCells.push(cell);
          this.hardCheckCell(cell, checkedCells);
        });
      }
      //  if cell has already been opened and this is a follow up click
    } else if (gameCell.isRevealed) {
      const adjFlags = this.getAdjFlagCount(gameCell);

      // if flag count equals bomb count, open adj squares
      if (adjFlags === gameCell.adjBombs && adjFlags !== 0) {
        const resultsOfAdjCheck = [];
        adjCells.forEach((cell) => {
          if (checkedCells.some((ele) => ele === cell)) return; // exit condition
          checkedCells.push(cell);
          resultsOfAdjCheck.push(this.hardCheckCell(cell, checkedCells));
        });
        if (resultsOfAdjCheck.includes(-1)) return -1;
      }
    }

    if (this.isCleared()) return 2;

    return 1;
  }

  getRevealedCellCount() {
    let counter = 0;
    this.eachCells((cell) => {
      if (cell.getIsRevealed()) counter++;
    });
    return counter;
  }

  getBoardSize() {
    return this.board.flat().length;
  }

  isCleared() {
    return this.getRevealedCellCount() >= (this.getBoardSize() - this.getTotalBombs());
  }
}

export default GameBoard;
