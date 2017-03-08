'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contentful = require('contentful');

var _contentful2 = _interopRequireDefault(_contentful);

var _actions = require('../../shared/actions/actions');

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = _contentful2.default.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN
});

exports.default = function () {
  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var data, links, pages, posts, secondaryLink, fixedLinks;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return client.getEntries();

            case 3:
              data = _context.sent;
              links = [];
              pages = [];
              posts = [];
              secondaryLink = [];


              data.items.forEach(function (item) {
                var type = item.sys.contentType.sys.id;
                switch (type) {
                  case 'tabs':
                    links.push(item.fields);
                    break;
                  case 'page':
                    pages.push(item.fields);
                    break;
                  case 'blogPost':
                    posts.push(item.fields);
                    break;
                  case 'about':
                    secondaryLink = secondaryLink.concat(item.fields.links);
                    break;
                  default:
                    break;
                }
              });

              // fix blog posts data
              // fixed to be lol
              posts.sort(function (a, b) {
                return new Date(a.date) > new Date(b.date) ? -1 : 1;
              });

              // fix links
              links = links.concat(secondaryLink);
              fixedLinks = [];

              links.forEach(function (link) {
                fixedLinks.push({
                  name: link.name,
                  href: typeof link.slug !== 'undefined' ? link.slug : link.url
                });
              });

              resolve({ links: fixedLinks, pages: pages, posts: posts });
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](0);

              reject(_context.t0);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 16]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};