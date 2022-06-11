module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // try to remove
    'react-hooks/exhaustive-deps': 0,
    '@next/next/no-img-element': 0,
    // Not enforced
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./node_modules', '.'],
      },
    },
  },
}
