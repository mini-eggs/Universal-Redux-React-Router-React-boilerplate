'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _blogs = require('../components/blogs');

var _blogs2 = _interopRequireDefault(_blogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getProps = function getProps(state) {
  return {
    items: state.InitialReducer.posts
  };
};

exports.default = (0, _reactRedux.connect)(getProps)(_blogs2.default);