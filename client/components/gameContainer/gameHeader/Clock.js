import React from 'react';

function Clock({ displayTime }) {
  return (
    <div className="clock-container">
      displayTime:
      {' '}
      {displayTime}
    </div>
  );
}

export default Clock;
