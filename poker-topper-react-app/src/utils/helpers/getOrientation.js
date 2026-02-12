export var getOrientation = function getOrientation() {
  return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
};