import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory';

function addControllers({ renderer, scene }) {
  const controllers = [
    renderer.xr.getController(0),
    renderer.xr.getController(1),
  ];
  controllers.forEach((controller) => {
    controller.addEventListener('selectstart', () => {
      controller.userData.isSelecting = true;
    });
    controller.addEventListener('selectend', () => {
      controller.userData.isSelecting = false;
    });
    scene.add(controller);
  });
  return controllers;
}

function addGrips({ renderer, scene }) {
  const controllerFactory = new XRControllerModelFactory();
  const grips = [
    renderer.xr.getControllerGrip(0),
    renderer.xr.getControllerGrip(1),
  ];
  grips.forEach((grip) => {
    grip.add(controllerFactory.createControllerModel(grip));
    scene.add(grip);
  });
  return grips;
}

function addHands({ renderer, scene }) {
  const handFactory = new XRHandModelFactory();
  const hands = [
    renderer.xr.getHand(0),
    renderer.xr.getHand(1),
  ];
  hands.forEach((hand) => {
    hand.add(handFactory.createHandModel(hand, 'mesh'));
    scene.add(hand);
  });
  return hands;
}

export function addXRControllers({ renderer, scene }) {
  return {
    controllers: addControllers({ renderer, scene }),
    grips: addGrips({ renderer, scene }),
    hands: addHands({ renderer, scene }),
  };
}
