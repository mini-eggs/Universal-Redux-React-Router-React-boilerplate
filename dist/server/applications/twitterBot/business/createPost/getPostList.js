'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = new _twitter2.default({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var defaultParams = {
  count: 200,
  exclude_replies: true,
  contributor_details: false,
  include_rts: false,
  trim_user: true
};

var getSingleTweetList = function getSingleTweetList(client, props, last) {
  var params = props;
  if (last) {
    params.max_id = last;
  }

  return new Promise(function (resolve, reject) {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (error) {
        console.log('here');
        console.log(error);
        reject(error);
      } else {
        var data = {
          tweets: tweets.map(function (tweet) {
            return tweet.text;
          })
        };
        if (tweets[tweets.length - 1] && tweets.length !== 1) {
          // for new accounts twitter api
          // will coninuously send one tweet back
          data.last = tweets[tweets.length - 1].id;
        }
        resolve(data);
      }
    });
  });
};

exports.default = function (props) {
  var params = Object.assign({}, defaultParams, props);

  var tweets = [];
  var moreTweets = true;
  var last = null;

  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var tweetData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!moreTweets) {
                _context.next = 14;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return getSingleTweetList(client, params, last);

            case 4:
              tweetData = _context.sent;

              if (tweetData.last) {
                tweets = tweets.concat(tweetData.tweets);
                last = tweetData.last;
              } else {
                moreTweets = false;
                resolve(tweets);
              }
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              moreTweets = false;
              resolve(tweets);

            case 12:
              _context.next = 0;
              break;

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};