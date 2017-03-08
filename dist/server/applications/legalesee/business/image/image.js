'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tesseract = require('tesseract.js');

var _tesseract2 = _interopRequireDefault(_tesseract);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on('readImage', function (props) {
    var data = { url: props.image, encoding: null };
    (0, _request2.default)(data, function (err, response, buffer) {
      if (err) {
        socket.emit('imageError', err);
      } else {
        var tess = _tesseract2.default.recognize(new Buffer(buffer));
        tess.progress(function (progress) {
          if (progress.status === 'recognizing text') {
            socket.emit('imageProgress', progress);
          }
        });
        tess.then(function (result) {
          socket.emit('imageComplete', result.text);
        });
        tess.catch(function (err) {
          socket.emit('imageError', err);
        });
      }
    });
  });
};