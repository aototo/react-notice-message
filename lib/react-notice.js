'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var historyMessages = [];

var noticesMessages = [];

var containerDOM = null;

var containerElement = null;

var removeTime = null;

var ADD_MESSAGE = 'ADD_MESSAGE';

var REMOVE_MESSAGE = 'REMOVE_MESSAGE';

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));

    _this.state = {
      active: false
    };

    _this.removeMessage = _this.removeMessage.bind(_this);
    _this.publish = _this.publish.bind(_this);
    return _this;
  }

  _createClass(Item, [{
    key: 'removeMessage',
    value: function removeMessage() {
      this.publish(this.props.index);
    }
  }, {
    key: 'publish',
    value: function publish(index) {
      _pubsubJs2.default.publishSync(REMOVE_MESSAGE, {
        index: index
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ active: true });
      }, 1);

      if (removeTime) {
        setTimeout(function () {
          _this2.publish(_this2.props.index);
        }, removeTime);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var className = (0, _classnames2.default)("notice-box", {
        active: this.state.active
      });
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'a',
          { className: 'close', title: 'close', onClick: this.removeMessage },
          'x'
        ),
        this.props.content
      );
    }
  }]);

  return Item;
}(_react.Component);

var Notice = function (_Component2) {
  _inherits(Notice, _Component2);

  function Notice() {
    _classCallCheck(this, Notice);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Notice).apply(this, arguments));
  }

  _createClass(Notice, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
    //

  }, {
    key: 'render',
    value: function render() {

      var items = this.props.notices.map(function (msg, i) {
        if (msg == "") {
          return false;
        }
        return _react2.default.createElement(Item, _extends({ key: i, index: i, ref: i }, msg));
      });

      return _react2.default.createElement(
        'div',
        { className: 'notice-container' },
        items
      );
    }
  }]);

  return Notice;
}(_react.Component);

_pubsubJs2.default.subscribe(ADD_MESSAGE, function (topic, data) {
  noticesMessages = [].concat(_toConsumableArray(noticesMessages), [data]);

  renderNotice();
});

var remove_notice = _pubsubJs2.default.subscribe(REMOVE_MESSAGE, function (topic, data) {
  var index = data.index;


  if (!noticesMessages[index]) {
    return false;
  }

  var historyMessage = noticesMessages[index].content;
  historyMessages.push(historyMessage);
  noticesMessages.splice(index, 1, "");

  renderNotice();
});

Notice.getHistoryMessages = function () {

  console.log(historyMessages);
  return historyMessages;
};

Notice.show = function (content, param) {
  if (!containerDOM) {
    containerDOM = document.createElement('div');
    document.body.appendChild(containerDOM);
  }

  if (param.closeTime) {
    if (param.closeTime == "infinite") {
      removeTime = false;
    } else {
      removeTime = Number(param.closeTime) || 3000;
    }
  }

  _pubsubJs2.default.publishSync(ADD_MESSAGE, {
    content: content,
    closeTime: param.closeTime
  });

  return containerElement;
};

function renderNotice() {
  containerElement = _reactDom2.default.render(_react2.default.createElement(Notice, { notices: noticesMessages }), containerDOM);
}

module.exports = Notice;
//# sourceMappingURL=react-notice.js.map