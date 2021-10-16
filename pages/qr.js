import React from 'react';
// import PropTypes from 'prop-types';
import Desktop from 'shared/desktop';
import Window from 'shared/window';
import QRGenerator from 'shared/qr-generator';

function QR() {
  return (
    <React.Fragment>
      <Desktop />
      <Window title="QR Create">
        <QRGenerator />
      </Window>
    </React.Fragment>
  );
}

QR.defaultProps = {
};

QR.propTypes = {
};

export default QR;
