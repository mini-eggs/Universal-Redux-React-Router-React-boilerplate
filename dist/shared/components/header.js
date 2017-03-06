'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classes = require('../utilities/classes/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrollHandler = new _classes.HandleScroll({
        scrollBreak: 200,
        element: 'header.transition__header'
      });
      var scrollEvent = new _classes.DomEvent({
        from: window,
        on: 'scroll',
        interval: 500,
        onFire: function onFire() {
          scrollHandler.onScroll();
        },
        onIntervalFire: function onIntervalFire() {
          scrollHandler.onScrollInterval();
        }
      });
      this.setState({
        scrollEvent: scrollEvent
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.scrollEvent.destroy();
    }
  }, {
    key: 'renderLink',
    value: function renderLink(link, index) {
      var linkAttr = link.href.indexOf('http') > -1 || link.href.indexOf('mailto:') > -1 ? { href: link.href } : { to: link.href };
      return _react2.default.createElement(
        'li',
        { key: index },
        _react2.default.createElement(
          _reactRouter.Link,
          _extends({}, linkAttr, { activeClassName: 'active' }),
          link.name
        )
      );
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader(attr) {
      return _react2.default.createElement(
        'header',
        attr,
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            this.props.links.map(this.renderLink)
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderHeader({}),
        this.renderHeader({ className: 'transition__header' })
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;