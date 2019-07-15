/**
 * Function to throttle execution of events
 *
 * i.e.
 * input.addEventListener('keyup', throttle(() => { // do something }, 1000))
 *
 * @param {Function} func - callback function
 * @param {number} limit - Milliseconds to wait for each execution
 * @return {Function} The throttled function
 */
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default throttle;
