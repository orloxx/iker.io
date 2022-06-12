import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider, useDispatch } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import persistMiddleware, { getPersistedState } from './persist'
import { setSettings } from './settings/actions'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

function getCompose() {
  const extensionCompose =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  return extensionCompose && IS_DEVELOPMENT ? extensionCompose || compose : compose
}

const composeEnhanced = getCompose()
const middlewares = [persistMiddleware, thunkMiddleware]
const enhancers = composeEnhanced(applyMiddleware(...middlewares))
const store = createStore(rootReducer, enhancers)

function StoreWrapper({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const { settings } = getPersistedState()
    dispatch(setSettings(settings))
  }, [])

  return children
}

function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreWrapper>{children}</StoreWrapper>
    </Provider>
  )
}

CustomProvider.propTypes = {
  children: PropTypes.shape().isRequired,
}

export default CustomProvider
