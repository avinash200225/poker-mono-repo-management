import simulateClick from './simulateClick';
export default (() => {
  let lastTouchEvent = Date.now();
  document.addEventListener('touchend', e => {
    const t2 = Date.now();
    const t1 = lastTouchEvent || t2;
    const dt = t2 - t1;
    const fingers = e.touches.length;
    lastTouchEvent = t2;
    if (!dt || dt > 500 || fingers > 1) return; // Prevent zoom functionality

    e.preventDefault(); // Simulate a click event on the e.target

    simulateClick(e.target);
  });
});