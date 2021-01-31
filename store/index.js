import React  from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import persistMiddleware, { getPersistedState } from './persist';

function Store({ children, initialState }) {
  const composeEnhanced = typeof window === 'undefined' ?
    compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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

export function persist(App) {
  App.getInitialProps = ({ ctx }) => {

    return {
      pageProps: {
        initialState: getPersistedState(ctx.req)
      },
    };
  };

  return App;
}

export default Store;
