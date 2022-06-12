import Cookie from 'js-cookie'
import { INITIAL_STATE } from 'store/reducers'

const REDUCERS_TO_PERSIST = ['settings']

export function getPersistedState() {
  try {
    return REDUCERS_TO_PERSIST.reduce(
      (prev, reducer) => ({
        ...prev,
        [reducer]: JSON.parse(Cookie.get(reducer)),
      }),
      INITIAL_STATE,
    )
  } catch (e) {
    return INITIAL_STATE
  }
}

function isPersist(type) {
  return type && REDUCERS_TO_PERSIST.some((r) => type.includes(r))
}

function persistMiddleware(store) {
  return (next) => (action) => {
    next(action)
    if (isPersist(action.type)) {
      const state = store.getState()
      REDUCERS_TO_PERSIST.forEach((reducer) => {
        Cookie.set(reducer, state[reducer], { secure: true })
      })
    }
  }
}

export default persistMiddleware
