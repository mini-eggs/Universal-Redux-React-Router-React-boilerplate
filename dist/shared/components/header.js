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
    var logos = [
        {
            name: 'React',
            image: 'http://i.imgur.com/TqOKThW.png',
            styles: {
                backgroundColor: '#00d8ff'
            }
        },
        {
            name: 'TypeScript',
            image: 'http://i.imgur.com/te9DJ55.png',
            styles: {
                backgroundColor: '#007acc'
            }
        },
        {
            name: 'Redux',
            image: 'http://i.imgur.com/29VnAI1.png',
            styles: {
                backgroundColor: '#764abc'
            }
        }
    ];
    var aBrand = function (brand, index) {
        return (React.createElement("div", { key: index, className: "col-xs-4 aBrand", style: brand.styles },
            React.createElement("img", { src: brand.image })));
    };
    exports["default"] = function () {
        return (React.createElement("div", { className: "containerFluid" }, logos.map(aBrand)));
    };
});
