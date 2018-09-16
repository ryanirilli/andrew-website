// requestAnimationFrame() shim by Paul Irish
const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
export const requestInterval = (fn, delay) => {
  if (
    !window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(
      window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame
    ) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame
  )
    return window.setInterval(fn, delay);

  let start = Date.now();
  const handle = {};

  function loop() {
    const current = Date.now();
    const delta = current - start;

    if (delta >= delay) {
      fn.call();
      start = Date.now();
    }

    handle.value = requestAnimFrame(loop);
  }

  handle.value = requestAnimFrame(loop);
  return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
export const clearRequestInterval = handle => {
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(handle.value)
    : window.webkitCancelAnimationFrame
      ? window.webkitCancelAnimationFrame(handle.value)
      : window.webkitCancelRequestAnimationFrame
        ? window.webkitCancelRequestAnimationFrame(
            handle.value
          ) /* Support for legacy API */
        : window.mozCancelRequestAnimationFrame
          ? window.mozCancelRequestAnimationFrame(handle.value)
          : window.oCancelRequestAnimationFrame
            ? window.oCancelRequestAnimationFrame(handle.value)
            : window.msCancelRequestAnimationFrame
              ? window.msCancelRequestAnimationFrame(handle.value)
              : clearInterval(handle);
};
