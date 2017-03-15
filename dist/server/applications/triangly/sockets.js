'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _triangulate = require('./business/triangulate/triangulate');

var _triangulate2 = _interopRequireDefault(_triangulate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  (0, _triangulate2.default)(socket);
};