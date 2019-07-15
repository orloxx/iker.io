import throttle from 'utils/throttle';

const onScroll = (callback, limit = 200) => {
  window.addEventListener('scroll', throttle(callback, limit));
};

export default onScroll;
