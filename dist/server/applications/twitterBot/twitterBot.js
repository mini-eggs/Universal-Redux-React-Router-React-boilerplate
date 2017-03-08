'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwitterBotSockets = undefined;

var _template = require('./template/template');

var _template2 = _interopRequireDefault(_template);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreatePost from './business/createPost/createPost'
exports.TwitterBotSockets = _sockets2.default;

exports.default = function (app, parser) {
  app.get('/twitter-bot', _template2.default);

  app.get('/twitter-bot/info', function (req, res) {
    res.json({ message: 'welcome to Twitter Bot server' });
  });
  // depricated in favor of sockets
  // app.get('/twitter-bot/create-post', parser, CreatePost);
};