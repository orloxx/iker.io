import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import StatusBar from 'shared/status-bar'
import { GRAVATAR } from 'atomic/constants'

const APP_ICONS = [
  { src: '/wp/icon16.png', sizes: '16x16' },
  { src: '/wp/icon64.png', sizes: '64x64' },
  { src: '/wp/icon192.png', sizes: '192x192' },
  { src: '/wp/icon256.png', sizes: '256x256' },
]

function CustomHead({ author, title, description, keywords }) {
  const { asPath } = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="theme-color" content="#0E5389" />

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

        <link rel="manifest" href="/manifest.json" />

        {APP_ICONS.map(({ src, sizes }) => (
          <React.Fragment key={src}>
            <link rel="icon" sizes={sizes} href={src} />
            <link rel="apple-touch-icon" sizes={sizes} href={src} />
          </React.Fragment>
        ))}
      </Head>
      <StatusBar title={title} />
    </>
  )
}

CustomHead.defaultProps = {
  author: 'Iker Garitaonandia',
  title: 'Iker Garitaonandia | Software Developer',
  description:
    "My name is Iker Garitaonandia and I'm a professional software developer with 15 years of experience helping companies achieve digital transformation.",
  keywords: [
    'Software developer',
    'Engineer',
    'Web developer',
    'JavaScript',
    'Frontend',
    'HTML',
    'CSS',
  ],
}

CustomHead.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
}

export default CustomHead
