'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NoTransform lets the browser do everything.
 */
var NoTransform = function () {
    function NoTransform() {
        _classCallCheck(this, NoTransform);

        this.responseType = '';
    }

    _createClass(NoTransform, [{
        key: 'accepts',
        value: function accepts() {

            return null;
        }
    }, {
        key: 'contentType',
        value: function contentType() {

            return null;
        }
    }, {
        key: 'parseRequestBody',
        value: function parseRequestBody(body) {

            return body;
        }
    }, {
        key: 'parseResponseBody',
        value: function parseResponseBody(body) {

            return body;
        }
    }]);

    return NoTransform;
}();

exports.default = NoTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob1RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6WyJOb1RyYW5zZm9ybSIsInJlc3BvbnNlVHlwZSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxXO0FBRUYsMkJBQWM7QUFBQTs7QUFFVixhQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBRUg7Ozs7a0NBRVM7O0FBRU4sbUJBQU8sSUFBUDtBQUVIOzs7c0NBRWE7O0FBRVYsbUJBQU8sSUFBUDtBQUVIOzs7eUNBRWdCQyxJLEVBQU07O0FBRW5CLG1CQUFPQSxJQUFQO0FBRUg7OzswQ0FFaUJBLEksRUFBTTs7QUFFcEIsbUJBQU9BLElBQVA7QUFFSDs7Ozs7O2tCQUlVRixXIiwiZmlsZSI6Ik5vVHJhbnNmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG4vKipcbiAqIE5vVHJhbnNmb3JtIGxldHMgdGhlIGJyb3dzZXIgZG8gZXZlcnl0aGluZy5cbiAqL1xuY2xhc3MgTm9UcmFuc2Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSAnJztcblxuICAgIH1cblxuICAgIGFjY2VwdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICBjb250ZW50VHlwZSgpIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIHBhcnNlUmVxdWVzdEJvZHkoYm9keSkge1xuXG4gICAgICAgIHJldHVybiBib2R5O1xuXG4gICAgfVxuXG4gICAgcGFyc2VSZXNwb25zZUJvZHkoYm9keSkge1xuXG4gICAgICAgIHJldHVybiBib2R5O1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vVHJhbnNmb3JtO1xuIl19