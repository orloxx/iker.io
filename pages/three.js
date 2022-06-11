import React from 'react'
// import PropTypes from 'prop-types';
import Desktop from 'shared/desktop'
import Window from 'shared/window'
import ThreeDee from 'shared/three-dee'

function Three() {
  return (
    <>
      <Desktop />
      <Window title="Three Dee">
        <ThreeDee />
      </Window>
    </>
  )
}

Three.defaultProps = {}

Three.propTypes = {}

export default Three
