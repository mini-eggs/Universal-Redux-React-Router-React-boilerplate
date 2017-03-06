(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var React = require("react");
    exports["default"] = function (props) {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Placeholder page 1"),
            React.createElement("div", null, "Message from initial store:"),
            React.createElement("div", null, props.data)));
    };
});
