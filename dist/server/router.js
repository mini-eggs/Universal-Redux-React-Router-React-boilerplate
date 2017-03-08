'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _base = require('./base/base');

var _base2 = _interopRequireDefault(_base);

var _routes = require('../shared/routes/routes');

var _store = require('../shared/store/store');

var _store2 = _interopRequireDefault(_store);

var _initialStoreData = require('./data/initialStoreData');

var _initialStoreData2 = _interopRequireDefault(_initialStoreData);

var _actions = require('../shared/actions/actions');

var _shared = require('./applications/shared/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTemplate = function getTemplate(html, state) {
  var withState = _base2.default.replace('{{STATE}}', JSON.stringify(state).replace(/</g, '\\x3c'));
  var withoutHtml = (0, _shared.MinifyHTML)(withState);
  return withoutHtml.replace('{{HTML}}', html);
};

var getMarkup = function getMarkup(req, res, store) {
  return new Promise(function (resolve, reject) {
    (0, _reactRouter.match)({ routes: _routes.routes, location: req.url }, function (err, redirect, props) {
      if (err) {
        reject();
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (props) {
        resolve((0, _server.renderToString)(_react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(_reactRouter.RouterContext, props)
        )));
      } else {
        reject();
      }
    });
  });
};

var errorHandler = function errorHandler(req, res, err) {
  console.log(err);
  res.send('Error');
};

exports.default = function (app) {
  app.get('*', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
      var store, data, html, finalState;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              store = (0, _store2.default)({});
              _context.next = 4;
              return (0, _initialStoreData2.default)();

            case 4:
              data = _context.sent;

              (0, _actions.setInitialStoreData)(store, data);
              _context.next = 8;
              return getMarkup(req, res, store);

            case 8:
              html = _context.sent;
              finalState = store.getState();

              res.setHeader('Vary', 'Accept-Encoding');
              res.send(getTemplate(html, finalState));
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](0);

              errorHandler(req, res, _context.t0);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 14]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};