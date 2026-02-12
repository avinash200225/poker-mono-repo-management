function isIframe() {
  return window.top !== window.self;
}

export default isIframe;