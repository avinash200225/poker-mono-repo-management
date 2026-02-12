import { FRAME } from '../../constants';

import isPopup from '../predicates/isPopup';
import isIframe from '../predicates/isIframe';

export var getFrame = function getFrame() {
  return isPopup() && FRAME.POPUP || isIframe() && FRAME.IFRAME || FRAME.FULL;
};