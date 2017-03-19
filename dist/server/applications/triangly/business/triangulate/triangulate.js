'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _triangulateImage = require('triangulate-image');

var _triangulateImage2 = _interopRequireDefault(_triangulateImage);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _shared = require('../../../shared/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' http://localhost:8000/triangly/triangulate
// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' https://restroomrate.herokuapp.com/triangly/triangulate

var defaultOptions = {
  accuracy: 0.7,
  blur: 40,
  threshold: 50,
  vertexCount: 700,
  fill: true,
  stroke: true,
  strokeWidth: 0.5,
  gradients: true,
  gradientStops: 4,
  lineJoin: 'miter',
  transparentColor: false
};

var triangulate = function triangulate(buffer, options) {
  return new Promise(function (resolve, reject) {
    (0, _triangulateImage2.default)(options).fromBuffer(buffer).toBuffer().then(function (imageBuffer) {
      resolve(imageBuffer);
    }).catch(reject);
  });
};

exports.default = function (socket) {
  socket.on('triangly/triangulate/create', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(props) {
      var image, options, outputBuffer, imageURL, fixedOptions, buf, imgUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              image = props.image;
              options = Object.assign({}, defaultOptions, props.options);
              _context.prev = 2;
              _context.next = 5;
              return triangulate(Buffer.from(image, 'base64'), options);

            case 5:
              outputBuffer = _context.sent;
              _context.next = 8;
              return (0, _shared.UploadImage)(outputBuffer.toString('base64'));

            case 8:
              imageURL = _context.sent;

              socket.emit('triangly/triangulate/complete', { image: imageURL });
              _context.next = 28;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](2);
              _context.prev = 14;
              fixedOptions = Object.assign({}, options, { blur: defaultOptions.blur });
              _context.next = 18;
              return triangulate(Buffer.from(image, 'base64'), fixedOptions);

            case 18:
              buf = _context.sent;
              _context.next = 21;
              return (0, _shared.UploadImage)(buf.toString('base64'));

            case 21:
              imgUrl = _context.sent;

              socket.emit('triangly/triangulate/complete', { image: imgUrl });
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t1 = _context['catch'](14);

              socket.emit('triangly/triangulate/failure', { error: _context.t1 });

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 12], [14, 25]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};