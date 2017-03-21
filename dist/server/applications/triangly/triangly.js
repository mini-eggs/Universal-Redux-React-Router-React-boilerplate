'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrianglySockets = undefined;

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TrianglySockets = _sockets2.default;

exports.default = function (app, parser) {
  app.all('/triangly', function (req, res) {
    res.json({ message: 'welcome to triangly server' });
  });
};