"use client";

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { changeIconPosition } from "store/settings/actions";
import { getIconPosition } from "store/settings/selectors";
import styles from "styles/modules/link-file.module.scss";

function LinkFile({ href, label, name, icon = faFile, src = "", alt = "" }) {
  const [dragging, isDragging] = useState(false);
  const [dragTimeout, setDragTimeout] = useState(null);
  const router = useRouter();
  const $button = useRef();
  const position = useSelector(getIconPosition(name));
  const dispatch = useDispatch();

  function routeHref() {
    router.push(href);
  }

  const startDragging = () => {
    setDragTimeout(setTimeout(() => isDragging(true), 200));
  };

  const stopDragging = (_e, { x, y }) => {
    dispatch(changeIconPosition({ [name]: { x, y } }));
    if (dragTimeout) clearTimeout(dragTimeout);
    setTimeout(() => isDragging(false), 200);
  };

  function handleTouch() {
    if (!dragging) routeHref();
  }

  return (
    <Draggable
      nodeRef={$button}
      bounds="body"
      defaultPosition={position}
      onStart={startDragging}
      onStop={stopDragging}
    >
      <button
        className={styles.container}
        type="button"
        ref={$button}
        onClick={() => $button.current.focus()}
        onTouchEndCapture={handleTouch}
        onDoubleClick={routeHref}
      >
        {icon && !src && (
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        )}
        {src && (
          <Image
            className={styles.image}
            src={src}
            alt={alt}
            width={64}
            height={64}
          />
        )}
        <span className={styles.label}>{label}</span>
      </button>
    </Draggable>
  );
}

LinkFile.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.shape(),
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default LinkFile;
