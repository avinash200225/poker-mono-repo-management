import isFunction from '../predicates/isFunction';

function applyCurry(fn, arg) {
  if (!isFunction(fn)) {
    return fn;
  }
  return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg);
}

/**
 * Takes a function and it will return another function
 * that can be called in any form
 * until all arguments have been provided.
 */

// curry :: ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  return function () {
    for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
      xs[_key] = arguments[_key];
    }

    var args = xs.length ? xs : [undefined];

    if (args.length < fn.length) {
      return curry(Function.bind.apply(fn, [null].concat(args)));
    }

    var val = args.length === fn.length ? fn.apply(undefined, args) : args.reduce(applyCurry, fn);

    if (isFunction(val)) {
      return curry(val);
    }

    return val;
  };
}

export default curry;