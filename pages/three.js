import React, { useRef } from 'react'
import Desktop from 'shared/desktop'
import Window from 'shared/window'
import useBallShooterBox from 'shared/hooks/use-ball-shooter-box'

import styles from 'styles/modules/canvas.module.scss'

function Three() {
  const $canvas = useRef()

  useBallShooterBox($canvas)

  return (
    <>
      <Desktop />
      <Window title="Three Dee">
        <div className={styles.container}>
          <canvas className={styles.canvas} ref={$canvas} />
        </div>
      </Window>
    </>
  )
}

export default Three
