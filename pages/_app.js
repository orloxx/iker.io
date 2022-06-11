import React from 'react'
import PropTypes from 'prop-types'
import Store, { persist } from 'store'
import CustomHead from 'shared/custom-head'
import Logger from 'atomic/logger'

// Need to explicitly import it when adding <link> to the head
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/globals.scss'
import styles from 'styles/modules/home.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Store initialState={pageProps.initialState}>
      <div className={styles.container}>
        <CustomHead />
        {/* Component will re-render after each router change */}
        <Component />
        <Logger />
      </div>
    </Store>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
}

export default persist(MyApp)
