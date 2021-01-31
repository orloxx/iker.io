import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext, initialContext } from 'config';
import Store, { persist } from 'store';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState(initialContext.settings);

  function updateSettings(newSettings) {
    setSettings({ ...settings, ...newSettings });
  }

  const contextValues = { settings, updateSettings };

  return (
    <Store initialState={pageProps.initialState}>
      <AppContext.Provider value={contextValues}>
        <Component />
      </AppContext.Provider>
    </Store>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default persist(MyApp);
