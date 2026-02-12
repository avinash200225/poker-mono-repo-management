function isPopup() {
  return window.opener && window.opener !== window;
}

export default isPopup;