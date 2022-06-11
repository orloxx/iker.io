const withPWA = require('next-pwa')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: !IS_PRODUCTION,
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['atomic', 'pages', 'shared', 'store'],
  },
})
