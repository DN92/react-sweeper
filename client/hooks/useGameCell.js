/* this was part of an attempt to convert the Classes used in
this program into custom Hooks to make it more 'react-y'
Atm, this is unused code. */

import { useState } from 'react';

const possibleStyles = ['base', 'highlighted', 'revealed', 'bust'];

const useGameCell = (xCoor, yCoor, oldCell) => {
  const [coor, setCoor] = useState({ xCoor, yCoor });
  const [adjBombs, setAdjBombs] = useState(null);
  const [hasBomb, setHasBomb] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [style, setStyle] = useState('base');

  const toggleFlagged = () => {
    setIsFlagged((prev) => !prev);
  };

  const updateStyle = (newStyle) => {
    if (possibleStyles.includes(newStyle.toLowerCase())) {
      setStyle(newStyle);
      return true;
    }
    return false;
  };

  const deriveStyle = () => {
    setStyle(isRevealed ? 'revealed' : 'base');
  };

  return {
    coor,
    setCoor,
    adjBombs,
    setAdjBombs,
    hasBomb,
    setHasBomb,
    isFlagged,
    setIsFlagged,
    isRevealed,
    setIsRevealed,
    style,
    setStyle,
    toggleFlagged,
    updateStyle,
    deriveStyle,
  };
};

export default useGameCell;
