"use client";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { logError } from "store/logger/actions";
import styles from "styles/modules/window.module.scss";

function Window({
  children,
  title = "",
  type = "normal",
  html = "",
  error = null,
}) {
  const WINDOW_STYLES = {
    normal: { maxWidth: 800, maxHeight: 800 },
    system: { maxWidth: 500, maxHeight: 200 },
  };
  const containerStyle = WINDOW_STYLES[type] || WINDOW_STYLES.normal;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const $window = useRef();
  const dispatch = useDispatch();

  const getDefaultPosition = useCallback(() => {
    const halfX = window.innerWidth / 2 - $window.current.clientWidth / 2;
    const halfY = window.innerHeight / 2 - $window.current.clientHeight / 2;
    return { x: halfX, y: halfY };
  }, []);

  useEffect(() => {
    setPosition(getDefaultPosition());
  }, [getDefaultPosition]);

  useEffect(() => {
    if (error) {
      dispatch(logError(`${error.status} ${error.statusText}`));
    }
  }, [error, dispatch]);

  return (
    <Draggable
      nodeRef={$window}
      handle={`.${styles.title}`}
      bounds={{ left: 0, top: 0 }}
      position={position}
      onStop={(_e, { x, y }) => setPosition({ x, y })}
    >
      <div className={styles.container} ref={$window} style={containerStyle}>
        <div className={styles.titleBar}>
          <Link href="/" className={styles.close}>
            <FontAwesomeIcon icon={faTimes} />
          </Link>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.children}>
          {children}
          {!!html && (
            <div
              className={styles.text}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized with DOMPurify on the server
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
}

Window.propTypes = {
  children: PropTypes.shape(),
  title: PropTypes.string,
  type: PropTypes.string,
  html: PropTypes.string,
  error: PropTypes.shape({
    status: PropTypes.number,
    statusText: PropTypes.string,
  }),
};

export default Window;
