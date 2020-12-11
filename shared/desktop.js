import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import LinkFile from 'atomic/link-file';

import styles from 'styles/modules/desktop.module.scss';

const gravatar = 'https://gravatar.com/avatar/0d6431f3ce241c8c688dfd7831b511c8?s=250';
const BGS = [
  '/wp/dannylines.jpg',
  '/wp/daviddiveroli.jpg',
  '/wp/omidarmin.jpg',
  '/wp/peterluo0113.jpg',
  '/wp/roland_loesslein.jpg',
  '/wp/thevanegmond.jpg',
  '/wp/ussamaazam.jpg',
];

const Desktop = () => {
  return (
    <div className={styles.container} style={{
      backgroundImage: `url("${BGS[4]}")`
    }}>
      <div className={styles.flexbox}>
        <LinkFile href="/readme" label="README" src={gravatar} alt="A cartoon of myself" />
        <LinkFile
          href="https://www.linkedin.com/in/ikertxu/"
          label="LinkedIn"
          icon={faLinkedin} />
        <LinkFile
          href="https://github.com/orloxx"
          label="Github"
          icon={faGithub} />
      </div>
    </div>
  );
};

export default Desktop;

// <span>Photo by <a href="https://unsplash.com/@dannylines?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Danny Lines</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@daviddiveroli?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David Di Veroli</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@omidarmin?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Omid Armin</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@peterluo0113?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Peter Luo</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@roland_loesslein?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Roland Lösslein</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@thevanegmond?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Nathan Van Egmond</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// <span>Photo by <a href="https://unsplash.com/@ussamaazam?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ussama Azam</a> on <a href="https://unsplash.com/t/wallpapers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
