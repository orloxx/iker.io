import * as THREE from 'three'

export function addParticles(scene) {
  const MAX_PARTICLES = 50000
  const DIMENSIONS = 3
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(MAX_PARTICLES * DIMENSIONS)
  const buffer = new THREE.BufferAttribute(positions, DIMENSIONS)
  const material = new THREE.PointsMaterial({
    size: 0.03,
  })
  const mesh = new THREE.Points(geometry, material)

  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 30
  }

  geometry.setAttribute('position', buffer)

  scene.add(mesh)

  mesh.destroy = () => {
    geometry.dispose()
    material.dispose()
    mesh.geometry.dispose()
    mesh.material.dispose()
    scene.remove(mesh)
  }

  return mesh
}
