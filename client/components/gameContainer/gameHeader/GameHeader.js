import React from 'react';
import Clock from './Clock';
import ExpressiveFace from './ExpressiveFace';
import GameMenu from './GameMenu';
import BombCounter from './BombCounter';

function GameHeader({
  displayTime,
  gameStatus,
  bombCounter,
  dispatchGameStatus,
  mouseDownOnBoard,
  clockReset,
  createNewGame,
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
      />
      <Clock displayTime={displayTime} />
    </div>
  );
}

export default GameHeader;
