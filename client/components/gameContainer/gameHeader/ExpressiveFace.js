import React from 'react';

const INIT = 'init';
const RUNNING = 'running';
const WON = 'won';
const LOST = 'lost';

function ExpressiveFace({ gameStatus, dispatchGameStatus, mouseDownOnBoard, clockReset }) {
  const handleClick = () => {
    clockReset();
    dispatchGameStatus({ type: INIT });
    // make new game
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
    <div
      role="button"
      onClick={handleClick}
      onKeyPress={handleClick}
      tabIndex={0}
    >
      <img src={image} alt="variable emoji" />
    </div>
  );
}

export default ExpressiveFace;
