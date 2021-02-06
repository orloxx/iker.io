import React from 'react';
import { useRouter } from 'next/router';
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';
import Window from 'shared/window';

import styles from 'styles/modules/home.module.scss';

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
      <Window slug={slug} />
    </div>
  );
}

export default Slug;
