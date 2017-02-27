function actions() {
  actions.prototype.report = function(Defaults, Data) {
    var resolve = Defaults.onComplete;
    var reject = Defaults.onFail;
    var connection = Defaults.connection;

    var report = {
      reports_rate: Data.id, //content id
      reports_user: Data.user, //user id
      reports_device: Data.device, //user device
      reports_type: Data.type //type of report (report, hide, block)
    };

    connection.query('INSERT INTO rr_reports SET ?', report, function(
      err,
      results
    ) {
      if (err) {
        resolve({
          status: -1,
          text: 'MySQL errors 321',
          error: err
        });
      } else {
        resolve({
          status: 1,
          text: (
            'Rate ' +
              Data.id +
              ' has been reported for user ' +
              Data.user +
              '. Type: ' +
              Data.type
          )
        });
      }
    });
  };
}

exports = module.exports = actions;
