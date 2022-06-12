import { combineReducers } from 'redux'
import logger, { INITIAL_STATE as loggerState } from 'store/logger/reducer'
import settings, { INITIAL_STATE as settingsState } from 'store/settings/reducer'
import threeJS, { INITIAL_STATE as threeJSState } from 'store/threejs/reducer'

export const INITIAL_STATE = {
  logger: loggerState,
  settings: settingsState,
  threeJS: threeJSState,
}

export default combineReducers({
  logger,
  settings,
  threeJS,
})
