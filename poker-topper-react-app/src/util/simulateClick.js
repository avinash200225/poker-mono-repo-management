export default (function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }); // If cancelled, don't dispatch our event
  
    return !elem.dispatchEvent(evt);
  });