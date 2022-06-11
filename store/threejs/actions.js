import { customFetch } from 'atomic/utils'
import { logError } from 'store/logger/actions'

export const SET_CONFIG = 'threeJS/SET_CONFIG'

// Actions
const setConfig = (config) => ({
  type: SET_CONFIG,
  payload: config,
})

export function fetchConfig(file) {
  return async (dispatch) => {
    try {
      const config = await customFetch(file)
      dispatch(setConfig(config))
    } catch (error) {
      dispatch(logError(error))
    }
  }
}

export function fetchPlainConfig() {
  return fetchConfig('/js/3d-empty.json')
}
