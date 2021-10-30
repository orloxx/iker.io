import * as THREE from 'three';
import { customFetch } from 'atomic/utils';

function getRenderer({ $canvas, project }) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: $canvas,
  });

  if (project.vr) {
    renderer.xr.enabled = project.vr;
  }
  if (project.shadows) {
    renderer.shadowMap.enabled = project.shadows;
  }
  if (project.shadowType) {
    renderer.shadowMap.type = project.shadowType;
  }
  if (project.toneMapping) {
    renderer.toneMapping = project.toneMapping;
  }
  if (project.toneMappingExposure) {
    renderer.toneMappingExposure = project.toneMappingExposure;
  }
  if (project.physicallyCorrectLights) {
    renderer.physicallyCorrectLights = project.physicallyCorrectLights;
  }

  return renderer;
}

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

function animate({ renderer, camera, scene }) {
  if (resizeRenderer(renderer)) {
    const { clientWidth, clientHeight } = renderer.domElement;
    // eslint-disable-next-line no-param-reassign
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}

async function getConfiguration(jsonSetup) {
  try {
    return JSON.parse(jsonSetup);
  } catch (error) {
    return customFetch('/js/3d-scene.json');
  }
}

export async function loadApp({ $canvas, jsonSetup }, callback = () => {}) {
  const config = await getConfiguration(jsonSetup);
  const loader = new THREE.ObjectLoader();
  const renderer = getRenderer({ $canvas, project: config.project });
  const camera = loader.parse(config.camera);
  const scene = loader.parse(config.scene);

  renderer.setAnimationLoop(() => {
    animate({ renderer, camera, scene });
    callback({ renderer, camera, scene });
  });
}
