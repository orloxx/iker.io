import React from 'react'
import { useSelector } from 'react-redux'

import styles from 'styles/modules/logger.module.scss'

const getContainerClasses = (type) => {
  return [
    styles.container,
    ...(type === 'success' ? [styles.success] : []),
    ...(type === 'warning' ? [styles.warning] : []),
    ...(type === 'error' ? [styles.error] : []),
  ].join(' ')
}

function Logger() {
  const { type, message } = useSelector(({ logger }) => logger.current)
  if (!type || !message) return null

  return <div className={getContainerClasses(type)}>{message}</div>
}

export default Logger
