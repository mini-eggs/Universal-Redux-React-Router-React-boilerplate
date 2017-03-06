(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux", "./initial"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var redux_1 = require("redux");
    var initial_1 = require("./initial");
    exports["default"] = redux_1.combineReducers({
        InitialReducer: initial_1["default"]
    });
});
