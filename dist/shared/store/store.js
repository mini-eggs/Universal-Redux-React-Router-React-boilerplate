(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux", "../reducers/reducers"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var redux_1 = require("redux");
    var reducers_1 = require("../reducers/reducers");
    exports["default"] = function (preloadedState) {
        return redux_1.createStore(reducers_1["default"], preloadedState);
    };
});
