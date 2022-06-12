import React from 'react'
// import PropTypes from 'prop-types';
import Desktop from 'molecules/desktop'
import Window from 'molecules/window'
import QRGenerator from 'molecules/qr-generator'

function QR() {
  return (
    <>
      <Desktop />
      <Window title="QR Create">
        <QRGenerator />
      </Window>
    </>
  )
}

QR.defaultProps = {}

QR.propTypes = {}

export default QR
