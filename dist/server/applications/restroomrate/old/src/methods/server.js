'use strict';

var MySQLCredentials = require('../creds/mysql.js');

var aesjs = require('aes-js');

var encryptionKey = require('../creds/encryption.js');

var mysql = require('mysql');

var connection = mysql.createConnection(MySQLCredentials);

/**
 *
 * @param name
 * @param url
 * @returns {*}
 */

var $_REQUEST = function $_REQUEST(name, url) {
  return url.query[name];
};

/**
 *
 * @constructor
 */

var MySQL = function MySQL() {
  connection.connect();
  return connection;
};

/**
 *
 * @param text
 */

var encrypt = function encrypt(text) {
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