---
title: 'Performance must-haves: Debounce & Throttle'
date: 2019-11-03 15:50:16
tags:
  - Performance
---

Performance is a huge topic in software development in general and there are many other stuff to keep in mind if you want deep knowledge about this topic. Two concepts that help improve a lot the performance of recurring events are *debounce*  and *throttle*.

<!-- more -->

It can all be summarised this way:

* **Debounce** ensures the function is executed only once for a recurring event.
* **Throttle** delays the execution of a function reducing the number of times it's called.

[This demo][1] illustrates the difference with an example of the `mouseover` event in JavaScript.

## JavaScript Examples

### Debounce

```javascript
const debounce = (func, delay = 100) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  }
};

// Usage
const func = () => console.log('debounced');
document.addEventListener('mouseover', debounce(func, 250));
```

### Throttle

```javascript
const throttle = (callback, delay = 100, ignoresLast) => {
  let lastTime = 0;
  let timer;
  return (...args) => {
    const exec = () => {
      lastTime = new Date();
      callback.apply(this, args);
    };
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    const diff = new Date() - lastTime;
    if (diff > delay) {
      exec();
    } else if(!ignoresLast) {
      timer = setTimeout(exec, delay - diff);
    }
  };
};

// Usage
const func = () => console.log('throttled');
document.addEventListener('mouseover', throttle(func, 250));
```


[1]: http://demo.nimius.net/debounce_throttle/
