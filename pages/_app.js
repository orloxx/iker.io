import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext, initialContext } from 'config';
import Store, { persist } from 'store';
import CustomHead from 'shared/custom-head';

import 'styles/globals.scss';
import styles from 'styles/modules/home.module.scss';

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState(initialContext.settings);

  function updateSettings(newSettings) {
    setSettings({ ...settings, ...newSettings });
  }

  const contextValues = { settings, updateSettings };

  return (
    <Store initialState={pageProps.initialState}>
      <AppContext.Provider value={contextValues}>
        <div className={styles.container}>
          <CustomHead />
          {/* Component will re-render after each router change */}
          <Component />
        </div>
      </AppContext.Provider>
    </Store>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default persist(MyApp);
