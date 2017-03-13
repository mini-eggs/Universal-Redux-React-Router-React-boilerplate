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

var saveTemp = function saveTemp(url) {
  return new Promise(function (resolve, reject) {
    var parts = url.split('.');
    var name = new Date().getTime() + '.' + parts[parts.length - 1];
    _request2.default.get({ url: url, encoding: 'binary' }, function (err, response, body) {
      if (err) reject(err);
      _fs2.default.writeFile(__dirname + '/tmp/' + name, body, 'binary', function (err) {
        if (err) reject(err);
        resolve(name);
      });
    });
  });
};

var getBuffer = function getBuffer(name) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/tmp/' + name, function (err, buffer) {
      if (err) reject();
      resolve(buffer);
    });
  });
};

var triangulate = function triangulate(buffer, name, options) {
  return new Promise(function (resolve, reject) {
    (0, _triangulateImage2.default)(options).fromBuffer(buffer).toBuffer().then(function (imageBuffer) {
      _fs2.default.writeFile(__dirname + '/output/' + name, imageBuffer, function (err) {
        if (err) reject(err);
        resolve(imageBuffer);
      });
    }).catch(reject);
  });
};

var deleteSingle = function deleteSingle(name) {
  return new Promise(function (resolve, reject) {
    _fs2.default.unlink(name, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

var deleteFiles = function deleteFiles(name) {
  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.t0 = resolve;
              _context.next = 4;
              return Promise.all([deleteSingle(__dirname + '/tmp/' + name), deleteSingle(__dirname + '/output/' + name)]);

            case 4:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t2 = _context['catch'](0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var props, options, fileName, inputBuffer, outputBuffer, imageURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            props = req.body;
            options = Object.assign({}, defaultOptions, props.options);
            _context2.prev = 2;
            _context2.next = 5;
            return saveTemp(props.image);

          case 5:
            fileName = _context2.sent;
            _context2.next = 8;
            return getBuffer(fileName);

          case 8:
            inputBuffer = _context2.sent;
            _context2.next = 11;
            return triangulate(inputBuffer, fileName, options);

          case 11:
            outputBuffer = _context2.sent;
            _context2.next = 14;
            return (0, _shared.UploadImage)(outputBuffer.toString('base64'));

          case 14:
            imageURL = _context2.sent;

            deleteFiles(fileName);
            (0, _shared.Complete)(req, res, imageURL);
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2['catch'](2);

            (0, _shared.Failure)(req, res, _context2.t0);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 19]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();