(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../actions/actions"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var actions_1 = require("../actions/actions");
    exports["default"] = function (state, action) {
        if (state === void 0) { state = {}; }
        switch (action.type) {
            case actions_1.INITIAL_STORE_DATA:
                return Object.assign({}, state, action.payload);
            default:
                return state;
        }
    };
});
