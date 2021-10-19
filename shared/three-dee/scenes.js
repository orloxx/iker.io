import * as THREE from 'three';
import { makeCube } from './materials';

export function getMainScene() {
  // Scene
  const scene = new THREE.Scene();

  // Light
  const intensity = 1;
  const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
  light.position.set(-1, 2, 4);

  const cubes = [
    makeCube({}),
    makeCube({ color: 0x8844aa, position: { x: -2 } }),
    makeCube({ color: 0xaa8844, position: { x: 2 } }),
  ];

  cubes.forEach((cube) => {
    scene.add(cube);
  });

  scene.add(light);

  return scene;
}
