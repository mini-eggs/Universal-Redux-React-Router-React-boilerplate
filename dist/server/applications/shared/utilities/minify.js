'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _htmlMinifier = require('html-minifier');

var _htmlMinifier2 = _interopRequireDefault(_htmlMinifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (html) {
  return _htmlMinifier2.default.minify(html, {
    minifyJS: true,
    collapseWhitespace: true,
    minifyCSS: true
  });
};