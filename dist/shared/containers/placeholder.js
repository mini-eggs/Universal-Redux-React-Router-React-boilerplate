(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react-redux", "../components/placeholder"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var react_redux_1 = require("react-redux");
    var placeholder_1 = require("../components/placeholder");
    var getProps = function (state) {
        return {
            data: state.InitialReducer.data
        };
    };
    exports["default"] = react_redux_1.connect(getProps)(placeholder_1["default"]);
});
