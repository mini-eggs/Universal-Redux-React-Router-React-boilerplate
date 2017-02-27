var account = require('./account.js');

var actions = require('./actions.js');

var content = require('./content.js');

var methods = require('../methods/server.js');

var MySQL = methods.MySQL;

var Account = new account();

var Actions = new actions();

var Content = new content();

var conn = MySQL();

function API(url, urlStructure) {
  return new Promise(function(resolve, reject) {
    switch (urlStructure[1]) {
      case 'register':
        Account.register(
          { onComplete: resolve, onFail: reject, connection: conn },
          {
            device: url.query.device,
            username: url.query.username,
            email: url.query.email,
            password: url.query.password
          }
        );
        break;

      case 'logout':
        Account.logout(
          { onComplete: resolve, onFail: reject, connection: conn },
          { device: url.query.device, username: url.query.username }
        );
        break;

      case 'checkLogin':
        Account.checkLogin(
          { onComplete: resolve, onFail: reject, connection: conn },
          { device: url.query.device }
        );
        break;

      case 'login':
        Account.login(
          { onComplete: resolve, onFail: reject, connection: conn },
          {
            device: url.query.device,
            username: url.query.username,
            password: url.query.password
          }
        );
        break;

      case 'create':
        Content.create(
          { onComplete: resolve, onFail: reject, connection: conn },
          url.query
        );
        break;

      case 'delete':
        Content.delete(
          { onComplete: resolve, onFail: reject, connection: conn },
          url.query
        );
        break;

      case 'report':
        Actions.report(
          { onComplete: resolve, onFail: reject, connection: conn },
          url.query
        );
        break;

      case 'data':
        switch (url.query.type) {
          case 'recent':
            Content.recent(
              { onComplete: resolve, onFail: reject, connection: conn },
              url.query
            );
            break;
          case 'nearby':
            Content.nearby(
              { onComplete: resolve, onFail: reject, connection: conn },
              url.query
            );
            break;
          case 'yours':
            Content.yours(
              { onComplete: resolve, onFail: reject, connection: conn },
              url.query
            );
            break;
        }
        break;

      default:
        reject({ status: 0, text: 'no data' });
        break;
    }
  });
}

module.exports = API;
