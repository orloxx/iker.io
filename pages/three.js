import React from 'react';
// import PropTypes from 'prop-types';
import Desktop from 'shared/desktop';
import Window from 'shared/window';
import ThreeDee from 'shared/three-dee';

function Three() {
  return (
    <React.Fragment>
      <Desktop />
      <Window title="Three Dee">
        <ThreeDee />
      </Window>
    </React.Fragment>
  );
}

Three.defaultProps = {
};

Three.propTypes = {
};

export default Three;
