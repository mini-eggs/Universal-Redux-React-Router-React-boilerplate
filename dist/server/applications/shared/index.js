'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinifyHTML = exports.UploadImage = exports.Request = exports.Failure = exports.Complete = undefined;

var _complete = require('./utilities/complete');

var _complete2 = _interopRequireDefault(_complete);

var _failure = require('./utilities/failure');

var _failure2 = _interopRequireDefault(_failure);

var _request = require('./utilities/request');

var _request2 = _interopRequireDefault(_request);

var _uploadImage = require('./utilities/uploadImage');

var _uploadImage2 = _interopRequireDefault(_uploadImage);

var _minify = require('./utilities/minify');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Complete = _complete2.default;
exports.Failure = _failure2.default;
exports.Request = _request2.default;
exports.UploadImage = _uploadImage2.default;
exports.MinifyHTML = _minify2.default;