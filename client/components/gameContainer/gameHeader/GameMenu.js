import React from 'react';

function GameMenu({ gameStatus }) {
  return (
    <div className="game-menu">
      GAME MENU/ status:
      {gameStatus}
    </div>
  );
}

export default GameMenu;
