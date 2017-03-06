(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-router"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var React = require("react");
    var react_router_1 = require("react-router");
    var links = [
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'More',
            link: '/more'
        }
    ];
    var aLink = function (link, index) {
        return (React.createElement(react_router_1.Link, { key: index, className: "col-xs-6 aLink", activeClassName: "aLinkActive", to: link.link }, link.name));
    };
    exports["default"] = function () {
        return (React.createElement("div", { className: "containerFluid" },
            React.createElement("div", { className: "aLinkContainer" },
                links.map(aLink),
                React.createElement("div", { className: "clear" }))));
    };
});
