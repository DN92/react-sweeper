import React, { useState, useEffect } from 'react';

function BombCounter({ bombCounter }) {
  return (
    <div className="bomb-counter">
      {bombCounter}
    </div>
  );
}

export default BombCounter;
