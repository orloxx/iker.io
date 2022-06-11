import { combineReducers } from 'redux'
import logger from 'store/logger/reducer'
import settings from 'store/settings/reducer'
import threeJS from 'store/threejs/reducer'

export default combineReducers({
  logger,
  settings,
  threeJS,
})
