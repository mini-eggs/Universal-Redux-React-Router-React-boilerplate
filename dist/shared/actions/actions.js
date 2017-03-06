(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.INITIAL_STORE_DATA = 'INITIAL_STORE_DATA';
    // only to be used on server
    exports.setInitialStoreData = function (state, props) {
        if (typeof process === 'undefined') {
            throw new Error('This function is to only be called on the server.');
        }
        return state.dispatch({
            type: exports.INITIAL_STORE_DATA,
            payload: props
        });
    };
    exports.EXAMPLE_ACTION = 'EXAMPLE_ACTION';
    exports.exampleAction = function (props) { return function (dispatch) {
        dispatch({
            type: exports.EXAMPLE_ACTION,
            payload: props
        });
    }; };
});
