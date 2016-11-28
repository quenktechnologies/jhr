'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utils
 */
var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'isObject',
        value: function isObject(obj) {
            return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
        }
    }, {
        key: 'isFile',
        value: function isFile(obj) {
            return toString.call(obj) === '[object File]';
        }
    }, {
        key: 'isFormData',
        value: function isFormData(obj) {
            return toString.call(obj) === '[object FormData]';
        }
    }, {
        key: 'isBlob',
        value: function isBlob(obj) {
            return toString.call(obj) === '[object Blob]';
        }
    }]);

    return Utils;
}();

exports.default = new Utils();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlscy5qcyJdLCJuYW1lcyI6WyJVdGlscyIsIm9iaiIsInRvU3RyaW5nIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxLOzs7Ozs7O2lDQUVPQyxHLEVBQUs7QUFDVixtQkFBTyxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBdEI7QUFDSDs7OytCQUVNQSxHLEVBQUs7QUFDUixtQkFBT0MsU0FBU0MsSUFBVCxDQUFjRixHQUFkLE1BQXVCLGVBQTlCO0FBQ0g7OzttQ0FFVUEsRyxFQUFLO0FBQ1osbUJBQU9DLFNBQVNDLElBQVQsQ0FBY0YsR0FBZCxNQUF1QixtQkFBOUI7QUFDSDs7OytCQUVNQSxHLEVBQUs7QUFDUixtQkFBT0MsU0FBU0MsSUFBVCxDQUFjRixHQUFkLE1BQXVCLGVBQTlCO0FBQ0g7Ozs7OztrQkFJVSxJQUFJRCxLQUFKLEUiLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFV0aWxzXG4gKi9cbmNsYXNzIFV0aWxzIHtcblxuICAgIGlzT2JqZWN0KG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gICAgfVxuXG4gICAgaXNGaWxlKG9iaikge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGaWxlXSc7XG4gICAgfVxuXG4gICAgaXNGb3JtRGF0YShvYmopIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgICB9XG5cbiAgICBpc0Jsb2Iob2JqKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEJsb2JdJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFV0aWxzKCk7XG4iXX0=