import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { logError } from 'store/logger/actions'
import Loading from 'atomic/loading'
import { customFetch } from 'atomic/utils'

import styles from 'styles/modules/window.module.scss'

function Window({ children, title, slug, type }) {
  const WINDOW_STYLES = {
    normal: { maxWidth: 800, maxHeight: 800 },
    system: { maxWidth: 500, maxHeight: 200 },
  }
  const containerStyle = WINDOW_STYLES[type] || WINDOW_STYLES.normal
  const [html, setHtml] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const $window = useRef()
  const dispatch = useDispatch()

  function getDefaultPosition() {
    const halfX = window.innerWidth / 2 - $window.current.clientWidth / 2
    const halfY = window.innerHeight / 2 - $window.current.clientHeight / 2
    return { x: halfX, y: halfY }
  }

  async function getPost() {
    try {
      const response = await customFetch(`/api/posts?slug=${slug}`)
      setHtml(response.html)
    } catch (error) {
      dispatch(logError(`${error.status} ${error.statusText}`))
    }
  }

  useEffect(() => {
    setPosition(getDefaultPosition())
  }, [])

  useEffect(() => {
    if (slug) getPost()
  }, [slug])

  return (
    <Draggable
      handle={`.${styles.title}`}
      bounds={{ left: 0, top: 0 }}
      position={position}
      onStop={(e, { x, y }) => setPosition({ x, y })}
    >
      <div className={styles.container} ref={$window} style={containerStyle}>
        <div className={styles.titleBar}>
          <Link href="/">
            <button type="button" className={styles.close}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </Link>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.children}>
          {children}
          {!!html && (
            // eslint-disable-next-line react/no-danger
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
          )}
          {slug && !html && <Loading />}
        </div>
      </div>
    </Draggable>
  )
}

Window.defaultProps = {
  children: null,
  title: '',
  slug: '',
  type: 'normal',
}

Window.propTypes = {
  children: PropTypes.shape(),
  title: PropTypes.string,
  slug: PropTypes.string,
  type: PropTypes.string,
}

export default Window
