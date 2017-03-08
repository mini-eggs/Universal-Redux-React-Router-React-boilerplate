'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _triangulateImage = require('triangulate-image');

var _triangulateImage2 = _interopRequireDefault(_triangulateImage);

var _shared = require('../../../shared/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' http://localhost:8080/triangly/triangulate

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var props, options, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = req.body;
            options = Object.assign({}, defaultOptions, props.options);
            _context.prev = 2;
            _context.next = 5;
            return (0, _shared.Request)({ url: props.image });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return (0, _triangulateImage2.default)(options).fromBuffer(response.buffer).toBuffer();

          case 8:
            data = _context.sent;

            // const image = await UploadImage({ image: new Buffer( response.buffer, 'utf-8' ).toString('base64') })
            (0, _shared.Complete)(req, res, 'hi');
            // Complete(req, res, image)
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);

            (0, _shared.Failure)(req, res, _context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();