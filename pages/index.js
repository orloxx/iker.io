import React from 'react';
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';

import styles from 'styles/modules/home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
    </div>
  )
}
