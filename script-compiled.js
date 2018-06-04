'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.reset = function () {
      _this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    };

    _this.pad0 = function (value) {
      var result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    };

    _this.format = function () {
      var minutes = _this.state.times.minutes;
      var seconds = _this.state.times.seconds;
      var miliseconds = _this.state.times.miliseconds;

      return _this.pad0(minutes) + ':' + _this.pad0(seconds) + ':' + _this.pad0(Math.floor(miliseconds));
    };

    _this.start = function () {
      if (!_this.state.running) {
        _this.state.running = true;
        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    };

    _this.step = function () {
      if (!_this.state.running) return;
      _this.calculate();
    };

    _this.calculate = function () {
      _this.setState({
        times: {
          minutes: _this.state.times.minutes,
          seconds: _this.state.times.seconds,
          miliseconds: _this.state.times.miliseconds + 1
        }
      });

      if (_this.state.times.miliseconds >= 100) {
        _this.setState({
          times: {
            minutes: _this.state.times.minutes,
            seconds: _this.state.times.seconds + 1,
            miliseconds: 0
          }
        });
      }
      if (_this.state.times.seconds >= 60) {
        _this.setState({
          times: {
            minutes: _this.state.times.minutes + 1,
            seconds: 0,
            miliseconds: _this.state.times.miliseconds
          }
        });
      }
    };

    _this.stop = function () {
      _this.setState({
        running: false
      });
      clearInterval(_this.watch);
    };

    _this.resettimer = function () {
      _this.stop();
      _this.reset();
    };

    _this.addResult = function () {
      var newResult = {
        id: 60000 * _this.state.times.minutes + 1000 * _this.state.times.seconds + 10 * _this.state.times.miliseconds,
        result: _this.format(),
        myValue: 60000 * _this.state.times.minutes + 1000 * _this.state.times.seconds + 10 * _this.state.times.miliseconds
      };
      _this.setState({ list: [].concat(_toConsumableArray(_this.state.list), [newResult]) });
      _this.sortResults();
    };

    _this.clearResults = function () {
      _this.setState({
        list: []
      });
    };

    _this.sortResults = function () {
      var newResult = {
        id: _this.state.list.length,
        result: _this.format(),
        myValue: 60000 * _this.state.times.minutes + 1000 * _this.state.times.seconds + 10 * _this.state.times.miliseconds
      };
      var list = [].concat(_toConsumableArray(_this.state.list), [newResult]);
      var finalList = list.sort(function (a, b) {
        return a.myValue > b.myValue ? 1 : b.myValue > a.myValue ? -1 : 0;
      });
      _this.setState({
        list: finalList
      });
    };

    _this.render = function () {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'nav',
            { className: 'controls' },
            React.createElement(
              'div',
              { className: 'controls_panel' },
              React.createElement(
                'a',
                { href: '#', className: 'button', id: 'start', onClick: function onClick() {
                    return _this.start();
                  } },
                'Start'
              ),
              React.createElement(
                'a',
                { href: '#', className: 'button', id: 'stop', onClick: function onClick() {
                    return _this.stop();
                  } },
                'Stop'
              ),
              React.createElement(
                'a',
                { href: '#', className: 'button', id: 'reset', onClick: function onClick() {
                    return _this.resettimer();
                  } },
                'Reset'
              ),
              React.createElement(
                'a',
                { href: '#', className: 'button', id: 'save', onClick: function onClick() {
                    return _this.addResult();
                  } },
                'Save'
              ),
              React.createElement(
                'a',
                { href: '#', className: 'button', id: 'clear', onClick: function onClick() {
                    return _this.clearResults();
                  } },
                'Clear'
              )
            )
          ),
          React.createElement(Display, { time: _this.format() })
        ),
        React.createElement(
          'h1',
          { className: 'table_results' },
          'Table of results'
        ),
        React.createElement(Results, { list: _this.state.list, className: 'results' })
      );
    };

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      list: []
      //newList: []
    };
    return _this;
  }

  return Stopwatch;
}(React.Component);

var Display = function (_React$Component2) {
  _inherits(Display, _React$Component2);

  function Display(props) {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
  }

  _createClass(Display, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'stopwatch' },
        ' ',
        this.props.time
      );
    }
  }]);

  return Display;
}(React.Component);

Display.propTypes = {
  time: React.PropTypes.string.isRequired
};

var Results = function (_React$Component3) {
  _inherits(Results, _React$Component3);

  function Results(props) {
    _classCallCheck(this, Results);

    var _this3 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

    _this3.deleteResultWithId = function (id) {
      _this3.setState({
        list: _this3.state.list.filter(function (ele) {
          return ele.id !== id;
        })
      });
    };

    _this3.state = {
      running: false,
      list: []
    };
    return _this3;
  }

  _createClass(Results, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var myresults = this.props.list.map(function (ele) {
        return React.createElement(
          'li',
          { key: ele.id },
          'Result: ',
          React.createElement(
            'span',
            null,
            ele.result
          ),
          React.createElement(
            'button',
            { className: 'button', onClick: function onClick() {
                return _this4.deleteResultWithId();
              } },
            'Delete'
          )
        );
      });
      return React.createElement(
        'ul',
        { className: 'results' },
        myresults
      );
    }
  }]);

  return Results;
}(React.Component);

Results.propTypes = {
  list: React.PropTypes.array.isRequired
};


var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
