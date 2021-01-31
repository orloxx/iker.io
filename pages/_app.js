import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppContext, initialContext } from 'config';
import store from 'store';

import 'styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState(initialContext.settings);

  function updateSettings(newSettings) {
    setSettings({ ...settings, ...newSettings });
  }

  const contextValues = { settings, updateSettings };

  return (
    <Provider store={store}>
      <AppContext.Provider value={contextValues}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </Provider>
  );
}

export default MyApp
