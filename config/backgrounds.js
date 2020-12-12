import React from 'react';

function BackgroundCredits({ href, name }) {
  return (
    <React.Fragment>
      Photo by <a href={href}>{name}</a>
    </React.Fragment>
  );
}

export const BACKGROUNDS = [{
  src: '/wp/venezuela.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@clavo1978?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Freddy Clavo" />,
}, {
  src: '/wp/dannylines.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@dannylines?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Danny Lines" />,
}, {
  src: '/wp/daviddiveroli.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@daviddiveroli?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="David Di Veroli" />,
}, {
  src: '/wp/omidarmin.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@omidarmin?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Omid Armin" />,
}, {
  src: '/wp/peterluo0113.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@peterluo0113?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Peter Luo" />,
}, {
  src: '/wp/roland_loesslein.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@roland_loesslein?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Roland Lösslein" />,
}, {
  src: '/wp/thevanegmond.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@thevanegmond?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Nathan Van Egmond" />,
}, {
  src: '/wp/ussamaazam.jpg',
  credits: <BackgroundCredits href="https://unsplash.com/@ussamaazam?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" name="Ussama Azam" />,
}];
