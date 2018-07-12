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
                id: _this.state.list.length,
                result: _this.format(),
                myValue: 60000 * _this.state.times.minutes + 1000 * _this.state.times.seconds + 10 * _this.state.times.miliseconds
            };
            _this.setState({ list: [].concat(_toConsumableArray(_this.state.list), [newResult]), running: false });
        };

        _this.clearResults = function () {
            _this.setState({
                list: [],
                finalList: []
            });
        };

        _this.sortResults = function () {
            var myList = [].concat(_toConsumableArray(_this.state.list));
            var sortedList = myList.sort(function (a, b) {
                return a.myValue > b.myValue ? 1 : b.myValue > a.myValue ? -1 : 0;
            });
            _this.setState({
                finalList: sortedList
            });
        };

        _this.deleteResultWithId = function (id) {
            _this.setState({
                list: _this.state.list.filter(function (ele) {
                    return ele.id !== id;
                })
            });
        };

        _this.deleteSortedResultWithId = function (id) {
            _this.setState({
                finalList: _this.state.finalList.filter(function (ele) {
                    return ele.id !== id;
                })
            });
        };

        _this.render = function () {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(Controls, {
                        start: _this.start,
                        stop: _this.stop,
                        resettimer: _this.resettimer,
                        addResult: _this.addResult,
                        clearResults: _this.clearResults,
                        sortResults: _this.sortResults
                    }),
                    React.createElement(Display, {
                        time: _this.format(),
                        running: _this.state.running })
                ),
                React.createElement(
                    'div',
                    { className: 'results-common' },
                    React.createElement(Animation, {
                        running: _this.state.running }),
                    React.createElement(
                        'div',
                        { className: 'results-common_list' },
                        React.createElement(
                            'h1',
                            { className: 'table_results' },
                            'Results'
                        ),
                        React.createElement(Results, {
                            list: _this.state.list,
                            running: _this.state.running,
                            className: 'results', deleteResultWithId: _this.deleteResultWithId })
                    ),
                    React.createElement(
                        'div',
                        { className: 'results-common_list' },
                        React.createElement(
                            'h1',
                            { className: 'table_sorted-results' },
                            'Classification'
                        ),
                        React.createElement(SortedResults, {
                            finalList: _this.state.finalList,
                            running: _this.state.running,
                            className: 'sorted-results',
                            deleteSortedResultWithId: _this.deleteSortedResultWithId })
                    )
                )
            );
        };

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            list: [],
            finalList: []
        };
        return _this;
    }

    return Stopwatch;
}(React.Component);

Stopwatch.propTypes = {
    running: React.PropTypes.bool,
    times: React.PropTypes.number,
    list: React.PropTypes.array,
    finalList: React.PropTypes.array
};

var Controls = function (_React$Component2) {
    _inherits(Controls, _React$Component2);

    function Controls(props) {
        _classCallCheck(this, Controls);

        var _this2 = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));

        _this2.render = function () {
            return React.createElement(
                'nav',
                { className: 'controls' },
                React.createElement(
                    'h1',
                    { className: 'controls-title' },
                    'Stopwatch'
                ),
                React.createElement(
                    'div',
                    { className: 'controls_panel' },
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'start',
                            onClick: function onClick() {
                                return _this2.props.start();
                            } },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'stop',
                            onClick: function onClick() {
                                return _this2.props.stop();
                            } },
                        'Stop'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'controls_panel' },
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'reset',
                            onClick: function onClick() {
                                return _this2.props.resettimer();
                            } },
                        'Reset'
                    ),
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'save',
                            onClick: function onClick() {
                                return _this2.props.addResult();
                            } },
                        'Save'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'controls_panel' },
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'clear',
                            onClick: function onClick() {
                                return _this2.props.clearResults();
                            } },
                        'Remove'
                    ),
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            id: 'none',
                            onClick: function onClick() {
                                return _this2.props.sortResults();
                            } },
                        'Classify'
                    )
                )
            );
        };

        return _this2;
    }

    return Controls;
}(React.Component);

var Display = function (_React$Component3) {
    _inherits(Display, _React$Component3);

    function Display(props) {
        _classCallCheck(this, Display);

        var _this3 = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));

        _this3.render = function () {
            return React.createElement(
                'div',
                { className: 'stopwatch-common' },
                React.createElement('div', { className: 'decorative' }),
                React.createElement(
                    'div',
                    { className: 'stopwatch ' + (_this3.state.running === true ? 'on-run' : 'stopped') },
                    ' ',
                    _this3.props.time
                ),
                React.createElement('div', { className: 'decorative' })
            );
        };

        _this3.state = {
            running: false
        };
        return _this3;
    }

    return Display;
}(React.Component);

Display.propTypes = {
    time: React.PropTypes.string.isRequired,
    running: React.PropTypes.bool.isRequired
};

var Results = function (_React$Component4) {
    _inherits(Results, _React$Component4);

    function Results(props) {
        _classCallCheck(this, Results);

        var _this4 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

        _this4.state = {
            running: false,
            list: []
        };
        return _this4;
    }

    _createClass(Results, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            var myresults = this.props.list.map(function (ele) {
                return React.createElement(
                    'li',
                    { key: ele.id },
                    'Score: ',
                    React.createElement(
                        'span',
                        null,
                        ele.result
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', onClick: function onClick() {
                                return _this5.props.deleteResultWithId(ele.id);
                            } },
                        'x'
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
    list: React.PropTypes.array.isRequired,
    running: React.PropTypes.bool.isRequired
};

var SortedResults = function (_React$Component5) {
    _inherits(SortedResults, _React$Component5);

    function SortedResults(props) {
        _classCallCheck(this, SortedResults);

        var _this6 = _possibleConstructorReturn(this, (SortedResults.__proto__ || Object.getPrototypeOf(SortedResults)).call(this));

        _this6.state = {
            running: false,
            finalList: []
        };
        return _this6;
    }

    _createClass(SortedResults, [{
        key: 'render',
        value: function render() {
            var _this7 = this;

            var sortedResults = this.props.finalList.map(function (ele) {
                return React.createElement(
                    'li',
                    { key: ele.id },
                    'Mark: ',
                    React.createElement(
                        'span',
                        null,
                        ele.result
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', onClick: function onClick() {
                                return _this7.props.deleteSortedResultWithId(ele.id);
                            } },
                        'X'
                    )
                );
            });
            return React.createElement(
                'ul',
                { className: 'sorted-results' },
                sortedResults
            );
        }
    }]);

    return SortedResults;
}(React.Component);

SortedResults.propTypes = {
    finalList: React.PropTypes.array.isRequired,
    running: React.PropTypes.bool.isRequired
};

var Animation = function (_React$Component6) {
    _inherits(Animation, _React$Component6);

    function Animation(props) {
        _classCallCheck(this, Animation);

        var _this8 = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this));

        _this8.render = function () {
            return React.createElement(
                'div',
                { className: 'results-animation' },
                React.createElement('div', { className: 'results-animation_head' }),
                React.createElement(
                    'div',
                    { className: 'results-animation_body' },
                    React.createElement('div', { className: 'results-animation_left-arm' }),
                    React.createElement('div', { className: 'results-animation_torso' }),
                    React.createElement('div', { className: 'results-animation_right-arm' })
                ),
                React.createElement(
                    'div',
                    { className: 'results-animation_legs' },
                    React.createElement('div', { className: 'results-animation_left-leg' }),
                    React.createElement('div', { className: 'results-animation_right-leg' })
                )
            );
        };

        return _this8;
    }

    return Animation;
}(React.Component);

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
