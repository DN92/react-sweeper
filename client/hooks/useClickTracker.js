import { useState, useMemo, useCallback } from 'react';

const useClickTracker = () => {
  const [mouse0Clicked, setMouse0Clicked] = useState(false);
  const [mouse1Clicked, setMouse1Clicked] = useState(false);
  const [mouse2Clicked, setMouse2Clicked] = useState(false);

  const clickTracker = useMemo(() => {
    return {
      zero: mouse0Clicked,
      one: mouse1Clicked,
      two: mouse2Clicked,
      hasOneTwoClick: () => (mouse0Clicked && mouse1Clicked),
      hasOneThreeClick: () => (mouse0Clicked && mouse2Clicked),
      hasTwoThreeClick: () => (mouse1Clicked && mouse2Clicked),
      hasOneTwoThreeClick: () => (mouse0Clicked && mouse1Clicked && mouse2Clicked),
    };
  }, [mouse0Clicked, mouse1Clicked, mouse2Clicked]);

  const checkMouseDown = useCallback((event) => {
    const { button } = event;
    if (button === 0) setMouse0Clicked(true);
    if (button === 1) setMouse1Clicked(true);
    if (button === 2) setMouse2Clicked(true);
  }, [setMouse0Clicked, setMouse1Clicked, setMouse2Clicked]);

  const checkMouseUp = useCallback((event) => {
    const { button } = event;
    if (button === 0) setMouse0Clicked(false);
    if (button === 1) setMouse1Clicked(false);
    if (button === 2) setMouse2Clicked(false);
  }, [setMouse0Clicked, setMouse1Clicked, setMouse2Clicked]);

  const resetClickTracker = useCallback(
    () => {
      setMouse0Clicked(false);
      setMouse1Clicked(false);
      setMouse2Clicked(false);
    },
    [setMouse0Clicked, setMouse1Clicked, setMouse2Clicked],
  );

  return [clickTracker, checkMouseDown, checkMouseUp, resetClickTracker];
};

export default useClickTracker;
