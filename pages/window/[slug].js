import React from 'react';
import { useRouter } from 'next/router'
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';

import styles from 'styles/modules/home.module.scss'

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
    </div>
  );
};

export default Slug;
