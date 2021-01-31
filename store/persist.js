import { applyMiddleware } from 'redux';
import Cookie from 'js-cookie';
import cookie from 'cookie';

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

function persistMiddleware() {
  function cookiePersist(store) {
    return (next) => (action) => {
      next(action);
      const { iconPosition } = store.getState();
      Cookie.set('iconPosition', iconPosition);
    };
  }

  return applyMiddleware(cookiePersist);
}

export function getPersistedState(req) {
  let iconPosition = {};

  try {
    const cookies = parseCookies(req);
    iconPosition = JSON.parse(cookies.iconPosition);
  } catch (e) {
    iconPosition = {};
  }

  return {
    iconPosition,
  };
}

export default persistMiddleware;
