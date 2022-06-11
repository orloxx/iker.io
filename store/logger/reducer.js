import { CLEAR_CURRENT, NEW_LOG } from 'store/logger/actions'

export const INITIAL_STATE = {
  current: {
    type: null,
    message: null,
    timestamp: null,
  },
  history: [],
}

const logger = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case NEW_LOG: {
      const newLog = { ...action.payload, timestamp: Date.now() }
      return {
        ...state,
        current: newLog,
        history: [...state.history, newLog],
      }
    }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: INITIAL_STATE.current,
      }
    default:
      return state
  }
}

export default logger
