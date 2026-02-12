function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useCallback, useEffect, useState } from 'react';
import screenfull from 'screenfull';
export function useFullscreen({
  onChange,
  onError
} = {}) {
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const toggle = useCallback(on => {
    if (on == null) {
      // Toggle when no argument is passed
      screenfull.toggle();
    } else {
      on ? screenfull.request() : screenfull.exit();
    }
  }, []);
  useEffect(() => {
    function handleOnChange(e) {
      setIsFullscreen(screenfull.isFullscreen);

      if (onChange) {
        onChange(e);
      }
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', handleOnChange);
      screenfull.on('error', onError);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleOnChange);
        screenfull.off('error', onError);
      }
    };
  }, [onChange, onError]);
  return _objectSpread(_objectSpread({}, screenfull), {}, {
    isFullscreen,
    toggle
  });
}