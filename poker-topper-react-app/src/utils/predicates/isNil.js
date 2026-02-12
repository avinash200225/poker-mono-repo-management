/**
 * Checks if the passed argument is Undefined or Null
 * and returns the result
 */

// isNil :: a -> Boolean
function isNil(x) {
  return x === undefined || x === null;
}

export default isNil;