'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return new Promise(function (resolve, reject) {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Client-ID ' + imgurKey
    };

    var data = {
      url: 'https://api.imgur.com/3/upload',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ image: props.image })
    };

    (0, _request2.default)(data, function (error, response, buffer) {
      if (error) {
        reject(err);
      } else {
        resolve({ response: response, buffer: buffer });
      }
    });
  });
};