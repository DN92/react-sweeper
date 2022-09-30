import { useState, useCallback } from 'react';

const useRerender = () => {
  const [, setCounter] = useState(0);

  const rerender = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, [setCounter]);

  return rerender;
};

export default useRerender;
