(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-router", "../containers/placeholder", "../containers/placeholder2", "../components/container"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var React = require("react");
    var react_router_1 = require("react-router");
    var placeholder_1 = require("../containers/placeholder");
    var placeholder2_1 = require("../containers/placeholder2");
    var container_1 = require("../components/container");
    exports.routes = (React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
        React.createElement(react_router_1.Route, { path: "/", component: container_1["default"] },
            React.createElement(react_router_1.IndexRedirect, { to: "/about" }),
            React.createElement(react_router_1.Route, { path: "/about", component: placeholder_1["default"] }),
            React.createElement(react_router_1.Route, { path: "/more", component: placeholder2_1["default"] })),
        React.createElement(react_router_1.Route, { path: "*" },
            React.createElement(react_router_1.IndexRedirect, { to: "/" }))));
    exports["default"] = function (props) {
        return exports.routes;
    };
});
