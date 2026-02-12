/**
 * Checks if the passed argument is a Number
 * and returns the result.
 */

// isNumber :: a -> Boolean
function isNumber(x) {
  return typeof x === 'number' && !isNaN(x);
}

export default isNumber;