'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegaleseeSockets = undefined;

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _read = require('./business/read/read');

var _read2 = _interopRequireDefault(_read);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LegaleseeSockets = _sockets2.default;

exports.default = function (app, parser) {
  app.all('/legalesee', function (req, res) {
    res.json({ message: 'welcome to legalesee server' });
  });

  app.post('/legalesee/read', parser, _read2.default);
};