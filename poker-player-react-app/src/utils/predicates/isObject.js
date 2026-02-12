/**
 * Checks if the passed argument is an Object
 * and returns the result
 */

// isObject :: a -> Boolean
function isObject(x) {
  return !!x && {}.toString.call(x) === '[object Object]';
}

export default isObject;