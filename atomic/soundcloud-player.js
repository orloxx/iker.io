import React, {
  useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward, faForward, faPause, faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { injectScript } from 'atomic/utils';

import styles from 'styles/modules/soundcloud-player.module.scss';

function SoundCloudPlayer({ visual, onOpen }) {
  const soundCloudUrl = 'https://w.soundcloud.com/player/';
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
  const src = `${soundCloudUrl}?${qs.stringify(options)}`;
  const [isReady, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const $iframe = useRef(null);

  function toggleVisibility() {
    onOpen(!isOpen);
    setOpen(!isOpen);
  }

  function getClasses(required, opened, condition = isOpen) {
    return [
      required,
      ...(condition ? [opened] : []),
    ].join(' ');
  }

  function getWidget() {
    return window.SC.Widget($iframe.current);
  }

  function prev() {
    getWidget().prev();
  }

  function play() {
    getWidget().play();
  }

  function pause() {
    getWidget().pause();
  }

  function next() {
    getWidget().next();
  }

  useEffect(() => {
    if (isReady && $iframe?.current) {
      const widget = window.SC.Widget($iframe.current);
      widget.bind(window.SC.Widget.Events.PLAY, () => setPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
    }
  }, [isReady]);

  useEffect(() => {
    injectScript(`${soundCloudUrl}api.js`)
      .then(() => setReady(true));
  }, []);

  if (!isReady) return null;

  return (
    <React.Fragment>
      <button
        className={getClasses(styles.sc, styles.scOpened, isPlaying)}
        type="button"
        onClick={toggleVisibility}
      >
        <FontAwesomeIcon icon={faSoundcloud} />
      </button>
      <button className={styles.prev} type="button" onClick={prev}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {!isPlaying && (
        <button className={styles.play} type="button" onClick={play}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      {!!isPlaying && (
        <button className={styles.pause} type="button" onClick={pause}>
          <FontAwesomeIcon icon={faPause} />
        </button>
      )}
      <button className={styles.next} type="button" onClick={next}>
        <FontAwesomeIcon icon={faForward} />
      </button>
      <div className={getClasses(styles.player, styles.playerOpened)}>
        <iframe
          ref={$iframe}
          width="100%"
          height={visual ? 300 : 450}
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          title="Night.fm"
          src={src}
        />
      </div>
    </React.Fragment>
  );
}

SoundCloudPlayer.defaultProps = {
  visual: false,
  onOpen: () => {},
};

SoundCloudPlayer.propTypes = {
  visual: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default SoundCloudPlayer;
