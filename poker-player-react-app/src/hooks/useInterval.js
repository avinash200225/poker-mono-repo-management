import { useRef, useEffect } from "react";
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(
    // eslint-disable-next-line
    () => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}
