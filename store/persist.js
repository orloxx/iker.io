import { applyMiddleware } from 'redux';
import Cookie from 'js-cookie';
import cookie from 'cookie';
import { INITIAL_STATE } from 'store/settings/reducer';

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

function persistMiddleware() {
  function cookiePersist(store) {
    return (next) => (action) => {
      next(action);
      const { settings } = store.getState();
      Cookie.set('settings', settings, { secure: true });
    };
  }

  return applyMiddleware(cookiePersist);
}

export function getPersistedState(req) {
  let settings;

  try {
    const cookies = parseCookies(req);
    settings = JSON.parse(cookies.settings);
  } catch (e) {
    settings = INITIAL_STATE;
  }

  return {
    settings,
  };
}

export default persistMiddleware;
