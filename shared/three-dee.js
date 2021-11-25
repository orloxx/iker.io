import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { addMultiTouchKeyboardControl } from 'atomic/utils';
import { loadApp } from 'atomic/three-js-loader';
import { getParticles } from 'atomic/particles';

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

  async function initialize(controlMapping) {
    const canvasOptions = {
      $canvas: $canvas.current,
      file: '/js/3d-scene.json',
    };

    const particles = getParticles();

    const { camera, scene } = await loadApp(canvasOptions, () => {
      updateCameraPosition({ camera, controlMapping });
    });

    scene.add(particles);
  }

  useEffect(() => {
    const { controlMapping, destroy } = addMultiTouchKeyboardControl();

    initialize(controlMapping);

    return () => {
      destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={$canvas} />
    </div>
  );
}

ThreeDee.defaultProps = {
};

ThreeDee.propTypes = {
};

export default ThreeDee;
