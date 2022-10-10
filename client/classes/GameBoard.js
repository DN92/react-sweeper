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

  getBoardSize() {
    return this.board.flat().length;
  }

  getCell(xCoor, yCoor) {
    return this.board[yCoor][xCoor];
  }

  getTotalBombs() {
    return this.bombs;
  }

  getRedFlags() {
    let counter = 0;
    this.board.flat()
      .forEach((cell) => {
        if (cell.getIsFlagged()) counter++;
      });
    return counter;
  }

  getBombCounter() {
    const bombCount = this.getTotalBombs() - this.getRedFlags();
    return bombCount < 0 ? 0 : bombCount;
  }

  getRevealedCount() {
    let counter = 0;
    this.board.flat()
      .forEach((cell) => {
        if (cell.getIsRevealed()) counter++;
      });
    return counter;
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

  isFirstMove() {
    return this.getRevealedCount() === 0;
  }

  remakeCell(cell) {
    const { yCoor, xCoor } = cell.coor;
    this.board[yCoor][xCoor] = new GameCell(null, null, { ...cell });
  }

  resetStylesOfBoard() {
    this.board.flat()
      .forEach((cell) => {
        cell.setDerivedStyle();
      });
  }

  highLightAdjCells(gameCell) {
    this.getAdjCells(gameCell).forEach((cell) => {
      cell.setStyle('highlighted');
    });
  }

  hardCheckCell(gameCell, checkedCells = []) {
    const adjCells = this.getAdjCells(gameCell);

    // if cell has a flag on it, do nothing
    if (gameCell.isFlagged) return 1;

    //  if there is a bomb on this cell, return -1
    if (gameCell.hasBomb) {
      const result = this.isFirstMove() ? -2 : -1;
      if (result === -1) gameCell.setStyle('bust');
      return result;
    }

    // if it's not yet been clicked on, get its surrounding bomb count
    if (!gameCell.isRevealed) {
      gameCell.setIsRevealed(true);
      gameCell.setStyle('revealed');
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
      if (adjFlags === gameCell.adjBombs) {
        const resultsOfAdjCheck = [];
        adjCells.forEach((cell) => {
          if (checkedCells.some((ele) => ele === cell)) return; // exit condition
          checkedCells.push(cell);
          resultsOfAdjCheck.push(this.hardCheckCell(cell, checkedCells));
        });
        if (resultsOfAdjCheck.includes(-1)) return -1;
      }
    }

    return this.isCleared() ? 2 : 1;
  }

  isCleared() {
    return this.getRevealedCount() >= (this.getBoardSize() - this.getTotalBombs());
  }
}

export default GameBoard;
