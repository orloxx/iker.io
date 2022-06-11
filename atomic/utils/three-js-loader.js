import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'

function getRenderer({ $canvas, project }) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: $canvas,
  })
  const vrButton = VRButton.createButton(renderer)

  if (project.vr && window.navigator.xr) {
    document.body.appendChild(vrButton)
    renderer.xr.enabled = true
  }
  if (project.shadows) {
    renderer.shadowMap.enabled = project.shadows
  }
  if (project.shadowType) {
    renderer.shadowMap.type = project.shadowType
  }
  if (project.toneMapping) {
    renderer.toneMapping = project.toneMapping
  }
  if (project.toneMappingExposure) {
    renderer.toneMappingExposure = project.toneMappingExposure
  }
  if (project.physicallyCorrectLights) {
    renderer.physicallyCorrectLights = project.physicallyCorrectLights
  }

  renderer.destroy = () => {
    renderer.dispose()
    document.body.removeChild(vrButton)
  }

  return renderer
}

function resizeRenderer(renderer) {
  const { width, clientWidth, height, clientHeight } = renderer.domElement
  const rWidth = Math.floor(clientWidth * window.devicePixelRatio)
  const rHeight = Math.floor(clientHeight * window.devicePixelRatio)

  if (width !== rWidth || height !== rHeight) {
    renderer.setSize(rWidth, rHeight, false)

    return true
  }
  return false
}

function animate({ renderer, camera, scene }) {
  if (resizeRenderer(renderer)) {
    const { clientWidth, clientHeight } = renderer.domElement
    // eslint-disable-next-line no-param-reassign
    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
  }

  renderer.render(scene, camera)
}

export function startAnimation(app, callback = () => {}) {
  app.renderer.setAnimationLoop(() => {
    animate(app)
    callback()
  })
}

export function loadApp({ $canvas, config }) {
  const loader = new THREE.ObjectLoader()
  const renderer = getRenderer({ $canvas, project: config.project })
  const camera = loader.parse(config.camera)
  const scene = loader.parse(config.scene)

  return { loader, renderer, camera, scene }
}
