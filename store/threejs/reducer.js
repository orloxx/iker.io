import { SET_CONFIG } from './actions'

export const INITIAL_STATE = {}

const threeJS = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_CONFIG:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default threeJS
