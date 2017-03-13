'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)(props.url, function (error, response, buffer) {
      if (error) {
        reject(error);
      } else {
        resolve({ response: response, buffer: buffer });
      }
    });
  });
};