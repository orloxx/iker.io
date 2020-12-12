import React, { useState } from 'react';
import { AppContext, initialContext } from 'config';

import 'styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState(initialContext.settings);

  function updateSettings(newSettings) {
    setSettings({ ...settings, ...newSettings });
  }

  const contextValues = { settings, updateSettings };

  return (
    <AppContext.Provider value={contextValues}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp
