'use strict';

function account() {
  var encryptionKey = require('../creds/encryption.js');

  var aesjs = require('aes-js');

  var methods = require('../methods/server.js');

  var encrypt = methods.encrypt;

  account.prototype.example = function (Defaults, Data) {
    //defaults every function should receive
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    //data specific to this function
    var device = Data.device;

    //example using mysql
    // connection.query('UPDATE reddit_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [true, device, username], function(err, results) {
    //     returnUser();
    // });

    resolve({
      status: 1,
      text: 'This is just a test. The device you are own is: ' + device
    });
  };

  account.prototype.register = function (Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var insert = {
      users_username: Data.username,
      users_email: Data.email,
      users_device: Data.device,
      users_password: JSON.stringify(encrypt(Data.password)),
      users_loggedin: true
    };

    // reset all logged in where device
    connection.query('UPDATE rr_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [false, Data.device, Data.username], function (err, results) {
      if (err) {
        resolve({ status: -1, text: 'MySQL errors 1', error: err });
      }
      //check if user already exists
      connection.query('SELECT * FROM rr_users WHERE users_username = ?', [Data.username], function (err, results) {
        if (err) {
          resolve({ status: -1, text: 'MySQL errors 2', error: err });
        }
        if (results.length > 0) {
          resolve({
            status: 0,
            text: 'User ' + Data.username + ' already exists in the database'
          });
        } else {
          //insert user
          connection.query('INSERT INTO rr_users SET ?', insert, function (err, result) {
            if (err) {
              resolve({ status: -1, text: 'MySQL errors 3', error: err });
            }
            connection.query('SELECT * FROM rr_users WHERE users_id = ?', [result.insertId], function (err, results) {
              if (err) {
                resolve({
                  status: -1,
                  text: 'MySQL errors 3',
                  error: err
                });
              }
              resolve({
                status: 1,
                text: 'User ' + Data.username + ' has been created',
                data: results[0]
              });
            });
          });
        }
      });
    });
  };

  account.prototype.login = function (Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    // reset all logged in where device
    connection.query('SELECT * FROM rr_users WHERE users_username = ? AND users_password = ?', [Data.username, JSON.stringify(encrypt(Data.password))], function (err, results) {
      if (err) {
        resolve({ status: -1, text: 'MySQL errors 1', error: err });
      }
      if (results.length > 1) {
        resolve({
          status: 0,
          text: 'More then one users found. Error.'
        });
      } else if (results.length == 1) {
        connection.query('UPDATE rr_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [true, Data.device, results[0].users_username], function (err, results2) {
          if (err) {
            resolve({ status: -1, text: 'MySQL errors 1', error: err });
          }
          connection.query('UPDATE rr_users SET users_device = ? WHERE users_username = ?', [Data.device, results[0].users_username], function (err, results3) {
            if (err) {
              resolve({ status: -1, text: 'MySQL errors 1', error: err });
            }
            resolve({
              status: 1,
              text: 'Logged in as: ' + Data.username,
              data: results[0]
            });
          });
        });
      } else {
        resolve({
          status: 0,
          text: Data.username + ' not found in the database'
        });
      }
    });
  };

  account.prototype.logout = function (Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    // reset all logged in where device
    connection.query('UPDATE rr_users SET users_loggedin = ? WHERE users_username = ?', [false, Data.username], function (err, results) {
      if (err) {
        resolve({ status: -1, text: 'MySQL errors 1', error: err });
      }
      resolve({
        status: 1,
        text: 'User ' + Data.username + ' has been logged out.',
        data: results
      });
    });
  };

  account.prototype.checkLogin = function (Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    connection.query('SELECT * FROM rr_users WHERE users_device = ? AND users_loggedin = ? ORDER BY users_time DESC LIMIT 1', [Data.device, true], function (err, results) {
      if (err) {
        resolve({ status: -1, text: 'MySQL errors 1', error: err });
      }
      if (results.length > 0) {
        resolve({
          status: 1,
          text: 'User ' + Data.username + ' has been logged in.',
          data: results[0]
        });
      } else {
        resolve({
          status: 0,
          text: 'User not found for this machine'
        });
      }
    });
  };
}

exports = module.exports = account;