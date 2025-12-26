"use client";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCogs, faQrcode } from "@fortawesome/free-solid-svg-icons";
import LinkFile from "atoms/link-file";
import { useSelector } from "react-redux";
import { getCurrentBg } from "store/settings/selectors";
import styles from "styles/modules/desktop.module.scss";
import { GRAVATAR } from "utils/constants";

function Desktop() {
  const currentBg = useSelector(getCurrentBg());

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("${currentBg.src}")`,
      }}
    >
      <div className={styles.flexbox}>
        <LinkFile
          href="/readme"
          label="README"
          name="readme"
          src={GRAVATAR}
          alt="A cartoon of myself"
        />
        <LinkFile
          href="/settings"
          label="Settings"
          name="settings"
          icon={faCogs}
        />
        <LinkFile
          href="https://www.linkedin.com/in/ikertxu/"
          label="LinkedIn"
          name="linkedin"
          icon={faLinkedin}
        />
        <LinkFile
          href="https://github.com/orloxx"
          label="Github"
          name="github"
          icon={faGithub}
        />
        <LinkFile
          href="/qr"
          label="QR Create"
          name="qr-create"
          icon={faQrcode}
        />
      </div>
      <div className={styles.credits}>{currentBg.credits}</div>
    </div>
  );
}

export default Desktop;
