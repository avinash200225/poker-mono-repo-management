import { useState, useEffect, useRef } from 'react';
import { getOrientation } from '../utils';
export function useOrientationChange() {
  const [orientation, setOrientation] = useState(getOrientation());
  const ref = useRef(getOrientation());
  useEffect(() => {
    function update() {
      const next = getOrientation();

      if (next !== ref.current) {
        ref.current = next;
        setOrientation(next);
      }
    }

    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);
  return orientation;
}