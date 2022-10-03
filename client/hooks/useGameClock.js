/* eslint no-param-reassign: 0 */
import { useState, useMemo, useRef, useCallback } from 'react';

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

const useGameClock = (padding) => {
  const [clock, setClock] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const clockInterval = useRef(null);
  const displayTime = useMemo(
    () => padInteger(clock, padding),
    [clock, padding],
  );

  const startRunning = useCallback(
    () => {
      if (!isRunning) {
        setIsRunning(true);
        clearInterval(clockInterval.current);
        clockInterval.current = setInterval(() => {
          setClock((clock) => clock + 1);
        }, 1000);
      }
    },
    [setClock, isRunning],
  );

  const stopRunning = useCallback(() => {
    setIsRunning(false);
    clearInterval(clockInterval.current);
  }, []);

  const resetClock = useCallback(() => {
    clearInterval(clockInterval.current);
    setIsRunning(false);
    setClock(0);
  }, []);

  const clockActions = useMemo(() => {
    return {
      startRunning,
      stopRunning,
      resetClock,
    };
  }, [startRunning, stopRunning, resetClock]);

  return [displayTime, clockActions];
};

export default useGameClock;
