import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadApp, startAnimation } from 'atomic/utils/three-js-loader'
import { addXRControllers } from 'atomic/utils/xr-controllers'
import {
  addBallShooter,
  handleController,
  updateBallAmmunitionGravity,
} from 'atomic/utils/ball-shooter'
import { addMultiTouchKeyboardControl } from 'atomic/utils'
import { addParticles } from 'atomic/utils/particles'
import { fetchPlainConfig } from 'store/threejs/actions'

function usePlainRender($canvas) {
  const threeJSConfig = useSelector(({ threeJS }) => threeJS)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPlainConfig())
  }, [dispatch])

  useEffect(() => {
    if (threeJSConfig.project) {
      const app = loadApp({
        $canvas: $canvas.current,
        config: threeJSConfig,
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
    }

    return () => {}
  }, [threeJSConfig])
}

export default usePlainRender
