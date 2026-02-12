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
var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

export default (function (maybeHex) {
  var alpha =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!String(maybeHex).startsWith("#")) return "";

  var hex = maybeHex.replace("#", "");

  // Adjust for shorthand notation
  var increment = hex.length === 3 ? 1 : 2;

  var _hex$match$map = hex
      .match(new RegExp(".{1," + increment + "}", "g"))
      .map(function (value) {
        return parseInt(
          value.length % 2 === 0 ? value : "" + value + value,
          16
        );
      }),
    _hex$match$map2 = _slicedToArray(_hex$match$map, 3),
    red = _hex$match$map2[0],
    green = _hex$match$map2[1],
    blue = _hex$match$map2[2];

  var rgb = red + ", " + green + ", " + blue;

  if (alpha === 1) {
    return "rgb(" + rgb + ")";
  }

  return "rgba(" + rgb + ", " + alpha + ")";
});
