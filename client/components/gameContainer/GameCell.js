class GameCell {
  constructor(x, y, oldCell) {
    this.coor = oldCell?.coor
    || {
      xCoor: x,
      yCoor: y,
    };
    this.adjBombs = oldCell?.adjBombs || null;
    this.hasBomb = oldCell?.hasBomb || false;
    this.isFlagged = oldCell?.isFlagged || false;
    this.isRevealed = oldCell?.isRevealed || false;
    this.style = oldCell?.style || 'base';
  }

  getIsRevealed() {
    return this.isRevealed;
  }

  setIsRevealed(bool) {
    this.isRevealed = bool;
  }

  setAdjBombCount(bombs) {
    this.adjBombs = bombs;
  }

  setIsFlagged(bool) {
    this.isFlagged = bool;
  }

  toggleFlagged() {
    this.isFlagged = !this.isFlagged;
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

export default GameCell;
