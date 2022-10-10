/* eslint no-param-reassign: 0 */

import React, { useState, useEffect } from 'react';

function padInteger(int, desiredLength = 0) {
  let intIsNegative = false;
  if (int < 0) {
    desiredLength++;
    int *= -1;
    intIsNegative = true;
  }
  let numAsString = int.toString();
  while (numAsString.length < desiredLength) {
    numAsString = `0${numAsString}`;
  }
  if (intIsNegative) numAsString = `-${numAsString}`;
  return numAsString;
}

function BombCounter({ bombCounter }) {
  return (
    <div className="bomb-counter-wrapper">
      <div className="bomb-counter">
        {padInteger(bombCounter, 3)}
      </div>

    </div>
  );
}

export default BombCounter;
