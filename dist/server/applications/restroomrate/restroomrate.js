'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handle = require('./old/src/server/handle.js');

/**
 * WARNING
 * Very old code ahead
 */

exports.default = function (app, parser) {
  app.get('*', function (req, res, next) {
    var urlStruct = req.url.split('/');
    var url = [];
    for (var e = 0; e < urlStruct.length; e++) {
      if (urlStruct[e]) {
        url.push(urlStruct[e]);
      }
    }
    if (url[0] == 'api') {
      handle(req, url).then(function (data) {
        res.end(JSON.stringify(data));
      }).catch(function (err) {
        next();
      });
    } else {
      next();
    }
  });
};