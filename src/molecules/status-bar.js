"use client";

import Battery from "atoms/battery";
import SoundCloudPlayer from "atoms/soundcloud-player";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import styles from "styles/modules/status-bar.module.scss";

function StatusBar({ title = "" }) {
  const [time, setTime] = useState("");

  const updateTime = useCallback(() => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    setTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTime, 2000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [updateTime]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <SoundCloudPlayer />
      <time className={styles.time}>{time}</time>
      <Battery />
    </div>
  );
}

StatusBar.propTypes = {
  title: PropTypes.string,
};

export default StatusBar;
