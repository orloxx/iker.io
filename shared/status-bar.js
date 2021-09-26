import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Battery from 'atomic/battery';
import SoundCloudPlayer from 'atomic/soundcloud-player';

import styles from 'styles/modules/status-bar.module.scss';

function StatusBar({ title }) {
  const [time, setTime] = useState('');
  const [scOpen, setScOpen] = useState(false);

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    setTime(`${hours}:${minutes}`);
  }

  function getClasses(required, opened) {
    return [
      required,
      ...(scOpen ? [opened] : []),
    ].join(' ');
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 2000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <React.Fragment>
      <div className={getClasses(styles.container, styles.containerOpened)}>
        <p className={styles.title}>{title}</p>
        <SoundCloudPlayer onOpen={(isOpen) => setScOpen(isOpen)} />
        <time className={styles.time}>{time}</time>
        <Battery />
      </div>
    </React.Fragment>
  );
}

StatusBar.defaultProps = {
  title: '',
};

StatusBar.propTypes = {
  title: PropTypes.string,
};

export default StatusBar;
