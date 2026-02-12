/**
 * Checks if the passed argument is a Function
 * and returns the result
 */

// isFunction :: a -> Boolean
function isFunction(fn) {
  return typeof fn === 'function';
}

export default isFunction;