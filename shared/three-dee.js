import React, { useEffect, useRef } from 'react';
import { addMultiTouchKeyboardControl } from 'atomic/utils';
import { loadApp, startAnimation } from 'atomic/three-js-loader';
import { getParticles } from 'atomic/particles';
import { addXRControllers } from 'atomic/xr-controllers';
import { addBallShooter, handleController, updateBallAmmunitionGravity } from 'atomic/ball-shooter';

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
      file: '/js/3d-empty.json',
    };

    const app = await loadApp(canvasOptions);
    const { renderer, camera, scene } = app;
    const { controllers } = addXRControllers({ renderer, scene });
    const [leftControl, rightControl] = controllers;
    const { room } = addBallShooter({ scene });

    scene.add(getParticles());

    startAnimation(app, () => {
      handleController({ room, controller: leftControl });
      handleController({ room, controller: rightControl });
      updateCameraPosition({ camera, controlMapping });
      updateBallAmmunitionGravity({ room });
    });
  }

  useEffect(() => {
    const inputControl = addMultiTouchKeyboardControl();

    initialize(inputControl.controlMapping);

    return () => {
      inputControl.destroy();
    };
  });

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={$canvas} />
    </div>
  );
}

export default ThreeDee;
