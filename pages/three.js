import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import * as THREE from 'three';

import styles from 'styles/modules/canvas.module.scss';

function resizeRenderer(renderer) {
  const {
    width, clientWidth, height, clientHeight,
  } = renderer.domElement;
  const rWidth = Math.floor(clientWidth * window.devicePixelRatio);
  const rHeight = Math.floor(clientHeight * window.devicePixelRatio);

  if (width !== rWidth || height !== rHeight) {
    renderer.setSize(rWidth, rHeight, false);

    return true;
  }
  return false;
}

function Three() {
  const $canvas = useRef();

  function makeCube({ color, x }) {
    // Geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Material
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;

    return cube;
  }

  useEffect(() => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: $canvas.current,
    });

    // Scene
    const scene = new THREE.Scene();

    // Light
    const intensity = 1;
    const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
    light.position.set(-1, 2, 4);

    const cubes = [
      makeCube({ color: 0x8844aa, x: -2 }),
      makeCube({ color: 0x44aa88, x: 0 }),
      makeCube({ color: 0xaa8844, x: 2 }),
    ];

    cubes.forEach((cube) => {
      scene.add(cube);
    });

    scene.add(light);

    // Camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    function render(time) {
      const SECONDS_MODIFIER = 0.001;

      if (resizeRenderer(renderer)) {
        const { clientWidth, clientHeight } = renderer.domElement;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube, i) => {
        const speed = 1 + i * 0.1;
        const rot = time * speed * SECONDS_MODIFIER;
        cubes[i].rotation.x = rot;
        cubes[i].rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);

  return (
    <canvas className={styles.container} ref={$canvas} />
  );
}

Three.defaultProps = {
};

Three.propTypes = {
};

export default Three;
