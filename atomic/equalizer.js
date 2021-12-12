import * as THREE from 'three';

const matrix = [
  '5651341452',
  '1381541252',
  '1878435224',
  '6814831535',
  '3883547383',
  '6473548464',
  '1885833658',
  '3732584752',
  '1881546128',
  '5121717776',
].map((line) => [...line].map((n) => parseInt(n, 10)));

const colors = [
  '#e3f2fd',
  '#073275',
  '#0d47a1',
  '#1565c0',
  '#1976d2',
  '#1e88e5',
  '#2196f3',
  '#42a5f5',
  '#64b5f6',
  '#90caf9',
  '#bbdefb',
];

export function flat2DMatrix (matrix) {
  return [].concat.apply([], matrix);
}

function flashAdjacent(list, start) {
  const [i, j] = start;

  if (typeof list[i] === 'undefined' || typeof list[i][j] === 'undefined'
    || typeof list[i][j].customLumen === 'undefined') {
    return;
  }

  list[i][j].customLumen += 1;

  if (list[i][j].customLumen === 10) {
    const DIRECTION = [
      [-1, 0], [-1, 1], [0, 1], [1, 1],
      [1, 0], [1, -1], [0, -1], [-1, -1]
    ];

    DIRECTION.forEach(([k, l]) => {
      flashAdjacent(list, [i + k, j + l]);
    });
  }
}

function flashAll(list, stop) {
  let cubes = list;
  let flashing = -1;
  let t = 0;

  const interval = setInterval(() => {
    cubes.forEach((row, i) => {
      row.forEach((cube, j) => {
        flashAdjacent(cubes, [i, j]);
      });
    });

    cubes.forEach((row) => {
      row.forEach((cube) => {
        if (cube.customLumen > 9) {
          cube.customLumen = 0;
        }
      });
    });

    if (flashing === -1 && cubes.every((row) => row.every((cube) => cube.customLumen === 0))) {
      flashing = t + 1;
    }
    t++;

    if (stop ? t >= stop : flashing >= 0) {
      clearInterval(interval);
    }
  }, 50);
}

export function updateEqualizer(matrix) {
  matrix.forEach((line) => {
    line.forEach((cube) => {
      cube.material.color.set(colors[cube.customLumen]);
      cube.position.y = cube.customLumen * 0.01;
    });
  });
}

export function getEqualizer() {
  const size = 0.8;
  const geometry = new THREE.BoxGeometry(size, size, size);

  const cubes = matrix.map((line, i) => {
    return line.map((item, j) => {
      const material = new THREE.MeshStandardMaterial({
        color: colors[item],
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i - 4.5;
      cube.position.z = j - 6;
      cube.customLumen = item;
      return cube;
    });
  });

  flashAll(cubes);

  return cubes;
}
