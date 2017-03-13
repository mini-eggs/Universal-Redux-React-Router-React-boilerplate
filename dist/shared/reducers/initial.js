'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions/actions');

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.INITIAL_STORE_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};