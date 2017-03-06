'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('./business/image/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  (0, _image2.default)(socket);
};