'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var INITIAL_STORE_DATA = exports.INITIAL_STORE_DATA = 'INITIAL_STORE_DATA';

// only to be used on server
var setInitialStoreData = exports.setInitialStoreData = function setInitialStoreData(state, props) {
  if (typeof process === 'undefined') {
    throw new Error('This function is to only be called on the server.');
  }
  return state.dispatch({
    type: INITIAL_STORE_DATA,
    payload: props
  });
};

var EXAMPLE_ACTION = exports.EXAMPLE_ACTION = 'EXAMPLE_ACTION';

var exampleAction = exports.exampleAction = function exampleAction(props) {
  return function (dispatch) {
    dispatch({
      type: EXAMPLE_ACTION,
      payload: props
    });
  };
};