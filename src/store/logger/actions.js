/* eslint-disable no-console */
// Only file that should allow no-console
export const NEW_LOG = 'logger/NEW_LOG'
export const CLEAR_CURRENT = 'logger/CLEAR_CURRENT'

let clearTimeoutId = null
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const LOG_LEVELS = ['error', 'warn', 'info']

const getLogLevel = () => {
  if (IS_DEVELOPMENT) return 2
  const localLogLevel = window.localStorage.getItem('log-level') || 'error'
  return LOG_LEVELS.indexOf(localLogLevel)
}

// Actions
const setLog = (log) => ({
  type: NEW_LOG,
  payload: log,
})

export const clearCurrent = () => ({
  type: CLEAR_CURRENT,
})

export const log = (type, message) => (dispatch) => {
  if (clearTimeoutId) clearTimeout(clearTimeoutId)

  dispatch(setLog({ type, message }))

  clearTimeoutId = setTimeout(() => {
    dispatch(clearCurrent())
  }, 5000)
}

export const logInfo = (obj) => (dispatch) => {
  if (IS_DEVELOPMENT) console.log(obj)
  if (getLogLevel() > 1) dispatch(log('info', obj.toString()))
}
export const logOk = (obj) => (dispatch) => {
  if (IS_DEVELOPMENT) console.log(obj)
  dispatch(log('success', obj.toString()))
}
export const logWarn = (obj) => (dispatch) => {
  if (IS_DEVELOPMENT) console.warn(obj)
  if (getLogLevel() > 0) dispatch(log('warning', obj.toString()))
}
export const logError = (obj) => (dispatch) => {
  if (IS_DEVELOPMENT) console.error(obj)
  dispatch(log('error', obj.toString()))
}
