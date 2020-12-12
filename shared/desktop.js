import React, { useContext } from 'react';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AppContext } from 'config';
import LinkFile from 'atomic/link-file';

import styles from 'styles/modules/desktop.module.scss';

const Desktop = () => {
  const appContext = useContext(AppContext);
  const { settings } = appContext;

  return (
    <div className={styles.container} style={{
      backgroundImage: `url("${settings.bgImage}")`
    }}>
      <div className={styles.flexbox}>
        <LinkFile href="/readme" label="README" src={settings.gravatar} alt="A cartoon of myself" />
        <LinkFile
          href="/settings"
          label="Settings"
          icon={faCogs} />
        <LinkFile
          href="https://www.linkedin.com/in/ikertxu/"
          label="LinkedIn"
          icon={faLinkedin} />
        <LinkFile
          href="https://github.com/orloxx"
          label="Github"
          icon={faGithub} />
      </div>
    </div>
  );
};

export default Desktop;
