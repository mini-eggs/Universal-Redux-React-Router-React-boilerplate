'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPost = require('./business/createPost/createPost');

var _createPost2 = _interopRequireDefault(_createPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  (0, _createPost2.default)(socket);
};