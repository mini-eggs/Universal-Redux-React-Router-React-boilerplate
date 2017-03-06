(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./header", "./navigation"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var React = require("react");
    var header_1 = require("./header");
    var navigation_1 = require("./navigation");
    exports["default"] = function (props) {
        return (React.createElement("div", null,
            React.createElement(header_1["default"], null),
            React.createElement("div", { className: "clear" }),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "aPage col-xs-12 col-sm-8 col-sm-offset-2" },
                    React.createElement(navigation_1["default"], null),
                    React.createElement("div", { className: "clear" }),
                    React.createElement("div", { className: "aContent" }, props.children)))));
    };
});
