import { useState, useCallback } from 'react';

const useRerender = () => {
  const [forceRender, setForceRender] = useState(0);

  const rerender = useCallback(() => {
    setForceRender((prev) => prev + 1);
  }, [setForceRender]);

  return rerender;
};

export default useRerender;
