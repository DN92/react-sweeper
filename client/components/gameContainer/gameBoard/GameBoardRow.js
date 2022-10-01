import React, { useMemo } from 'react';
import GameCellSingle from './GameCellSingle';

function GameBoardRow({ columns = 10, yCoor, gameBoard }) {
  const boardRow = useMemo(() => new Array(columns).fill(1), [columns]);

  return (
    <div className="game-board-row">
      {boardRow.map((cell, idx) => (
        <GameCellSingle
          key={`${cell}.${idx}`}
          xCoor={idx}
          yCoor={yCoor}
          gameBoard={gameBoard}
        />
      ))}
    </div>
  );
}

export default GameBoardRow;
