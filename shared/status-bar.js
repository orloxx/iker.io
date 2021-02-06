import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Battery from 'atomic/battery';

import styles from 'styles/modules/status-bar.module.scss';

function StatusBar({ title }) {
  const [time, setTime] = useState('');

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    setTime(`${hours}:${minutes}`);
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 2000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <time className={styles.time}>{time}</time>
      <Battery />
    </div>
  );
}

StatusBar.defaultProps = {
  title: '',
};

StatusBar.propTypes = {
  title: PropTypes.string,
};

export default StatusBar;
