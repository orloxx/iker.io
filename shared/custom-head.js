import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StatusBar from 'shared/status-bar';
import { GRAVATAR } from 'atomic/constants';

function CustomHead({
  author, title, description, keywords,
}) {
  const { asPath } = useRouter();

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join()} />
        <meta name="author" content={author} />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://iker.io${asPath}`} />
        <meta property="og:image" content={GRAVATAR} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="article:tag" content={keywords.join()} />
      </Head>
      <StatusBar title={title} />
    </React.Fragment>
  );
}

CustomHead.defaultProps = {
  author: 'Iker Garitaonandia',
  title: 'Iker Garitaonandia | Software Developer',
  description: 'My name is Iker Garitaonandia and I\'m a professional software developer with 15+ years of experience helping companies achieve digital transformation.',
  keywords: ['Software developer', 'Engineer', 'Web developer', 'JavaScript', 'Frontend', 'HTML', 'CSS'],
};

CustomHead.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default CustomHead;
