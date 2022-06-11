import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import persistMiddleware, { getPersistedState } from './persist'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

function getCompose() {
  const extensionCompose =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  return extensionCompose && IS_DEVELOPMENT ? extensionCompose || compose : compose
}

function Store({ children, initialState }) {
  const composeEnhanced = getCompose()
  const middlewares = [persistMiddleware, thunkMiddleware]

  const enhancers = composeEnhanced(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, initialState, enhancers)

  return <Provider store={store}>{children}</Provider>
}

Store.defaultProps = {
  initialState: {},
}

Store.propTypes = {
  children: PropTypes.shape().isRequired,
  initialState: PropTypes.shape(),
}

export function persist(App) {
  // eslint-disable-next-line no-param-reassign
  App.getInitialProps = ({ ctx }) => ({
    pageProps: {
      initialState: getPersistedState(ctx.req),
    },
  })

  return App
}

export default Store
