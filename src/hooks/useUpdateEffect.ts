import { useRef, useEffect } from 'react';

export const useUpdateEffect = (
  callback: () => void,
  dependencies: Array<any>
) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      return;
    }

    callback();
  }, dependencies);
};
