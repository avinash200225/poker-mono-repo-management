
function addAmountSeparator(amount, separator) {
    var returnArr = [];
    var splitValue = String(amount).split('.'); // split value to separate value from decimal value
    var value = splitValue[0];
    var decimalValue = splitValue.length > 1 ? '.' + splitValue[1] : '';
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
    return returnArr.reverse().join('') + decimalValue;
  };
  
  export const formatRupee = (val) => `₹` + addAmountSeparator(val, ",")