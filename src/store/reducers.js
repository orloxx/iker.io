import { combineReducers } from 'redux'
import logger, { INITIAL_STATE as loggerState } from 'store/logger/reducer'
import settings, { INITIAL_STATE as settingsState } from 'store/settings/reducer'

export const INITIAL_STATE = {
  logger: loggerState,
  settings: settingsState,
}

export default combineReducers({
  logger,
  settings,
})
