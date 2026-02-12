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
function addAmountSeparator(amount, separator) {
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
}

// export const formatRupee = (val) => `₹` + addAmountSeparator(val, ",")

export const formatRupee = (val) => {
  return val.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
};
