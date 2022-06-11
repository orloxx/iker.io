import Cookie from 'js-cookie'
import cookie from 'cookie'
import { INITIAL_STATE } from 'store/settings/reducer'

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

export function getPersistedState(req) {
  let settings

  try {
    const cookies = parseCookies(req)
    settings = JSON.parse(cookies.settings)
  } catch (e) {
    settings = INITIAL_STATE
  }

  return {
    settings,
  }
}

function persistMiddleware(store) {
  return (next) => (action) => {
    next(action)
    const { settings } = store.getState()
    Cookie.set('settings', settings, { secure: true })
  }
}

export default persistMiddleware
