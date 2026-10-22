"use client";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCogs, faQrcode } from "@fortawesome/free-solid-svg-icons";
import LinkFile from "atoms/link-file";
import { useSelector } from "react-redux";
import { getCurrentBg } from "store/settings/selectors";
import styles from "styles/modules/desktop.module.scss";
import { GRAVATAR, GRAVATAR_CG } from "utils/constants";

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
          href="https://codergeist.com"
          label="Codergeist"
          name="codergeist"
          src={GRAVATAR_CG}
          alt="Codergeist Logo"
        />
        <LinkFile
          href="https://tufiscal.es"
          label="tufiscal"
          name="tufiscal"
          src="/tufiscal.svg"
          alt="tufiscal logo"
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
          href="/settings"
          label="Settings"
          name="settings"
          icon={faCogs}
        />
        <LinkFile
          href="/qr"
          label="QR Create"
          name="qr-create"
          icon={faQrcode}
        />
        <LinkFile
          href="https://tru.co.ve"
          label="Truco Venezolano"
          name="truco"
          src="/truco.svg"
          alt="Truco Venezolano logo"
        />
        <LinkFile
          href="https://ukulele-veneco-app.vercel.app"
          label="Ukulele Veneco"
          name="ukulele-veneco"
          src="/ukulele-veneco.svg"
          alt="Ukulele Veneco logo"
        />
        <LinkFile
          href="https://cg-sorting-bits.vercel.app"
          label="Sorting Bits"
          name="sorting-bits"
          src="/sorting-bits.svg"
          alt="Sorting Bits logo"
        />
      </div>
      <div className={styles.credits}>{currentBg.credits}</div>
    </div>
  );
}

export default Desktop;
