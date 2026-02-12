/* eslint-disable no-shadow, no-return-assign */

import createHistory from 'history/createBrowserHistory';
import { URL, NAVIGATION_METHODS } from '../../constants';

var history = void 0;

var isHandheld = function isHandheld() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

export function getHistory() {
  return history || (history = createHistory());
}

export function setHistory(h) {
  history = h;
}

export function openTab(url) {
  window.open(url, '_blank');
}

export function openPopup(url, _ref) {
  var width = _ref.width,
      height = _ref.height;

  // get popup size from options if exist, else make it match screen size
  var size = {
    width: width || window.innerWidth,
    height: height || window.innerHeight
  };

  // handle dual screens
  var dualScreenLeft = window.screenX !== undefined ? window.screenX : screen.left;
  var dualScreenTop = window.screenY !== undefined ? window.screenY : screen.top;

  // set size for popup
  var popupWidth = Math.min(size.width, window.innerWidth);
  var popupHeight = Math.min(size.height, window.innerHeight);

  // set position of popup
  var popupLeft = dualScreenLeft + (window.innerWidth - popupWidth) / 2;
  var popupTop = dualScreenTop + (window.innerHeight - popupHeight) / 2;

  // set popup size
  var popupOptions = 'height=' + popupHeight + ',width=' + popupWidth;
  var popupWindow = window.open(url, '_blank', popupOptions);

  // make sure popup was created and not blocked before manipulating window
  if (popupWindow) {
    popupWindow.moveTo(popupLeft, popupTop);
    popupWindow.focus();
  } else {
    // warn that popup was not created
    throw new Error('Popup was blocked');
  }
}

export function historyPush(url, _ref2) {
  var outerLink = _ref2.outerLink;

  if (url.indexOf('http:') > -1 || url.indexOf('https:') > -1 || outerLink) {
    window.location = url;
  } else {
    window.location.href = url;
  }
}

export function navigate(method, url) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var baseUrl = method === NAVIGATION_METHODS.LOBBY ? URL.LOBBY : url;
  var _url = options.queryString ? baseUrl.concat(baseUrl.indexOf('?') === -1 ? '?' : '&').concat(options.queryString) : baseUrl;

  /* eslint-disable max-len */
  if (method === NAVIGATION_METHODS.LOBBY || method === NAVIGATION_METHODS.URL || method === NAVIGATION_METHODS.REPLACE || method === NAVIGATION_METHODS.POPUP && !!window.opener) {
    historyPush(_url, options);
  } else if (method === NAVIGATION_METHODS.TAB) {
    openTab(_url, options);
  } else if (method === NAVIGATION_METHODS.POPUP) {
    isHandheld() ? openTab(_url) : openPopup(_url, options);
  } else {
    throw new Error('No navigation method provided');
  }
}