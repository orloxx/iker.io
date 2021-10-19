import * as THREE from 'three';

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

export function initCanvas({
  $canvas,
  scene,
  cameraOptions = {
    fov: 72,
    aspect: 2,
    near: 0.1,
    far: 20,
    z: 4,
  },
}, callback = () => {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas: $canvas.current,
  });

  // Camera
  const {
    fov, aspect, near, far,
  } = cameraOptions;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = cameraOptions.x || 0;
  camera.position.y = cameraOptions.y || 0;
  camera.position.z = cameraOptions.z || 0;

  function onFrame() {
    if (!$canvas.current) return;

    if (resizeRenderer(renderer)) {
      const { clientWidth, clientHeight } = renderer.domElement;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    callback();

    requestAnimationFrame(onFrame);
  }
  requestAnimationFrame(onFrame);

  return { renderer, camera };
}
