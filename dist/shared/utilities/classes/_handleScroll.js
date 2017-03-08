'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandleScroll = function () {
  function HandleScroll(props) {
    _classCallCheck(this, HandleScroll);

    if (typeof props.scrollBreak === 'undefined' || typeof props.scrollBreak === 'undefined') {
      throw new Error('Constructor parameters incorrect');
    }
    this.state = {
      scrollBreak: props.scrollBreak,
      element: props.element
    };
  }

  _createClass(HandleScroll, [{
    key: 'getElement',
    value: function getElement() {
      var elementRecieved = document.querySelector(this.state.element);
      return elementRecieved;
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (window.pageYOffset < this.state.scrollBreak) {
        var el = this.getElement();
        el.style.webkitTransform = 'translateY(-100%)';
        el.style.mozTransform = 'translateY(-100%)';
        el.style.msTransform = 'translateY(-100%)';
        el.style.oTransform = 'translateY(-100%)';
        el.style.transform = 'translateY(-100%)';
        setTimeout(function () {
          el.style.display = 'none';
        }, 500);
      }
    }
  }, {
    key: 'onScrollInterval',
    value: function onScrollInterval() {
      if (window.pageYOffset >= this.state.scrollBreak) {
        var el = this.getElement();
        el.style.display = 'initial';
        setTimeout(function () {
          el.style.webkitTransform = 'translateY(0)';
          el.style.mozTransform = 'translateY(0)';
          el.style.msTransform = 'translateY(0)';
          el.style.oTransform = 'translateY(0)';
          el.style.transform = 'translateY(0)';
        });
      }
    }
  }]);

  return HandleScroll;
}();

exports.default = HandleScroll;