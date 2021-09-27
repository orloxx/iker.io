import React from 'react';
import PropTypes from 'prop-types';
import Store, { persist } from 'store';
import CustomHead from 'shared/custom-head';

import 'styles/globals.scss';
import styles from 'styles/modules/home.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Store initialState={pageProps.initialState}>
      <div className={styles.container}>
        <CustomHead />
        {/* Component will re-render after each router change */}
        <Component />
      </div>
    </Store>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default persist(MyApp);
