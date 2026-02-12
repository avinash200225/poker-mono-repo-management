import { useState, useCallback, useEffect } from "react";
import { useInterval } from "./useInterval";
export function useCounter({
  start,
  end,
  delay = 1000,
  step = 1,
  onEnd = () => {},
}) {
  const [count, setCount] = useState(start);
  const restart = useCallback((from) => setCount(from || start), [start]);
  const stop = useCallback((at) => setCount(at || end), [end]);
  const increment = start > end ? -step : step;
  useInterval(
    () => {
      setCount(count + increment);
    },
    count === end ? null : delay
  );
  useEffect(() => {
    if (count === end) {
      onEnd();
    }
  }, [count, end, onEnd]);
  return {
    count,
    restart,
    stop,
  };
}
