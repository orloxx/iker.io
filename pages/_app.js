import React from 'react'
import PropTypes from 'prop-types'
import CustomProvider from 'store'
import CustomHead from 'molecules/custom-head'
import Logger from 'atoms/logger'

// Need to explicitly import it when adding <link> to the head
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/globals.scss'
import styles from 'styles/modules/home.module.scss'

function MyApp({ Component }) {
  return (
    <CustomProvider>
      <div className={styles.container}>
        <CustomHead />
        {/* Component will re-render after each router change */}
        <Component />
        <Logger />
      </div>
    </CustomProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
}

export default MyApp
