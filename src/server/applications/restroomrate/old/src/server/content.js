function content() {
  const encryptionKey = require('../creds/encryption.js');

  const aesjs = require('aes-js');

  var methods = require('../methods/server.js');

  var encrypt = methods.encrypt;

  content.prototype.filter = function(connection, params) {
    return new Promise(function(resolve, reject) {
      var query;
      var queryData;

      if (parseInt(params.users_id) < 0) {
        query = 'SELECT * FROM rr_reports WHERE reports_user = ? AND reports_device = ? AND reports_type = ? GROUP BY reports_rate';
        queryData = [params.users_id, params.device, 'hide'];
      } else {
        query = 'SELECT * FROM rr_reports WHERE reports_user = ? AND reports_type = ? GROUP BY reports_rate';
        queryData = [params.users_id, 'hide'];
      }

      connection.query(query, queryData, function(err, results) {
        if (err) {
          reject({ status: -1, text: 'MySQL errors 92', error: err });
        }

        var reportedIds = [-1];
        for (var e = 0; e < results.length; e++) {
          var aRow = results[e];
          reportedIds.push(aRow['reports_rate']);
        }

        if (parseInt(params.users_id) < 0) {
          query = 'SELECT rate_user as blocked_user FROM rr_reports JOIN rr_rate ON reports_rate = rate_id WHERE reports_user = ? AND reports_device = ? AND reports_type = ?';
          queryData = [-1, params.device, 'block'];
        } else {
          query = 'SELECT rate_user as blocked_user FROM rr_reports JOIN rr_rate ON reports_rate = rate_id WHERE reports_user = ? AND reports_type = ?';
          queryData = [params.users_id, 'block'];
        }

        connection.query(query, queryData, function(err, results) {
          if (err) {
            reject({ status: -1, text: 'MySQL errors 92', error: err });
          }

          var reportedUsers = [-1];
          for (var i = 0; i < results.length; i++) {
            var aRow = results[i];
            reportedUsers.push(aRow['blocked_user']);
          }

          resolve({ reportedIds: reportedIds, reportedUsers: reportedUsers });
        });
      });
    });
  };

  content.prototype.create = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var rate = {
      rate_name: Data.name,
      rate_desc: Data.desc,
      rate_rate: Data.rate,
      rate_file: Data.file,
      rate_lat: Data.lat,
      rate_long: Data.long,
      rate_location: Data.location,
      rate_user: Data.users_id
    };

    connection.query('INSERT INTO rr_rate SET ?', rate, function(err, results) {
      if (err) {
        resolve({ status: -1, text: 'MySQL errors 1', error: err });
      }
      resolve({
        status: 1,
        text: 'Rate has been created',
        data: results[0]
      });
    });
  };

  content.prototype.recent = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var params = {
      type: Data.type,
      users_id: Data.users_id,
      page: Data.page,
      length: Data.length,
      device: Data.device
    };

    var limit = parseInt(params.length);
    var offset = parseInt(params.length * params.page);

    this
      .filter(connection, params)
      .then(function(filter) {
        connection.query(
          'SELECT * FROM rr_rate WHERE rate_id NOT IN (?) AND rate_user NOT IN (?) ORDER BY rate_time DESC LIMIT ? OFFSET ?',
          [filter.reportedIds, filter.reportedUsers, limit, offset],
          function(err, results) {
            if (err) {
              resolve({ status: -1, text: 'MySQL errors 9', error: err });
            }
            resolve({
              status: 1,
              text: 'Recent has been queried from database',
              data: results
            });
          }
        );
      })
      .catch(function(err) {
        resolve({ status: -1, text: 'MySQL filter errors', error: err });
      });
  };

  content.prototype.yours = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var params = {
      type: Data.type,
      users_id: Data.users_id,
      page: Data.page,
      length: Data.length
    };

    var limit = parseInt(params.length);
    var offset = parseInt(params.length * params.page);

    connection.query(
      'SELECT * FROM `rr_rate` WHERE `rate_user` = ? ORDER BY `rr_rate`.`rate_time` DESC LIMIT ? OFFSET ?',
      [params.users_id, limit, offset],
      function(err, results) {
        if (err) {
          resolve({ status: -1, text: 'MySQL errors 1', error: err });
        }
        resolve({
          status: 1,
          text: 'Yours has been queried from database',
          data: results
        });
      }
    );
  };

  content.prototype.nearby = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var params = {
      type: Data.type,
      users_id: Data.users_id,
      page: Data.page,
      long: Data.long,
      lat: Data.lat,
      length: Data.length
    };

    var limit = parseInt(params.length);
    var offset = parseInt(params.length * params.page);

    this
      .filter(connection, params)
      .then(function(filter) {
        connection.query(
          `SELECT *,
              SQRT(POW(69.1 * (rate_lat - ?), 2) + POW(69.1 * (? - rate_long) * COS(rate_lat / 57.3), 2)) AS distance
              FROM rr_rate WHERE rate_id NOT IN (?) AND rate_user NOT IN (?) ORDER BY distance LIMIT ? OFFSET ?`,
          [
            params.lat,
            params.long,
            filter.reportedIds,
            filter.reportedUsers,
            limit,
            offset
          ],
          function(err, results) {
            if (err) {
              resolve({ status: -1, text: 'MySQL errors 1', error: err });
            }
            resolve({
              status: 1,
              text: 'Nearby has been queried from database',
              data: results
            });
          }
        );
      })
      .catch(function(err) {
        resolve({ status: -1, text: 'MySQL filter errors', error: err });
      });
  };

  content.prototype.delete = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var params = {
      rate_id: Data.rate_id,
      users_id: Data.users_id
    };

    connection.query(
      `DELETE FROM rr_rate WHERE rate_id = ? && rate_user = ? `,
      [params.rate_id, params.users_id],
      function(err, result) {
        if (err) {
          resolve({ status: -1, text: 'MySQL errors 44', error: err });
        }
        resolve({
          status: 1,
          text: 'Rate has been deleted',
          data: result
        });
      }
    );
  };
}

exports = module.exports = content;
