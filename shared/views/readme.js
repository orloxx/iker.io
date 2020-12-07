import React, { useEffect, useState } from 'react';
import Window from 'shared/window';

import styles from 'styles/modules/view.module.scss';

const Readme = () => {
  const [html, setHtml] = useState('');

  async function getPost() {
    const data = await fetch('/api/posts?slug=about');
    const json = await data.json();
    setHtml(json.html);
  }

  useEffect(() => {
    getPost();
  }, []);

  return html && (
    <Window title="README">
      <div className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />
    </Window>
  );
};

export default Readme;
