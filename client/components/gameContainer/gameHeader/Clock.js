import React from 'react';

function Clock({ displayTime }) {
  return (
    <div className="clock-container">
      {displayTime}
    </div>
  );
}

export default Clock;
