'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _item = require('../components/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getProps = function getProps(state) {
  return {
    items: [].concat(_toConsumableArray(state.InitialReducer.posts), _toConsumableArray(state.InitialReducer.pages))
  };
};

exports.default = (0, _reactRedux.connect)(getProps)(_item2.default);