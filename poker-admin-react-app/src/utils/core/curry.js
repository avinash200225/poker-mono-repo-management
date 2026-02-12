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
import isFunction from "../predicates/isFunction";

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
    for (
      var _len = arguments.length, xs = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      xs[_key] = arguments[_key];
    }

    var args = xs.length ? xs : [undefined];

    if (args.length < fn.length) {
      return curry(Function.bind.apply(fn, [null].concat(args)));
    }

    var val =
      args.length === fn.length
        ? fn.apply(undefined, args)
        : args.reduce(applyCurry, fn);

    if (isFunction(val)) {
      return curry(val);
    }

    return val;
  };
}

export default curry;
