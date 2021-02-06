import React, { useContext } from 'react';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AppContext } from 'config';
import LinkFile from 'atomic/link-file';

import styles from 'styles/modules/desktop.module.scss';

function Desktop() {
  const appContext = useContext(AppContext);
  const { settings } = appContext;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("${settings.background.src}")`,
      }}
    >
      <div className={styles.flexbox}>
        <LinkFile
          href="/readme"
          label="README"
          name="readme"
          src={settings.gravatar}
          alt="A cartoon of myself"
        />
        <LinkFile
          href="/settings"
          label="Settings"
          name="settings"
          icon={faCogs}
        />
        <LinkFile
          href="https://www.linkedin.com/in/ikertxu/"
          label="LinkedIn"
          name="linkedin"
          icon={faLinkedin}
        />
        <LinkFile
          href="https://github.com/orloxx"
          label="Github"
          name="github"
          icon={faGithub}
        />
      </div>
      <div className={styles.credits}>
        {settings.background.credits}
      </div>
    </div>
  );
}

export default Desktop;
