import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { addMultiTouchKeyboardControl } from 'atomic/utils';
import { loadApp } from 'shared/three-dee/loader';

import styles from 'styles/modules/canvas.module.scss';

function ThreeDee() {
  const $canvas = useRef();

  function updateCameraPosition({ camera, controlMapping }) {
    const velocity = controlMapping.shift ? 0.1 : 0.03;
    const vertical = (dir = 1) => camera.translateZ(dir * velocity);
    const horizontal = (dir = 1) => camera.translateX(dir * velocity);
    const mapping = {
      arrowup: () => vertical(-1),
      w: () => vertical(-1),
      arrowdown: () => vertical(1),
      s: () => vertical(1),
      arrowleft: () => horizontal(-1),
      a: () => horizontal(-1),
      arrowright: () => horizontal(1),
      d: () => horizontal(1),
    };

    Object.keys(controlMapping)
      .filter((key) => controlMapping[key])
      .forEach((key) => {
        if (mapping[key]) {
          mapping[key]();
        }
      });
  }

  useEffect(() => {
    const { controlMapping, destroy } = addMultiTouchKeyboardControl();
    const canvasOptions = {
      $canvas: $canvas.current,
    };

    loadApp(canvasOptions, ({ camera }) => {
      updateCameraPosition({ camera, controlMapping });
    });

    return () => {
      destroy();
    };
  }, []);

  return (
    <canvas className={styles.container} ref={$canvas} />
  );
}

ThreeDee.defaultProps = {
};

ThreeDee.propTypes = {
};

export default ThreeDee;
