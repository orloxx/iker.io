import React, { useRef } from 'react'
import useBallShooterBox from 'atomic/hooks/use-ball-shooter-box'

import styles from 'styles/modules/canvas.module.scss'

function ThreeDee() {
  const $canvas = useRef()

  useBallShooterBox($canvas)

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={$canvas} />
    </div>
  )
}

export default ThreeDee
