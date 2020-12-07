import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import styles from 'styles/modules/window.module.scss';

const Window = (props) => {
  const { children, title } = props;
  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <Link href="/">
          <button className={styles.close}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Link>
        <title>{title}</title>
      </div>
      {children}
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
