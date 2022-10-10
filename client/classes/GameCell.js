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

  getAdjBombCount() {
    return this.adjBombs;
  }

  getIsRevealed() {
    return this.isRevealed;
  }

  getIsFlagged() {
    return this.isFlagged;
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
    const possibleStyles = ['base', 'highlighted', 'revealed', 'bust'];
    if (possibleStyles.includes(newStyle.toLowerCase())) {
      this.style = newStyle;
      return true;
    }
    return false;
  }

  setDerivedStyle() {
    this.setStyle(this.isRevealed ? 'revealed' : 'base');
  }
}

export default GameCell;
