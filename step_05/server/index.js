require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[local]___[hash:base64:5]',
});
require('./app');
