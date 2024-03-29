export const GRAVATAR = 'https://gravatar.com/avatar/0d6431f3ce241c8c688dfd7831b511c8?s=250'

export const EMPTY_3D_ROOM = {
  metadata: {
    type: 'App',
  },
  project: {
    shadows: true,
    shadowType: 1,
    vr: true,
    physicallyCorrectLights: false,
    toneMapping: 0,
    toneMappingExposure: 1,
  },
  camera: {
    metadata: {
      version: 4.5,
      type: 'Object',
      generator: 'Object3D.toJSON',
    },
    object: {
      uuid: 'D8F6E197-846B-4723-B214-AD57507009F4',
      type: 'PerspectiveCamera',
      name: 'Camera',
      layers: 1,
      matrix: [
        1, 0, 0, 0, 0, 0.8944271909999159, -0.4472135954999579, 0, 0, 0.4472135954999579,
        0.8944271909999159, 0, 0, 5, 10, 1,
      ],
      fov: 50,
      zoom: 1,
      near: 0.01,
      far: 1000,
      focus: 10,
      aspect: 1.7802197802197801,
      filmGauge: 35,
      filmOffset: 0,
    },
  },
  scene: {
    metadata: {
      version: 4.5,
      type: 'Object',
      generator: 'Object3D.toJSON',
    },
    object: {
      uuid: '31517222-A9A7-4EAF-B5F6-60751C0BABA3',
      type: 'Scene',
      name: 'Scene',
      layers: 1,
      matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      children: [
        {
          uuid: '2A7E77D9-3416-441B-8551-475A082EEBDB',
          type: 'AmbientLight',
          name: 'AmbientLight',
          layers: 1,
          matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          color: 2236962,
          intensity: 1,
        },
        {
          uuid: 'B1095403-FD44-4029-9278-D6FD0C0D2854',
          type: 'DirectionalLight',
          name: 'DirectionalLight',
          layers: 1,
          matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 7.5, 1],
          color: 16777215,
          intensity: 1,
          shadow: {
            camera: {
              uuid: '3FB9A5B6-A77C-4F34-801F-8FDC9747045D',
              type: 'OrthographicCamera',
              layers: 1,
              zoom: 1,
              left: -5,
              right: 5,
              top: 5,
              bottom: -5,
              near: 0.5,
              far: 500,
            },
          },
        },
      ],
    },
  },
  scripts: {},
}
