import * as THREE from 'three';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';

let NORMAL = new THREE.Vector3();
const NUM_BALLS = 200;
const RELATIVE_VELOCITY = new THREE.Vector3();
const BALL_RADIUS = 0.08;
const GRAVITY = 9.8;
const CLOCK = new THREE.Clock();
const ROOM_SIZE = 12;
const FLOOR_OFFSET = ROOM_SIZE / 2;

export function handleController({ controller, room }) {
  if (controller.userData.isSelecting) {
    const object = room.children[room.count++];

    object.position.copy(controller.position);
    object.userData.velocity.x = (Math.random() - 0.5) * 3;
    object.userData.velocity.y = (Math.random() - 0.5) * 3;
    object.userData.velocity.z = (Math.random() - 9);
    object.userData.velocity.applyQuaternion(controller.quaternion);

    if (room.count === room.children.length) {
      room.count = 0;
    }
  }
}

function getBallAmmunition() {
  const geometry = new THREE.IcosahedronGeometry(BALL_RADIUS, 3);

  return [...Array(NUM_BALLS).keys()].map((e, i) => {
    const ballMesh = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff
    });
    const ball = new THREE.Mesh(geometry, ballMesh);

    ball.position.x = Math.random() * 4 - 2;
    ball.position.y = Math.random() * 4;
    ball.position.z = Math.random() * 4 - 2;

    ball.userData.velocity = new THREE.Vector3();
    ball.userData.velocity.x = Math.random() * 0.01 - 0.005;
    ball.userData.velocity.y = Math.random() * 0.01 - 0.005;
    ball.userData.velocity.z = Math.random() * 0.01 - 0.005;

    return ball;
  });
}

export function addBallShooter({ scene }) {
  const roomSize = [ROOM_SIZE, ROOM_SIZE, ROOM_SIZE];
  const boxRoomSize = roomSize.map((e) => e * 2);
  const boxGeometry = new BoxLineGeometry(...roomSize, ...boxRoomSize);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
  const room = new THREE.LineSegments(boxGeometry, lineMaterial);
  room.count = 0;
  room.geometry.translate(0, FLOOR_OFFSET, 0);
  room.add(...getBallAmmunition());
  scene.add(room);

  return {
    room
  };
}

export function updateBallAmmunitionGravity({ room }) {
  const delta = CLOCK.getDelta() * 0.5; // slow down simulation
  const range = (ROOM_SIZE / 2) - BALL_RADIUS;

  for (let i = 0; i < room.children.length; i++) {
    const ball = room.children[i];

    ball.position.x += ball.userData.velocity.x * delta;
    ball.position.y += ball.userData.velocity.y * delta;
    ball.position.z += ball.userData.velocity.z * delta;

    // keep objects inside room
    if (ball.position.x < - range || ball.position.x > range) {
      ball.position.x = THREE.MathUtils.clamp(ball.position.x, - range, range);
      ball.userData.velocity.x = - ball.userData.velocity.x;
    }

    if (ball.position.y < BALL_RADIUS || ball.position.y > range + FLOOR_OFFSET) {
      ball.position.y = Math.max(ball.position.y, BALL_RADIUS);
      ball.userData.velocity.x *= 0.98;
      ball.userData.velocity.y = - ball.userData.velocity.y * 0.8;
      ball.userData.velocity.z *= 0.98;
    }

    if (ball.position.z < - range || ball.position.z > range) {
      ball.position.z = THREE.MathUtils.clamp( ball.position.z, - range, range );
      ball.userData.velocity.z = - ball.userData.velocity.z;
    }

    for (let j = i + 1; j < room.children.length; j ++) {
      const ball2 = room.children[j];

      NORMAL.copy(ball.position).sub(ball2.position);

      const distance = NORMAL.length();

      if (distance < 2 * BALL_RADIUS) {
        NORMAL.multiplyScalar(0.5 * distance - BALL_RADIUS);
        ball.position.sub(NORMAL);
        ball2.position.add(NORMAL);
        NORMAL.normalize();
        RELATIVE_VELOCITY.copy(ball.userData.velocity).sub(ball2.userData.velocity);

        NORMAL = NORMAL.multiplyScalar(RELATIVE_VELOCITY.dot(NORMAL));

        ball.userData.velocity.sub(NORMAL);
        ball2.userData.velocity.add(NORMAL);
      }
    }

    ball.userData.velocity.y -= GRAVITY * delta;
  }
}
