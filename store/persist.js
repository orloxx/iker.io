import Cookie from 'js-cookie'
import cookie from 'cookie'
import { INITIAL_STATE } from 'store/settings/reducer'

export function getPersistedState() {
  let settings

  try {
    const cookies = cookie.parse(document.cookie)
    settings = JSON.parse(cookies.settings)
  } catch (e) {
    settings = INITIAL_STATE
  }

  return { settings }
}

function persistMiddleware(store) {
  return (next) => (action) => {
    next(action)
    const { settings } = store.getState()
    Cookie.set('settings', settings, { secure: true })
  }
}

export default persistMiddleware
