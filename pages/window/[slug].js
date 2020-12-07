import React from 'react';
import { useRouter } from 'next/router'
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';
import Window from 'shared/window';
import Readme from 'shared/views/readme';

import styles from 'styles/modules/home.module.scss'

const WINDOWS = {
  readme: Readme
};

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const CustomWindow = WINDOWS[slug] || Window;
  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
      <CustomWindow />
    </div>
  );
};

export default Slug;
