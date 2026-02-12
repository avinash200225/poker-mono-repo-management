/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
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
