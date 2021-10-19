import * as THREE from 'three';
import { makeCube } from './materials';

export function getMainScene() {
  // Scene
  const scene = new THREE.Scene();

  // Light
  const intensity = 1;
  const lightPosition = [-1, 2, 4];
  const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, intensity);
  const light = new THREE.PointLight(0xFFFFFF, intensity, 50);
  light.position.set(...lightPosition);
  hemiLight.position.set(...lightPosition);

  const cubes = [
    makeCube({}),
    makeCube({ color: 0x8844aa, position: { x: -2 } }),
    makeCube({ color: 0xaa8844, position: { x: 2 } }),
  ];

  cubes.forEach((cube) => {
    scene.add(cube);
  });

  scene.add(hemiLight);
  scene.add(light);

  return scene;
}
