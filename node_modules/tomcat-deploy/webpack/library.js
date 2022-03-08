const extend = require('extend');
const path = require('path');
const common = require('./common');

module.exports = extend(common, {
  entry: path.resolve(__dirname, '..', 'src/index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
});
