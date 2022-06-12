import { useEffect } from 'react'
import { addMultiTouchKeyboardControl } from 'utils'
import { loadApp, startAnimation } from 'utils/three-js-loader'
import { addXRControllers } from 'utils/xr-controllers'
import { addBallShooter, handleController, updateBallAmmunitionGravity } from 'utils/ball-shooter'
import { addParticles } from 'utils/particles'
import { EMPTY_3D_ROOM } from 'utils/constants'

function useBallShooterBox($canvas) {
  useEffect(() => {
    const app = loadApp({
      $canvas: $canvas.current,
      config: EMPTY_3D_ROOM,
    })
    const { renderer, camera, scene } = app
    const { controllers } = addXRControllers({ renderer, scene })
    const [leftControl, rightControl] = controllers
    const room = addBallShooter(scene)
    const controls = addMultiTouchKeyboardControl()
    const particles = addParticles(scene)

    startAnimation(app, () => {
      handleController({ room, controller: leftControl })
      handleController({ room, controller: rightControl })
      updateBallAmmunitionGravity({ room })
      controls.updateCameraPosition(camera)
    })

    return () => {
      controls.destroy()
      particles.destroy()
      room.destroy()
      renderer.destroy()
    }
  }, [])
}

export default useBallShooterBox
