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

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/* eslint-disable consistent-return */

import { NAMESPACE } from "../../constants";

var getInvalidPutParamsError = function getInvalidPutParamsError(key) {
  return "Invalid parameters to put, (" + key + ", undefined)";
};

var getNotFoundError = function getNotFoundError(k) {
  return "Not Found [" + k + "]";
};

var _notFound = function _notFound(k) {
  var err = new Error(getNotFoundError(k));
  err.notFound = true;
  err.key = k;
  return err;
};

/**
 * Accessing window.localStorage from an iframe on incognito will throw an error
 * We need to check if localStorage access is supported
 */
var canUseLocalStorage = function canUseLocalStorage() {
  var key = "__TEST_LOCAL_STORAGE__";
  try {
    window.localStorage.setItem(key, "1");
    window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    return true;
  } catch (_) {
    return false;
  }
};

export var LocalStorage = (function () {
  function LocalStorage(namespace) {
    _classCallCheck(this, LocalStorage);

    this._namespace = namespace;
    this._store = canUseLocalStorage() ? window.localStorage : {};
    this._sep = "___";
  }

  _createClass(
    LocalStorage,
    [
      {
        key: "get",
        value: function get(key) {
          var k = [this._namespace, key].join(this._sep);
          if (!this._store[k]) return [_notFound(k)];

          try {
            return [null, JSON.parse(this._store[k])];
          } catch (err) {
            return [err];
          }
        },
      },
      {
        key: "put",
        value: function put(key, value) {
          if (typeof value === "undefined") {
            return [new Error(getInvalidPutParamsError(key))];
          }

          try {
            var k = [this._namespace, key].join(this._sep);
            var v = JSON.stringify(value);
            var result = (this._store[k] = v);
            return [null, result];
          } catch (err) {
            return [err];
          }
        },
      },
      {
        key: "has",
        value: function has(key) {
          var k = [this._namespace, key].join(this._sep);
          if (!this._store[k]) return [_notFound(k)];
          return [null, true];
        },
      },
      {
        key: "del",
        value: function del(key) {
          var _this = this;

          if (key) {
            var k = [this._namespace, key].join(this._sep);
            if (!this._store[k]) return [_notFound(k)];

            delete this._store[k];
            return [null];
          }

          Object.keys(this._store).forEach(function (k) {
            var ns = k.split(_this._sep)[0];
            if (ns === _this._namespace) {
              delete _this._store[k];
            }
          });
        },
      },
      {
        key: "search",
        value: function search(pattern) {
          var _this2 = this;

          if (!pattern) {
            throw new Error("A pattern is required");
          }

          var matchKeys = function matchKeys(key) {
            var _key$split = key.split(_this2._sep),
              _key$split2 = _slicedToArray(_key$split, 2),
              _key = _key$split2[1];

            if (!_key) return;
            if (!pattern.test(_key)) return;

            return key;
          };

          var makePairs = function makePairs(key) {
            return {
              key: key.split(_this2._sep)[1],
              value: _this2._store[key],
            };
          };

          return [
            null,
            Object.keys(this._store).filter(matchKeys).map(makePairs),
          ];
        },
      },
    ],
    [
      {
        key: "clear",
        value: function clear() {
          try {
            this._store.clear();
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]
  );

  return LocalStorage;
})();

export default new LocalStorage(NAMESPACE);
