import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode'

import styles from 'styles/modules/qr-generator.module.scss'

const TYPES = {
  text: 'text',
}

function QRGenerator({ type }) {
  const PLACEHOLDER = 'https://example.com'
  const [inputText, setInputText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [encodedImage, setEncodedImage] = useState('')
  const $submit = useRef(null)

  function handleChange({ target }) {
    setInputText(target.value)
  }

  async function generateQR() {
    setSavedText(inputText || PLACEHOLDER)

    try {
      const imageData = await QRCode.toDataURL(inputText || PLACEHOLDER)
      setEncodedImage(imageData)
    } catch (error) {
      setEncodedImage('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    generateQR()
    $submit.current.focus()
  }

  function handleFocus({ target }) {
    target.select()
  }

  useEffect(() => {
    generateQR()
  }, [])

  return (
    <form className={styles.form} action="" onSubmit={handleSubmit}>
      {type === TYPES.text && (
        <label className={styles.label} htmlFor="text-to-encode">
          <p>Enter text to generate QR code</p>
          <input
            type="text"
            onChange={handleChange}
            value={inputText}
            placeholder={PLACEHOLDER}
            maxLength={1000}
            onFocus={handleFocus}
          />
        </label>
      )}
      <div className={styles.buttons}>
        <button ref={$submit} type="submit">
          Generate
        </button>
      </div>
      {!!encodedImage && (
        <>
          <img className={styles.image} src={encodedImage} alt="QR Code" />
          <p className={styles.caption}>{savedText}</p>
        </>
      )}
    </form>
  )
}

QRGenerator.defaultProps = {
  type: TYPES.text,
}

QRGenerator.propTypes = {
  type: PropTypes.string,
}

export default QRGenerator
