import React, { useRef } from 'react'
import usePlainRender from 'atomic/hooks/use-plain-render'

import styles from 'styles/modules/canvas.module.scss'

function ThreeDee() {
  const $canvas = useRef()

  usePlainRender($canvas)

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={$canvas} />
    </div>
  )
}

export default ThreeDee
