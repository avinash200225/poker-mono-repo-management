import bowser from 'bowser';
import { PLATFORM } from '../../constants';

export var getPlatform = function getPlatform() {
  var mobile = bowser.mobile,
      tablet = bowser.tablet;

  return mobile && PLATFORM.PHONE || tablet && PLATFORM.TABLET || PLATFORM.DESKTOP;
};