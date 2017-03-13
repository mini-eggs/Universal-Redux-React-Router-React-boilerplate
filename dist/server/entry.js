'use strict';

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apicache = require('apicache');

var _apicache2 = _interopRequireDefault(_apicache);

var _portfinder = require('portfinder');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _restroomrate = require('./applications/restroomrate/restroomrate');

var _restroomrate2 = _interopRequireDefault(_restroomrate);

var _twitterBot = require('./applications/twitterBot/twitterBot');

var _twitterBot2 = _interopRequireDefault(_twitterBot);

var _triangly = require('./applications/triangly/triangly');

var _triangly2 = _interopRequireDefault(_triangly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);
var jsonParser = _bodyParser2.default.json(server);
var cache = _apicache2.default.middleware;

/**
 * Static files
 */
app.use('/scripts', _express2.default.static(__dirname + '/../../dist/client/scripts'));
app.use('/styles', _express2.default.static(__dirname + '/../../dist/client/styles'));

/**
 * Routing per application
 */
(0, _restroomrate2.default)(app, jsonParser);
(0, _twitterBot2.default)(app, jsonParser);
(0, _triangly2.default)(app, jsonParser);

/**
 * Cache routes
 */
app.use(cache('30 minutes'));

/**
 * Socketing per application
 */
io.on('connection', function (socket) {
  (0, _twitterBot.TwitterBotSockets)(socket);
});

/**
 * Main application routing
 * Server side rendering/etc
 */
(0, _router2.default)(app);

if (process.env.PORT) {
  server.listen(process.env.PORT);
} else {

  var serverHasStarted = function serverHasStarted(port) {
    console.log('==> \uD83C\uDF0E  http://localhost:' + port + '/');
  };

  var serverHasNotStarted = function serverHasNotStarted(err) {
    console.log('Something went wrong while trying to start the server. Error below:');
    console.log(err);
  };

  var startServer = function startServer(port) {
    return new Promise(function (resolve, reject) {
      server.listen(port, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(port);
        }
      });
    });
  };

  (0, _portfinder.getPortPromise)().then(startServer).then(serverHasStarted).catch(serverHasNotStarted);
}