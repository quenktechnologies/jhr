'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseHeaders = require('parse-headers');

var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Headers
 */
var Headers = function () {
    function Headers() {
        _classCallCheck(this, Headers);

        this.CONTENT_TYPE = 'Content-Type';
        this.ACCEPTS = 'Accept';
    }

    /**
     * parse a string of headers into an object.
     * @param {string} str
     * returns {object}
     */


    _createClass(Headers, [{
        key: 'parse',
        value: function parse(str) {

            return (0, _parseHeaders2.default)(str) || {};
        }

        /**
         * set headers on an XMLHttpRequest object.
         * @param {XMLHttpRequest} xhr
         * @param {object} ..headers
         */

    }, {
        key: 'set',
        value: function set(xhr) {
            var _arguments = arguments;


            var i = arguments.length;

            while (i--) {
                if (i !== 0) Object.keys(arguments[i]).forEach(function (k) {

                    if (_arguments[i][k] != null) xhr.setRequestHeader(k, _arguments[i][k]);
                });
            }
        }
    }]);

    return Headers;
}();

exports.default = new Headers();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IZWFkZXJzLmpzIl0sIm5hbWVzIjpbIkhlYWRlcnMiLCJDT05URU5UX1RZUEUiLCJBQ0NFUFRTIiwic3RyIiwieGhyIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiayIsInNldFJlcXVlc3RIZWFkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxPO0FBRUYsdUJBQWM7QUFBQTs7QUFFVixhQUFLQyxZQUFMLEdBQW9CLGNBQXBCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLFFBQWY7QUFFSDs7QUFFRDs7Ozs7Ozs7OzhCQUtNQyxHLEVBQUs7O0FBRVAsbUJBQU8sNEJBQWFBLEdBQWIsS0FBcUIsRUFBNUI7QUFFSDs7QUFFRDs7Ozs7Ozs7NEJBS0lDLEcsRUFBSztBQUFBOzs7QUFFTCxnQkFBSUMsSUFBSUMsVUFBVUMsTUFBbEI7O0FBRUEsbUJBQU9GLEdBQVA7QUFDSSxvQkFBSUEsTUFBTSxDQUFWLEVBQ0lHLE9BQU9DLElBQVAsQ0FBWUgsVUFBVUQsQ0FBVixDQUFaLEVBQTBCSyxPQUExQixDQUFrQyxhQUFLOztBQUVuQyx3QkFBSSxXQUFVTCxDQUFWLEVBQWFNLENBQWIsS0FBbUIsSUFBdkIsRUFDSVAsSUFBSVEsZ0JBQUosQ0FBcUJELENBQXJCLEVBQXdCLFdBQVVOLENBQVYsRUFBYU0sQ0FBYixDQUF4QjtBQUVQLGlCQUxEO0FBRlI7QUFTSDs7Ozs7O2tCQUlVLElBQUlYLE9BQUosRSIsImZpbGUiOiJIZWFkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICdwYXJzZS1oZWFkZXJzJztcblxuLyoqXG4gKiBIZWFkZXJzXG4gKi9cbmNsYXNzIEhlYWRlcnMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5DT05URU5UX1RZUEUgPSAnQ29udGVudC1UeXBlJztcbiAgICAgICAgdGhpcy5BQ0NFUFRTID0gJ0FjY2VwdCc7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXJzZSBhIHN0cmluZyBvZiBoZWFkZXJzIGludG8gYW4gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAgICAgKiByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgcGFyc2Uoc3RyKSB7XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlSGVhZGVycyhzdHIpIHx8IHt9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IGhlYWRlcnMgb24gYW4gWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7WE1MSHR0cFJlcXVlc3R9IHhoclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAuLmhlYWRlcnNcbiAgICAgKi9cbiAgICBzZXQoeGhyKSB7XG5cbiAgICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICBpZiAoaSAhPT0gMClcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhhcmd1bWVudHNbaV0pLmZvckVhY2goayA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXVtrXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaywgYXJndW1lbnRzW2ldW2tdKVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEhlYWRlcnMoKVxuIl19