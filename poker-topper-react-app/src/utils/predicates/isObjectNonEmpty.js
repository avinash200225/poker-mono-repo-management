/**
 * Checks if the passed argument 
 *  - is an Object &&
 *  - has any own on props
 * and returns the result
 */

function isEmpty(obj) {
  for(const prop in obj) {
    if(Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

// isObject :: a -> Boolean
function isObjectNonEmpty(x) {
  // return !!x && {}.toString.call(x) === '[object Object]' && !isEmpty(x);
  // return JSON.stringify(x) === '{}';
  return !!x && Object.keys(x).length != 0;//ES5 supports Object.keys
}

export default isObjectNonEmpty;