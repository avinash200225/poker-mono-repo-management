import { CURRENCY_SYMBOLS } from '../../constants';

var getSymbolByCurrencyCode = function getSymbolByCurrencyCode(code) {
  if (typeof CURRENCY_SYMBOLS[code] !== 'undefined') {
    return CURRENCY_SYMBOLS[code];
  }

  return code;
};

export default getSymbolByCurrencyCode;