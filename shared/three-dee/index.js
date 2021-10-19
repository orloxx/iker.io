import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { initCanvas } from 'shared/three-dee/renderer';
import { getMainScene } from 'shared/three-dee/scenes';
import { addMultiTouchKeyboardControl } from 'atomic/utils';

import styles from 'styles/modules/canvas.module.scss';

function ThreeDee() {
  const $canvas = useRef();

  useEffect(() => {
    const { controlMapping, destroy } = addMultiTouchKeyboardControl();
    const { camera } = initCanvas({
      $canvas,
      scene: getMainScene(),
    }, () => {
      const velocity = controlMapping.shift ? 0.1 : 0.01;
      const mapping = {
        arrowup: () => camera.translateZ(-velocity),
        w: () => camera.translateZ(-velocity),
        arrowdown: () => camera.translateZ(velocity),
        s: () => camera.translateZ(velocity),
        arrowleft: () => camera.translateX(-velocity),
        a: () => camera.translateX(-velocity),
        arrowright: () => camera.translateX(velocity),
        d: () => camera.translateX(velocity),
      };

      Object.keys(controlMapping)
        .filter((key) => controlMapping[key])
        .forEach((key) => {
          if (mapping[key]) {
            mapping[key]();
          }
        });
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
