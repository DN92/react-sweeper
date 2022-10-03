import React from 'react';
import Clock from './Clock';
import ExpressiveFace from './ExpressiveFace';
import BombCounter from './BombCounter';

function GameHeader({
  displayTime,
  gameStatus,
  bombCounter,
  dispatchGameStatus,
  mouseDownOnBoard,
  clockReset,
  createNewGame,
  setCellToReveal,
}) {
  return (
    <div className="game-header-container">
      <BombCounter bombCounter={bombCounter} />
      <ExpressiveFace
        gameStatus={gameStatus}
        dispatchGameStatus={dispatchGameStatus}
        mouseDownOnBoard={mouseDownOnBoard}
        clockReset={clockReset}
        createNewGame={createNewGame}
        setCellToReveal={setCellToReveal}
      />
      <Clock displayTime={displayTime} />
    </div>
  );
}

export default GameHeader;
