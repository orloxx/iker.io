const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  resolve: {
    modules: ['./node_modules', './src/js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'source/js')
  }
};
