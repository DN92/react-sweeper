import React from 'react';

function Clock({ displayTime }) {
  return (
    <div className="clock-wrapper">
      <div className="clock">
        {displayTime}
      </div>

    </div>
  );
}

export default Clock;
