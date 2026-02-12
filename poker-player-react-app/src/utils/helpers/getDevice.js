import bowser from 'bowser';
import { OS } from '../../constants';

export var getDevice = function getDevice() {
  var ios = bowser.ios,
      android = bowser.android;

  return ios && OS.IOS || android && OS.ANDROID || OS.PC;
};