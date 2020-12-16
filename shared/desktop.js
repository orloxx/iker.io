import React, { useContext } from 'react';
import { faCogs, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AppContext } from 'config';
import LinkFile from 'atomic/link-file';

import styles from 'styles/modules/desktop.module.scss';

const Desktop = () => {
  const appContext = useContext(AppContext);
  const { settings } = appContext;

  return (
    <div className={styles.container} style={{
      backgroundImage: `url("${settings.background.src}")`
    }}>
      <div className={styles.flexbox}>
        <LinkFile href="/readme" label="README" src={settings.gravatar} alt="A cartoon of myself" />
        <LinkFile
          href="/settings"
          label="Settings"
          icon={faCogs} />
        <LinkFile
          href="https://play.wa-test.rc3.cccv.de/_/awq-fng-qbt/orloxx.github.io/remote-chaos-map/map.json"
          label="Virtual Office"
          icon={faBuilding} />
        <LinkFile
          href="https://www.linkedin.com/in/ikertxu/"
          label="LinkedIn"
          icon={faLinkedin} />
        <LinkFile
          href="https://github.com/orloxx"
          label="Github"
          icon={faGithub} />
      </div>
      <div className={styles.credits}>
        {settings.background.credits}
      </div>
    </div>
  );
};

export default Desktop;
