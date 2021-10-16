import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { faCogs, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { getCurrentBg } from 'store/settings/selectors';
import LinkFile from 'atomic/link-file';
import { GRAVATAR } from 'atomic/constants';

import styles from 'styles/modules/desktop.module.scss';

function Desktop({ current }) {
  const currentBg = useSelector(getCurrentBg());

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("${currentBg.src}")`,
      }}
    >
      <div className={styles.flexbox}>
        <LinkFile
          href="/readme"
          label="README"
          name="readme"
          src={GRAVATAR}
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
        <LinkFile
          href="/qr"
          label="QR Create"
          name="qr-create"
          icon={faQrcode}
        />
      </div>
      <div className={styles.credits}>
        {currentBg.credits}
      </div>
    </div>
  );
}

Desktop.defaultProps = {
  current: '',
};

Desktop.propTypes = {
  current: PropTypes.string,
};

export default Desktop;
