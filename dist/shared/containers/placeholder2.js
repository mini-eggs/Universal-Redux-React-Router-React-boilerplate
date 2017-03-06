(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react-redux", "../components/placeholder2"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var react_redux_1 = require("react-redux");
    var placeholder2_1 = require("../components/placeholder2");
    var getProps = function (state) {
        return {};
    };
    exports["default"] = react_redux_1.connect(getProps)(placeholder2_1["default"]);
});
