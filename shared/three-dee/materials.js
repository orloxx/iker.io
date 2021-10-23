import * as THREE from 'three';

export function makeBrick({
  color = 0x44aa88,
  width = 1,
  height = 1,
  depth = 1,
  position = new THREE.Vector3(0, 0, 0),
}) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshPhongMaterial({ color });
  const brick = new THREE.Mesh(geometry, material);
  brick.position.x = position.x;
  brick.position.y = position.y;
  brick.position.z = position.z;

  return brick;
}

export function makeCube({ color, size, position }) {
  return makeBrick({
    color,
    width: size,
    height: size,
    depth: size,
    position,
  });
}
