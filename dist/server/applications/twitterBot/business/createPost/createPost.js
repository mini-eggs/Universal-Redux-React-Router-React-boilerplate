'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPostList = require('./getPostList');

var _getPostList2 = _interopRequireDefault(_getPostList);

var _getMarkovChain = require('./getMarkovChain');

var _getMarkovChain2 = _interopRequireDefault(_getMarkovChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (socket) {
  socket.on('twitterBot/createPost', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(props) {
      var onComplete, onFail;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!props.screen_name) {
                socket.emit('twitterBot/createPost/error', {
                  message: 'No screen_name parameter present'
                });
              } else {
                onComplete = function onComplete(data) {
                  socket.emit('twitterBot/createPost/complete', { sentence: data });
                };

                onFail = function onFail(err) {
                  console.log(err);
                  socket.emit('twitterBot/createPost/error', err);
                };

                (0, _getPostList2.default)(props).then(_getMarkovChain2.default).then(onComplete).catch(onFail);
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};