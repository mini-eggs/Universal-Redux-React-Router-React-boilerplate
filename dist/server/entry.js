(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "http", "path", "express", "portfinder", "./router"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Http = require("http");
    var Path = require("path");
    var Express = require("express");
    var portfinder_1 = require("portfinder");
    var router_1 = require("./router");
    if (process.env.NODE_ENV === 'production') {
        process.env.PORT = 80;
    }
    var app = Express();
    var server = Http.createServer(app);
    app.all('*', function (req, res, next) {
        console.log(req.originalUrl);
        next();
    });
    app.use('/scripts', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'scripts')));
    app.use('/styles', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'styles')));
    router_1["default"](app);
    if (process.env.PORT) {
        server.listen(process.env.PORT);
    }
    else {
        var serverHasStarted = function (port) {
            console.log("==> \uD83C\uDF0E  Listening on port " + port + ". Open up http://localhost:" + port + "/ in your browser.");
        };
        var serverHasNotStarted = function (err) {
            console.log('Something went wrong while trying to start the server. Error below:');
            console.log(err);
        };
        var startServer = function (port) {
            return new Promise(function (resolve, reject) {
                server.listen(port, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(port);
                    }
                });
            });
        };
        portfinder_1.getPortPromise()
            .then(startServer)
            .then(serverHasStarted)["catch"](serverHasNotStarted);
    }
});
