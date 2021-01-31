import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import styles from 'styles/modules/window.module.scss';

export const WINDOW_STYLES = {
  normal: { maxWidth: 800, maxHeight: 800 },
  system: { maxWidth: 500, maxHeight: 200 },
};

const Window = (props) => {
  const {
    children, title, slug, containerStyle,
  } = props;
  const [html, setHtml] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const $window = useRef();

  function getDefaultPosition() {
    const halfX = window.innerWidth / 2 - $window.current.clientWidth / 2;
    const halfY = window.innerHeight / 2 - $window.current.clientHeight / 2;
    return { x: halfX, y: halfY };
  }

  async function getPost() {
    const data = await fetch(`/api/posts?slug=${slug}`);
    const json = await data.json();
    if (json.html) setHtml(json.html);
  }

  useEffect(() => {
    setPosition(getDefaultPosition());
  }, []);

  useEffect(() => {
    if (slug) getPost();
  }, [slug]);

  return (
    <Draggable
      handle={`.${styles.title}`}
      bounds={{ left: 0, top: 0 }}
      position={position}
      onStop={(e, { x, y }) => setPosition({ x, y })}
    >
      <div className={styles.container} ref={$window} style={containerStyle}>
        <div className={styles.titleBar}>
          <Link href="/">
            <button type="button" className={styles.close}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </Link>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.children}>
          {children}
          {!!html && (
            // eslint-disable-next-line react/no-danger
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </div>
      </div>
    </Draggable>
  );
};

Window.defaultProps = {
  children: null,
  title: '',
  slug: '',
  containerStyle: WINDOW_STYLES.normal,
};

Window.propTypes = {
  children: PropTypes.shape(),
  title: PropTypes.string,
  slug: PropTypes.string,
  containerStyle: PropTypes.shape(),
};

export default Window;
