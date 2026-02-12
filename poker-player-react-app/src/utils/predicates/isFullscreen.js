function isFullscreen() {
  return window.fullScreen || window.innerWidth === screen.width && window.innerHeight === screen.height;
}

export default isFullscreen;