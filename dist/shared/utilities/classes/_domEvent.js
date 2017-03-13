'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/observable/interval');

require('rxjs/add/operator/debounce');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomEvent = function () {
  function DomEvent(props) {
    _classCallCheck(this, DomEvent);

    this.onEvent = _Observable.Observable.fromEvent(props.from, props.on).subscribe(props.onFire);

    if (props.interval) {
      this.onEventInterval = _Observable.Observable.fromEvent(props.from, props.on).debounce(function () {
        return _Observable.Observable.interval(props.interval);
      }).subscribe(props.onIntervalFire);
    }
  }

  _createClass(DomEvent, [{
    key: 'destroy',
    value: function destroy() {
      if (this.onEvent) {
        this.onEvent.unsubscribe();
      }
      if (this.onEventInterval) {
        this.onEventInterval.unsubscribe();
      }
    }
  }]);

  return DomEvent;
}();

exports.default = DomEvent;