import bowser from 'bowser';
import { BROWSER } from '../../constants';

export var getBrowser = function getBrowser() {
  var chrome = bowser.chrome,
      safari = bowser.safari,
      msie = bowser.msie,
      msedge = bowser.msedge,
      firefox = bowser.firefox,
      opera = bowser.opera;
  var CHROME = BROWSER.CHROME,
      SAFARI = BROWSER.SAFARI,
      EXPLORER = BROWSER.EXPLORER,
      EDGE = BROWSER.EDGE,
      FIREFOX = BROWSER.FIREFOX,
      OPERA = BROWSER.OPERA,
      UNKNOWN = BROWSER.UNKNOWN;


  return chrome && CHROME || safari && SAFARI || msie && EXPLORER || msedge && EDGE || firefox && FIREFOX || opera && OPERA || UNKNOWN;
};