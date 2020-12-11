import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import styles from 'styles/modules/link-file.module.scss';

const LinkFile = (props) => {
  const { href, label, icon, src, alt } = props;
  const [dragging, isDragging] = useState(false);
  const router = useRouter();
  const $button = useRef();

  function routeHref() {
    router.push(href);
  }

  function handleDrag() {
    isDragging(true);
  }

  function stopDragging() {
    setTimeout(() => isDragging(false), 150);
  }

  function handleTouch() {
    if (!dragging) routeHref();
  }

  return (
    <Draggable onDrag={handleDrag} onStop={stopDragging}>
      <button
        className={styles.container}
        type="button"
        ref={$button}
        onClick={() => $button.current.focus()}
        onTouchEndCapture={handleTouch}
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
