import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import persistMiddleware, { getPersistedState } from './persist';

function Store({ children, initialState }) {
  const composeEnhanced = typeof window === 'undefined'
    ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = composeEnhanced(
    persistMiddleware(),
  );

  const store = createStore(rootReducer, initialState, enhancers);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

Store.defaultProps = {
  initialState: {},
};

Store.propTypes = {
  children: PropTypes.shape().isRequired,
  initialState: PropTypes.shape(),
};

export function persist(App) {
  // eslint-disable-next-line no-param-reassign
  App.getInitialProps = ({ ctx }) => ({
    pageProps: {
      initialState: getPersistedState(ctx.req),
    },
  });

  return App;
}

export default Store;
