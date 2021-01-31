import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBatteryFull, faBatteryThreeQuarters, faBatteryHalf,
  faBatteryQuarter, faBatteryEmpty,
} from '@fortawesome/free-solid-svg-icons';

const Battery = () => {
  const [icon, setIcon] = useState(null);

  function onLevelChange(battery) {
    const { level } = battery;
    if (level === 1) {
      setIcon(faBatteryFull);
    } else if (level >= 0.75) {
      setIcon(faBatteryThreeQuarters);
    } else if (level >= 0.5) {
      setIcon(faBatteryHalf);
    } else if (level >= 0.25) {
      setIcon(faBatteryQuarter);
    } else {
      setIcon(faBatteryEmpty);
    }
  }

  function levelChangeListener({ target: battery }) {
    onLevelChange(battery);
  }

  useEffect(() => {
    let thisBattery = null;
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        thisBattery = battery;
        onLevelChange(battery);
        battery.addEventListener('levelchange', levelChangeListener);
      });
    }

    return () => {
      if (thisBattery) {
        thisBattery.removeEventListener('levelchange', levelChangeListener);
      }
    };
  }, []);

  return icon && (
    <React.Fragment>
      <FontAwesomeIcon icon={icon} />
    </React.Fragment>
  );
};

export default Battery;
