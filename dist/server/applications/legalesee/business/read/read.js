'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({ api_key: process.env.ALCHEMY_API_KEY });

// example post
// curl -H "Content-Type: application/json" -X POST -d '{"text":"here is some terms of service", "type": "text"}' http://localhost:8080/legalesee/read

function getAlchemyDataFromUrl(url) {
  var _this = this;

  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var data, props;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios2.default.get(url);

            case 3:
              data = _context.sent;
              props = {
                html: data.data
              };

              alchemy_language.keywords(props, function (err, response) {
                if (err) reject(err);
                resolve(response);
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              reject(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.default = function (req, res) {
  function complete(data) {
    res.json({
      status: 1,
      message: 'success',
      response: data
    });
  }

  function error(err) {
    res.json({
      status: -1,
      message: 'error',
      error: err
    });
  }

  var data = req.body;

  if (!data) {
    res.json({ status: -1, message: 'no post data' });
  } else if (!data.text) {
    res.json({ status: -1, message: 'no post data "text" param' });
  } else if (!data.type) {
    res.json({ status: -1, message: 'no post data "type" param' });
  } else if (data.type !== 'text' && data.type !== 'html' && data.type !== 'url') {
    res.json({
      status: -1,
      message: 'post data "type" param incorrect',
      content: data.type
    });
  } else {
    var props = {};
    props[data.type] = data.text;

    /**
     * This API is unpredictable with URLs
     * so we have a fallback
     */

    alchemy_language.keywords(props, function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, response) {
        var alchResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(err && data.type === 'url')) {
                  _context2.next = 13;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return getAlchemyDataFromUrl(data.text);

              case 4:
                alchResponse = _context2.sent;

                complete(alchResponse.keywords);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](1);

                error(_context2.t0);

              case 11:
                _context2.next = 14;
                break;

              case 13:
                if (err) {
                  error(err);
                } else {
                  complete(response.keywords);
                }

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[1, 8]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};