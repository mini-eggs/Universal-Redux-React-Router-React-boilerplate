'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _item = require('../containers/item');

var _item2 = _interopRequireDefault(_item);

var _blogs = require('../containers/blogs');

var _blogs2 = _interopRequireDefault(_blogs);

var _container = require('../containers/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleRouteChange = function handleRouteChange() {
  window.scrollTo(0, 0);
};

var routes = exports.routes = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _container2.default, onChange: handleRouteChange },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/home' }),
    _react2.default.createElement(_reactRouter.Route, { path: '/blog', component: _blogs2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/:item', component: _item2.default })
  ),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '*' },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/' })
  )
);

exports.default = function (props) {
  return routes;
};