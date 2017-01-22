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

            return;
        }
    }, {
        key: 'contentType',
        value: function contentType() {

            return;
        }
    }, {
        key: 'parseRequestBody',
        value: function parseRequestBody(body) {

            return body;
        }
    }, {
        key: 'parseResponseBody',
        value: function parseResponseBody() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


            return body;
        }
    }]);

    return NoTransform;
}();

exports.default = NoTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob1RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6WyJOb1RyYW5zZm9ybSIsInJlc3BvbnNlVHlwZSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxXO0FBRUYsMkJBQWM7QUFBQTs7QUFFVixhQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBRUg7Ozs7a0NBRVM7O0FBRU47QUFFSDs7O3NDQUVhOztBQUVWO0FBRUg7Ozt5Q0FFZ0JDLEksRUFBTTs7QUFFbkIsbUJBQU9BLElBQVA7QUFFSDs7OzRDQUUwQjtBQUFBLGdCQUFUQSxJQUFTLHVFQUFKLEVBQUk7OztBQUV2QixtQkFBT0EsSUFBUDtBQUVIOzs7Ozs7a0JBSVVGLFciLCJmaWxlIjoiTm9UcmFuc2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbi8qKlxuICogTm9UcmFuc2Zvcm0gbGV0cyB0aGUgYnJvd3NlciBkbyBldmVyeXRoaW5nLlxuICovXG5jbGFzcyBOb1RyYW5zZm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgYWNjZXB0cygpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICBjb250ZW50VHlwZSgpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICBwYXJzZVJlcXVlc3RCb2R5KGJvZHkpIHtcblxuICAgICAgICByZXR1cm4gYm9keTtcblxuICAgIH1cblxuICAgIHBhcnNlUmVzcG9uc2VCb2R5KGJvZHk9e30pIHtcblxuICAgICAgICByZXR1cm4gYm9keTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb1RyYW5zZm9ybTtcbiJdfQ==