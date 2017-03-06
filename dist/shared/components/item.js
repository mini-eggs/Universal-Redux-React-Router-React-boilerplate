'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _backgroundImageFadeIn = require('background-image-fade-in');

var _backgroundImageFadeIn2 = _interopRequireDefault(_backgroundImageFadeIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderItem = function renderItem(item) {
  return _react2.default.createElement(
    'article',
    { className: 'content__container' },
    _react2.default.createElement(
      'header',
      { className: 'item__header', 'data-src': item.image },
      _react2.default.createElement(
        'a',
        { className: 'header__inner', href: item.image },
        _react2.default.createElement(
          'h1',
          null,
          item.name
        )
      )
    ),
    _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: item.description } })
  );
};

var findItem = function findItem(items, find) {
  var foundItem = false;
  find = decodeURI(find);
  items.forEach(function (item) {
    if ('/' + item.slug === find || item.slug === find) {
      foundItem = item;
    }
  });
  return foundItem;
};

var propsToState = function propsToState(props) {
  return {
    item: findItem(props.items, props.location.pathname)
  };
};

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = propsToState(props);
    return _this;
  }

  _createClass(_class, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      // this fixes nasty updates
      // with the background fader
      this.setState({ item: false }, function () {
        _this2.setState(propsToState(props));
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.item) {
        this.props.router.push('/');
      } else {
        this.background();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.background();
    }
  }, {
    key: 'background',
    value: function background() {
      (0, _backgroundImageFadeIn2.default)('.item__header', 250);
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.state.item;

      return item ? renderItem(item) : _react2.default.createElement('span', null);
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;