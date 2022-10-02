import React from 'react';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function ExpressiveFace({
  gameStatus,
  dispatchGameStatus,
  mouseDownOnBoard,
  clockReset,
  createNewGame,
}) {
  const handleClick = () => {
    clockReset();
    dispatchGameStatus({ type: INIT });
    createNewGame();
  };

  const image = (() => {
    if (mouseDownOnBoard && gameStatus !== LOST) return '/images/openMouthFace.jpg';

    switch (gameStatus) {
    case INIT:
      return '/images/happyFace.png';
    case RUNNING:
      return '/images/happyFace.png';
    case WON:
      return '/images/sunglassFace.jpg';
    case LOST:
      return '/images/deadFace.jpg';
    default:
      return '/images/happyFace.png';
    }
  })();

  return (
    <button
      type="button"
      className="expressive-face"
      onClick={handleClick}
      onKeyPress={handleClick}
      tabIndex={0}
    >
      <img className="expressive-face-img" src={image} alt="variable emoji" />
    </button>
  );
}

export default ExpressiveFace;
