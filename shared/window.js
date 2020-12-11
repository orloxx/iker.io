import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import styles from 'styles/modules/window.module.scss';

const Window = (props) => {
  const { children, title, slug } = props;
  const [html, setHtml] = useState('');

  async function getPost() {
    const data = await fetch(`/api/posts?slug=${slug}`);
    const json = await data.json();
    if (json.html) setHtml(json.html);
  }

  useEffect(() => {
    if (slug) getPost();
  }, [slug]);

  return (
    <div className={styles.wrapper}>
      <Draggable handle={`.${styles.title}`}>
        <div className={styles.container}>
          <div className={styles.titleBar}>
            <Link href="/">
              <button className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </Link>
            <div className={styles.title}>{title}</div>
          </div>
          {children}
          <div className={styles.children} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Draggable>
    </div>
  );
};

Window.defaultProps = {
  children: null,
  title: '',
  slug: ''
};

Window.propTypes = {
  children: PropTypes.shape(),
  title: PropTypes.string,
  slug: PropTypes.string,
};

export default Window;
