import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import styles from 'styles/modules/link-file.module.scss';

const LinkFile = (props) => {
  const { href, label, icon } = props;
  const router = useRouter();
  const $button = useRef();

  function routeHref() {
    router.push(href);
  }

  return (
    <button
      className={styles.container}
      type="button"
      ref={$button}
      onClick={() => $button.current.focus()}
      onTouchEnd={routeHref}
      onDoubleClick={routeHref}>
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
};

LinkFile.defaultProps = {
  icon: faFile,
};

LinkFile.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.shape(),
};

export default LinkFile;
