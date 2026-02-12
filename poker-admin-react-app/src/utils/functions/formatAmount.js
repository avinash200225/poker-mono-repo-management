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
import { AMOUNT_FORMAT_TYPES, AMOUNT_TYPES } from "../../constants";
import getSymbolByCurrencyCode from "../core/symbol";

var addAmountToFixed = function addAmountToFixed(amount, decimal) {
  // make sure decimal value is valid
  if (decimal === undefined || isNaN(decimal)) decimal = 2;
  // execute to fixed command to trim decimal
  amount = Number(amount).toFixed(decimal);
  // make sure if decimal is 00, trim it out
  if (Number(amount) % 1 === 0) amount = Number(amount).toFixed(0);
  return amount;
};

// add display amount separator ('1,000', '23,000,123')
var addAmountSeparator = function addAmountSeparator(amount, separator) {
  var returnArr = [];
  var splitValue = String(amount).split("."); // split value to separate value from decimal value
  var value = splitValue[0];
  var decimalValue = splitValue.length > 1 ? "." + splitValue[1] : "";
  var count = 3; // every 3 letters add separator
  var totalCount = 0; // keep count of chars added so far

  // loop value chars from end to start (to add separators correctly)
  for (var i = value.length - 1; i >= 0; i--) {
    // add current looped char
    returnArr.push(value.charAt(i));
    totalCount++;
    // if passed 3 letters from the end, add separator, also make sure its not the first char
    if (totalCount % count === 0 && i - 1 >= 0) returnArr.push(separator);
  }
  // since we added to arr from end, we need to reverse the array and convert it back to string, re-add decimal
  return returnArr.reverse().join("") + decimalValue;
};

export function formatAmount(
  amount,
  amountType,
  formatConfig,
  currencyCode,
  showCurrencySymbol, // used to override the configuration attribute
  showCurrencyCode // used to override the configuration attribute
) {
  // make sure received value is number
  var finalAmount = Number(amount);

  // Make sure handling negative values correctly by treating them as non negative and multiplying by -1 at the end
  var isNegative = finalAmount < 0;
  var returnValue = 0;

  finalAmount = Math.abs(amount);

  // Set format type and currency display according to format type received
  var formatType = AMOUNT_TYPES.BET;
  var boShowCurrency = false;

  switch (amountType) {
    case AMOUNT_TYPES.BET: {
      formatType = formatConfig.betFormat;
      boShowCurrency = formatConfig.showBetCurrency;
      break;
    }
    case AMOUNT_TYPES.LIMIT: {
      formatType = formatConfig.limitFormat;
      boShowCurrency = formatConfig.showLimitCurrency;
      break;
    }
    case AMOUNT_TYPES.CHIP: {
      formatType = AMOUNT_FORMAT_TYPES.EXTEND_LETTER;
      boShowCurrency = false;
      break;
    }
    default:
      break;
  }

  // handle each format separately
  switch (formatType) {
    // on comma, separate value by commas, only 2 digits after decimal
    case AMOUNT_FORMAT_TYPES.COMMA: {
      returnValue = addAmountSeparator(addAmountToFixed(finalAmount, 2), ",");
      break;
    }
    // on entire, leave sum as is, only 2 digits after decimal
    case AMOUNT_FORMAT_TYPES.ENTIRE: {
      returnValue = addAmountToFixed(finalAmount, 2);
      break;
    }
    // on letter, if >= 1000, divide by 1000 and display k symbol, else leave amount as is, only 2 digits after decimal
    case AMOUNT_FORMAT_TYPES.LETTER: {
      if (finalAmount >= 1000) {
        returnValue = finalAmount / 1000;
        returnValue = addAmountToFixed(returnValue, 2);
        returnValue += formatConfig.kSymbol;
      } else {
        returnValue = addAmountToFixed(finalAmount, 2);
      }
      break;
    }
    // on extend letter, same as letter but also trim millions
    case AMOUNT_FORMAT_TYPES.EXTEND_LETTER: {
      if (finalAmount >= 1000000) {
        returnValue = finalAmount / 1000000;
        returnValue = addAmountToFixed(returnValue, 2);
        returnValue += formatConfig.mSymbol;
      } else if (finalAmount >= 1000) {
        returnValue = finalAmount / 1000;
        returnValue = addAmountToFixed(returnValue, 2);
        returnValue += formatConfig.kSymbol;
      } else {
        returnValue = addAmountToFixed(finalAmount, 2);
      }
      break;
    }
    default:
      break;
  }

  // Re-add negative value symbol if amount was negative
  if (isNegative) returnValue = "-" + returnValue;

  if (!boShowCurrency) return returnValue;

  var showSymbol =
    typeof showCurrencySymbol !== "undefined"
      ? showCurrencySymbol
      : formatConfig.showCurrencySymbol;
  var showCode =
    typeof showCurrencyCode !== "undefined"
      ? showCurrencyCode
      : formatConfig.showCurrencyCode;

  // Add currency symbol
  if (showSymbol) {
    var symbol = getSymbolByCurrencyCode(currencyCode);
    returnValue = symbol + " " + returnValue;
  }

  // Add currency code
  if (showCode) {
    returnValue = returnValue + " " + currencyCode;
  }

  return returnValue;
}
