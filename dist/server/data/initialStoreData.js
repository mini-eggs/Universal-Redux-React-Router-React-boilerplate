(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function () {
        return new Promise(function (resolve, reject) {
            resolve({ data: 'This is some async startup data we absolutely need' });
        });
    };
});
