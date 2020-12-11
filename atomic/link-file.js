import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import styles from 'styles/modules/link-file.module.scss';

const LinkFile = (props) => {
  const { href, label, icon, src, alt } = props;
  const router = useRouter();
  const $button = useRef();

  function routeHref() {
    router.push(href);
  }

  return (
    <Draggable>
      <button
        className={styles.container}
        type="button"
        ref={$button}
        onClick={() => $button.current.focus()}
        onTouchEnd={routeHref}
        onDoubleClick={routeHref}>
        {icon && !src && (
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        )}
        {src && (
          <img className={styles.image} src={src} alt={alt} />
        )}
        <span className={styles.label}>{label}</span>
      </button>
    </Draggable>
  );
};

LinkFile.defaultProps = {
  icon: faFile,
};

LinkFile.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.shape(),
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default LinkFile;
