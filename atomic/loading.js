import React from 'react'

import styles from 'styles/modules/loading.module.scss'

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.one} />
        <div className={styles.two} />
        <div className={styles.three} />
      </div>
    </div>
  )
}

export default Loading
