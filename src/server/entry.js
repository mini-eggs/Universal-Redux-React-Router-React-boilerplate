"use strict";
exports.__esModule = true;
var Http = require("http");
var Path = require("path");
var Express = require("express");
var portfinder_1 = require("portfinder");
var Router = require("./router");
if (process.env.PORT) {
    process.env.NODE_ENV = 'production';
}
var app = Express();
var server = Http.createServer(app);
app.use('/scripts', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'scripts')));
app.use('/styles', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'styles')));
Router(app);
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
