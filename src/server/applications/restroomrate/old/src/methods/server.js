const MySQLCredentials = require('../creds/mysql.js');

const aesjs = require('aes-js');

const encryptionKey = require('../creds/encryption.js');

const mysql = require('mysql');

const connection = mysql.createConnection(MySQLCredentials);

/**
 *
 * @param name
 * @param url
 * @returns {*}
 */

const $_REQUEST = function(name, url) {
  return url.query[name];
};

/**
 *
 * @constructor
 */

const MySQL = function() {
  connection.connect();
  return connection;
};

/**
 *
 * @param text
 */

const encrypt = function(text) {
  var key = aesjs.util.convertStringToBytes(encryptionKey);
  var textBytes = aesjs.util.convertStringToBytes(text);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  return aesCtr.encrypt(textBytes);
};

exports = module.exports = {
  $_REQUEST: $_REQUEST,
  MySQL: MySQL,
  encrypt: encrypt
};
