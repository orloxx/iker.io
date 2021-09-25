import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

function SoundCloudPlayer({ visual }) {
  const playerUrl = 'https://w.soundcloud.com/player/';
  const options = {
    url: 'https://api.soundcloud.com/playlists/1177045477',
    color: '#ff5500',
    auto_play: false,
    show_comments: false,
    show_user: true,
    show_reposts: false,
    show_teaser: true,
    visual,
  };
  const src = `${playerUrl}?${qs.stringify(options)}`;
  return (
    <iframe
      width="100%"
      height={visual ? 300 : 450}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      title="Night.fm"
      src={src}
    />
  );
}

SoundCloudPlayer.defaultProps = {
  visual: false,
};

SoundCloudPlayer.propTypes = {
  visual: PropTypes.bool,
};

export default SoundCloudPlayer;
