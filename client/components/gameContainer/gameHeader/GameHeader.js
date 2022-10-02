import React from 'react';
import Clock from './Clock';
import ExpressiveFace from './ExpressiveFace';

function GameHeader({
  displayTime,
  gameStatus,
  dispatchGameStatus,
  mouseDownOnBoard,
  clockReset }) {
  return (
    <div>
      <ExpressiveFace
        gameStatus={gameStatus}
        dispatchGameStatus={dispatchGameStatus}
        mouseDownOnBoard={mouseDownOnBoard}
        clockReset={clockReset}
      />
      <Clock displayTime={displayTime} />
    </div>
  );
}

export default GameHeader;
