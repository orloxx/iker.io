import React from 'react'
// import PropTypes from 'prop-types';
import Desktop from 'shared/desktop'
import Window from 'shared/window'
import QRGenerator from 'shared/qr-generator'

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
