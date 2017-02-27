// @flow

const handle = require('./old/src/server/handle.js');

/**
 * WARNING
 * Very old code ahead
 */

export default (app: Object, parser: Object) => {
  app.get('*', (req: Object, res: Object, next: Function) => {
    var urlStruct = req.url.split('/');
    var url = [];
    for (var e = 0; e < urlStruct.length; e++) {
      if (urlStruct[e]) {
        url.push(urlStruct[e]);
      }
    }
    if (url[0] == 'api') {
      handle(req, url)
        .then(data => {
          res.end(JSON.stringify(data));
        })
        .catch(err => {
          next();
        });
    } else {
      next();
    }
  });
};
