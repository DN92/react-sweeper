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
