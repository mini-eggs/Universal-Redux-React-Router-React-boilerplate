'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (image) {
  return new Promise(function (resolve, reject) {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID
    };

    var options = {
      url: 'https://api.imgur.com/3/image',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ image: image })
    };

    (0, _request2.default)(options, function (error, response, buffer) {
      if (error) reject(err);
      /* parse will sometimes fail */
      try {
        var link = JSON.parse(response.body).data.link;
        resolve(link.replace('http://', 'https://'));
      } catch (err) {
        reject(err);
      }
    });
  });
};