import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import styles from 'styles/modules/window.module.scss';

const Window = (props) => {
  const { children, title } = props;
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
        </div>
      </Draggable>
    </div>
  );
};

Window.defaultProps = {
  children: null,
  title: '',
};

Window.propTypes = {
  children: PropTypes.shape(),
  title: PropTypes.string,
};

export default Window;
