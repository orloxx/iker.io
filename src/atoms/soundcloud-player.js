"use client";

import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import qs from "qs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentPlaylist } from "store/settings/selectors";
import styles from "styles/modules/soundcloud-player.module.scss";
import { injectScript, listenOutsideClick } from "utils";

/**
 * Controls the SoundCloud Widget API
 * https://developers.soundcloud.com/docs/api/html5-widget
 */
function SoundCloudPlayer({ visual = false, onOpen = () => {} }) {
  const currentPlaylist = useSelector(getCurrentPlaylist());
  const soundCloudUrl = "https://w.soundcloud.com/player/";
  const options = {
    url: currentPlaylist.src,
    color: "#ff5500",
    auto_play: false,
    show_comments: false,
    show_user: true,
    show_reposts: false,
    show_teaser: true,
    visual,
  };
  const src = `${soundCloudUrl}?${qs.stringify(options)}`;
  const [apiReady, setApiReady] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [playlistChange, setPlaylistChange] = useState(0);
  const $iframe = useRef(null);
  const $buttons = useRef([]);

  function toggleVisibility() {
    onOpen(!isOpen);
    setOpen(!isOpen);
  }

  function getClasses(required, opened, condition = isOpen) {
    return [required, ...(condition ? [opened] : [])].join(" ");
  }

  const getWidget = useCallback(() => {
    return window.SC.Widget($iframe.current);
  }, []);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    setPlaylistChange(playlistChange + 1);
  }, [apiReady, currentPlaylist]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    setPlaying(false);
    setWidgetReady(false);
    setWidgetError(false);
    let widget;
    if (apiReady && $iframe?.current) {
      widget = getWidget();
      widget.bind(window.SC.Widget.Events.PLAY, () => setPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
      widget.bind(window.SC.Widget.Events.READY, () => setWidgetReady(true));
      widget.bind(window.SC.Widget.Events.ERROR, () => setWidgetError(true));
    }
  }, [playlistChange]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    let removeOutsideClick;
    if (apiReady && $iframe?.current && isOpen) {
      removeOutsideClick = listenOutsideClick(
        [$iframe.current, ...$buttons.current],
        () => setOpen(false),
      );
    }

    return () => {
      if (removeOutsideClick) {
        removeOutsideClick();
      }
    };
  }, [isOpen, isPlaying]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    if (!apiReady) {
      injectScript(`${soundCloudUrl}api.js`).then(() => setApiReady(true));
    }
  }, []);

  if (!apiReady) return null;

  return (
    <>
      <button
        ref={(el) => {
          $buttons.current[0] = el;
        }}
        className={getClasses(styles.sc, styles.scOpened, isPlaying)}
        type="button"
        onClick={toggleVisibility}
      >
        <FontAwesomeIcon icon={faSoundcloud} />
      </button>
      {!!widgetReady && !widgetError && (
        <>
          <button
            ref={(el) => {
              $buttons.current[1] = el;
            }}
            className={styles.prev}
            type="button"
            onClick={prev}
          >
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          {!isPlaying && (
            <button
              ref={(el) => {
                $buttons.current[2] = el;
              }}
              className={styles.play}
              type="button"
              onClick={play}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {!!isPlaying && (
            <button
              ref={(el) => {
                $buttons.current[3] = el;
              }}
              className={styles.pause}
              type="button"
              onClick={pause}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
          )}
          <button
            ref={(el) => {
              $buttons.current[4] = el;
            }}
            className={styles.next}
            type="button"
            onClick={next}
          >
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </>
      )}
      <div className={getClasses(styles.player, styles.playerOpened)}>
        <iframe
          key={playlistChange}
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
    </>
  );
}

SoundCloudPlayer.propTypes = {
  visual: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default SoundCloudPlayer;
