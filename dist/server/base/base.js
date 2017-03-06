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
    exports["default"] = "\n  <!DOCTYPE html>\n  <html lang=\"en\">\n    <head>\n      <meta charset=\"utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      <title>Boilerplate</title>\n      <link href=\"/styles/bundle.css\" rel=\"stylesheet\" />\n    </head>\n    <body>\n      <div id=\"root\">{{HTML}}</div>\n      <script>\n        window.__PRELOADED_STATE__ = {{STATE}}\n      </script>\n      <script defer src=\"/scripts/bundle.js\"></script>\n    </body>\n  </html>\n";
});
