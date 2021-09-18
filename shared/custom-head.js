import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import StatusBar from './status-bar';

function CustomHead({ title, description }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="<%= keywords %>" />
        <meta name="author" content="Iker Garitaonandia" />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="<%= url %>" />
        <meta property="og:image" content="<%= image %>" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="article:tag" content="<%= keywords %>" />
      </Head>
      <StatusBar title={title} />
    </React.Fragment>
  );
}

CustomHead.defaultProps = {
  title: 'Iker Garitaonandia | Software Developer',
  description: 'My name is Iker Garitaonandia and I\'m a professional software developer with 15+ years of experience helping companies achieve digital transformation.',
};

CustomHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default CustomHead;
