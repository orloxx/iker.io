module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // off rules
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js'],
      },
    },
  },
};
