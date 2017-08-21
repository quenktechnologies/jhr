"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NullVariable does nothing ... really.
 * @implements {Variable}
 */
var NullVariable = function () {
    function NullVariable() {
        _classCallCheck(this, NullVariable);
    }

    _createClass(NullVariable, [{
        key: "boolean",
        value: function boolean() {

            return this;
        }
    }, {
        key: "number",
        value: function number() {

            return this;
        }
    }, {
        key: "string",
        value: function string() {

            return this;
        }
    }, {
        key: "primitive",
        value: function primitive() {

            return this;
        }
    }, {
        key: "array",
        value: function array() {

            return this;
        }
    }, {
        key: "date",
        value: function date() {

            return this;
        }
    }, {
        key: "regexp",
        value: function regexp() {

            return this;
        }
    }, {
        key: "function",
        value: function _function() {

            return this;
        }
    }, {
        key: "object",
        value: function object(value, name) {

            return this;
        }
    }, {
        key: "instance",
        value: function instance(cons) {

            return this;
        }
    }, {
        key: "interface",
        value: function _interface(Iface) {

            return this;
        }
    }, {
        key: "default",
        value: function _default(value) {

            return this;
        }
    }, {
        key: "optional",
        value: function optional(value) {

            return this;
        }
    }, {
        key: "required",
        value: function required() {

            return this;
        }
    }]);

    return NullVariable;
}();

exports.default = NullVariable;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdWxsVmFyaWFibGUuanMiXSwibmFtZXMiOlsiTnVsbFZhcmlhYmxlIiwidmFsdWUiLCJuYW1lIiwiY29ucyIsIklmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsWTs7Ozs7OztrQ0FFUTs7QUFFTixtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUTs7QUFFTCxtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUTs7QUFFTCxtQkFBTyxJQUFQO0FBRUg7OztvQ0FFUzs7QUFFVixtQkFBTyxJQUFQO0FBRUQ7OztnQ0FFUzs7QUFFSixtQkFBTyxJQUFQO0FBRUg7OzsrQkFFTTs7QUFFSCxtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUTs7QUFFTCxtQkFBTyxJQUFQO0FBRUg7OztvQ0FFVTs7QUFFUCxtQkFBTyxJQUFQO0FBRUg7OzsrQkFFTUMsSyxFQUFPQyxJLEVBQU07O0FBRWhCLG1CQUFPLElBQVA7QUFFSDs7O2lDQUVRQyxJLEVBQU07O0FBRVgsbUJBQU8sSUFBUDtBQUVIOzs7bUNBRVNDLEssRUFBTzs7QUFFYixtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUUgsSyxFQUFPOztBQUVaLG1CQUFPLElBQVA7QUFFSDs7O2lDQUVRQSxLLEVBQU87O0FBRVosbUJBQU8sSUFBUDtBQUVIOzs7bUNBRVE7O0FBRVQsbUJBQU8sSUFBUDtBQUVEOzs7Ozs7a0JBS1lELFkiLCJmaWxlIjoiTnVsbFZhcmlhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOdWxsVmFyaWFibGUgZG9lcyBub3RoaW5nIC4uLiByZWFsbHkuXG4gKiBAaW1wbGVtZW50cyB7VmFyaWFibGV9XG4gKi9cbmNsYXNzIE51bGxWYXJpYWJsZSB7XG5cbiAgICBib29sZWFuKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgc3RyaW5nKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gIHByaW1pdGl2ZSgpIHtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxuICAgIGFycmF5KCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZGF0ZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHJlZ2V4cCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgb2JqZWN0KHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBpbnN0YW5jZShjb25zKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBpbnRlcmZhY2UoSWZhY2UpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGRlZmF1bHQgKHZhbHVlKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBvcHRpb25hbCh2YWx1ZSkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gIHJlcXVpcmVkKCkge1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVsbFZhcmlhYmxlXG4iXX0=