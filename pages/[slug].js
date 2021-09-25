import React from 'react';
import { useRouter } from 'next/router';
import Desktop from 'shared/desktop';
import Window from 'shared/window';

function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <React.Fragment>
      <Desktop />
      <Window slug={slug} />
    </React.Fragment>
  );
}

export default Slug;
