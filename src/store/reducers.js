// combineReducers comes from Redux Toolkit rather than from redux directly:
// RTK already depends on redux 5, so a second direct dependency on it was only
// a way for the two to drift — and they had, this file's copy sitting on redux
// 4 while RTK built the store with 5. Same function, re-exported.
import { combineReducers } from "@reduxjs/toolkit";
import logger, { INITIAL_STATE as loggerState } from "store/logger/reducer";
import settings, {
  INITIAL_STATE as settingsState,
} from "store/settings/reducer";

export const INITIAL_STATE = {
  logger: loggerState,
  settings: settingsState,
};

export default combineReducers({
  logger,
  settings,
});
