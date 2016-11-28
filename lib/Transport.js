'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserCookies = require('browser-cookies');

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _buildUrl = require('./buildUrl');

var _buildUrl2 = _interopRequireDefault(_buildUrl);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _ClientError = require('./ClientError');

var _ClientError2 = _interopRequireDefault(_ClientError);

var _ServerError = require('./ServerError');

var _ServerError2 = _interopRequireDefault(_ServerError);

var _TransportError = require('./TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * XHRTransport
 * @param {Transform} transformer
 * @param {Object} config
 */
var XHRTransport = function () {
    function XHRTransport(transformer, config) {
        _classCallCheck(this, XHRTransport);

        this.transformer = transformer;
        this.config = config || {};
        this.headers = Object.create(null);
    }

    _createClass(XHRTransport, [{
        key: 'setHeader',
        value: function setHeader(key, value) {
            this.headers[key] = value;
            return this;
        }
    }, {
        key: 'send',
        value: function send(req) {

            var xhr = new XMLHttpRequest();
            var transformer = this.transformer;
            var headers = this.headers;
            var config = this.config;
            var method = req.method || 'get';
            var url = req.url;
            var body = req.body;
            var params = req.params;
            var adapter = req.adapter;
            debugger;
            params = params ? adapter ? adapter(params) : params : null;

            if (['get', 'head'].indexOf(method.toLowerCase()) > -1) if (params) url = (0, _buildUrl2.default)(url, params);

            if (body) body = transformer.transformRequestBody(body);

            headers['Content-Type'] = transformer.CONTENT_TYPE_HEADER || 'application/json;charset=utf-8';
            headers['Accept'] = transformer.ACCEPT_HEADER || 'application/json, text/plain, */*';

            this.headers['x-xsrf-token'] = _browserCookies2.default.get(config.xsrfCookieName || 'xsrf_token');

            return new _bluebird2.default(function (resolve, reject) {

                xhr.onload = function () {

                    //xhr.responseType = transformer.responseType;

                    if (xhr.status > 499) return reject(new _ServerError2.default(_Response2.default.create(xhr, transformer)));

                    if (xhr.status > 399) return reject(new _ClientError2.default(_Response2.default.create(xhr, transformer)));

                    resolve(_Response2.default.create(xhr, transformer));
                };

                xhr.open(method, url, true);

                for (var key in headers) {
                    if (headers[key]) xhr.setRequestHeader(key, headers[key]);
                }xhr.onerror = function () {
                    return reject(new _TransportError2.default(_Response2.default.create(xhr, transformer)));
                };
                xhr.onabort = function () {
                    return reject(new _TransportError2.default(_Response2.default.create(xhr, transformer)));
                };

                xhr.send(body);
            });
        }
    }]);

    return XHRTransport;
}();

exports.default = XHRTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc3BvcnQuanMiXSwibmFtZXMiOlsiWEhSVHJhbnNwb3J0IiwidHJhbnNmb3JtZXIiLCJjb25maWciLCJoZWFkZXJzIiwiT2JqZWN0IiwiY3JlYXRlIiwia2V5IiwidmFsdWUiLCJyZXEiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm1ldGhvZCIsInVybCIsImJvZHkiLCJwYXJhbXMiLCJhZGFwdGVyIiwiaW5kZXhPZiIsInRvTG93ZXJDYXNlIiwidHJhbnNmb3JtUmVxdWVzdEJvZHkiLCJDT05URU5UX1RZUEVfSEVBREVSIiwiQUNDRVBUX0hFQURFUiIsImdldCIsInhzcmZDb29raWVOYW1lIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ubG9hZCIsInN0YXR1cyIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25lcnJvciIsIm9uYWJvcnQiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLFk7QUFHRiwwQkFBWUMsV0FBWixFQUF5QkMsTUFBekIsRUFBaUM7QUFBQTs7QUFDN0IsYUFBS0QsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLFVBQVUsRUFBeEI7QUFDQSxhQUFLQyxPQUFMLEdBQWVDLE9BQU9DLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDSDs7OztrQ0FFU0MsRyxFQUFLQyxLLEVBQU87QUFDbEIsaUJBQUtKLE9BQUwsQ0FBYUcsR0FBYixJQUFvQkMsS0FBcEI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7Ozs2QkFFSUMsRyxFQUFLOztBQUVOLGdCQUFJQyxNQUFNLElBQUlDLGNBQUosRUFBVjtBQUNBLGdCQUFJVCxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsZ0JBQUlFLFVBQVUsS0FBS0EsT0FBbkI7QUFDQSxnQkFBSUQsU0FBUyxLQUFLQSxNQUFsQjtBQUNBLGdCQUFJUyxTQUFTSCxJQUFJRyxNQUFKLElBQWMsS0FBM0I7QUFDQSxnQkFBSUMsTUFBTUosSUFBSUksR0FBZDtBQUNBLGdCQUFJQyxPQUFPTCxJQUFJSyxJQUFmO0FBQ0EsZ0JBQUlDLFNBQVNOLElBQUlNLE1BQWpCO0FBQ0EsZ0JBQUlDLFVBQVVQLElBQUlPLE9BQWxCO0FBQ0E7QUFDQUQscUJBQVVBLE1BQUQsR0FBWUMsT0FBRCxHQUFZQSxRQUFRRCxNQUFSLENBQVosR0FBOEJBLE1BQXpDLEdBQWtELElBQTNEOztBQUVBLGdCQUFJLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0JFLE9BQWhCLENBQXdCTCxPQUFPTSxXQUFQLEVBQXhCLElBQWdELENBQUMsQ0FBckQsRUFDSSxJQUFJSCxNQUFKLEVBQ0lGLE1BQU0sd0JBQVNBLEdBQVQsRUFBY0UsTUFBZCxDQUFOOztBQUVSLGdCQUFJRCxJQUFKLEVBQ0lBLE9BQU9aLFlBQVlpQixvQkFBWixDQUFpQ0wsSUFBakMsQ0FBUDs7QUFFSlYsb0JBQVEsY0FBUixJQUEwQkYsWUFBWWtCLG1CQUFaLElBQW1DLGdDQUE3RDtBQUNBaEIsb0JBQVEsUUFBUixJQUFvQkYsWUFBWW1CLGFBQVosSUFBNkIsbUNBQWpEOztBQUVBLGlCQUFLakIsT0FBTCxDQUFhLGNBQWIsSUFBK0IseUJBQVFrQixHQUFSLENBQVluQixPQUFPb0IsY0FBUCxJQUF5QixZQUFyQyxDQUEvQjs7QUFFQSxtQkFBTyx1QkFBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjs7QUFFekNmLG9CQUFJZ0IsTUFBSixHQUFhLFlBQVc7O0FBRXBCOztBQUVBLHdCQUFJaEIsSUFBSWlCLE1BQUosR0FBYSxHQUFqQixFQUNJLE9BQU9GLE9BQU8sMEJBQWdCLG1CQUFTbkIsTUFBVCxDQUFnQkksR0FBaEIsRUFBcUJSLFdBQXJCLENBQWhCLENBQVAsQ0FBUDs7QUFFSix3QkFBSVEsSUFBSWlCLE1BQUosR0FBYSxHQUFqQixFQUNJLE9BQU9GLE9BQU8sMEJBQWdCLG1CQUFTbkIsTUFBVCxDQUFnQkksR0FBaEIsRUFBcUJSLFdBQXJCLENBQWhCLENBQVAsQ0FBUDs7QUFFSnNCLDRCQUFRLG1CQUFTbEIsTUFBVCxDQUFnQkksR0FBaEIsRUFBcUJSLFdBQXJCLENBQVI7QUFFSCxpQkFaRDs7QUFjQVEsb0JBQUlrQixJQUFKLENBQVNoQixNQUFULEVBQWlCQyxHQUFqQixFQUFzQixJQUF0Qjs7QUFFQSxxQkFBSyxJQUFJTixHQUFULElBQWdCSCxPQUFoQjtBQUNJLHdCQUFJQSxRQUFRRyxHQUFSLENBQUosRUFDSUcsSUFBSW1CLGdCQUFKLENBQXFCdEIsR0FBckIsRUFBMEJILFFBQVFHLEdBQVIsQ0FBMUI7QUFGUixpQkFJQUcsSUFBSW9CLE9BQUosR0FBYztBQUFBLDJCQUFNTCxPQUFPLDZCQUFtQixtQkFBU25CLE1BQVQsQ0FBZ0JJLEdBQWhCLEVBQXFCUixXQUFyQixDQUFuQixDQUFQLENBQU47QUFBQSxpQkFBZDtBQUNBUSxvQkFBSXFCLE9BQUosR0FBYztBQUFBLDJCQUFNTixPQUFPLDZCQUFtQixtQkFBU25CLE1BQVQsQ0FBZ0JJLEdBQWhCLEVBQXFCUixXQUFyQixDQUFuQixDQUFQLENBQU47QUFBQSxpQkFBZDs7QUFFQVEsb0JBQUlzQixJQUFKLENBQVNsQixJQUFUO0FBRUgsYUEzQk0sQ0FBUDtBQThCSDs7Ozs7O2tCQUtVYixZIiwiZmlsZSI6IlRyYW5zcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVzIGZyb20gJ2Jyb3dzZXItY29va2llcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgYnVpbGRVcmwgZnJvbSAnLi9idWlsZFVybCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgQ2xpZW50RXJyb3IgZnJvbSAnLi9DbGllbnRFcnJvcic7XG5pbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnLi9TZXJ2ZXJFcnJvcic7XG5pbXBvcnQgVHJhbnNwb3J0RXJyb3IgZnJvbSAnLi9UcmFuc3BvcnRFcnJvcic7XG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XG5cbi8qKlxuICogWEhSVHJhbnNwb3J0XG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gdHJhbnNmb3JtZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAqL1xuY2xhc3MgWEhSVHJhbnNwb3J0IHtcblxuXG4gICAgY29uc3RydWN0b3IodHJhbnNmb3JtZXIsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXI7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNlbmQocmVxKSB7XG5cbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdHJhbnNmb3JtZXIgPSB0aGlzLnRyYW5zZm9ybWVyO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHRoaXMuaGVhZGVycztcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnZ2V0JztcbiAgICAgICAgdmFyIHVybCA9IHJlcS51cmw7XG4gICAgICAgIHZhciBib2R5ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXJhbXMgPSByZXEucGFyYW1zO1xuICAgICAgICB2YXIgYWRhcHRlciA9IHJlcS5hZGFwdGVyO1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgcGFyYW1zID0gKHBhcmFtcykgPyAoYWRhcHRlcikgPyBhZGFwdGVyKHBhcmFtcykgOiBwYXJhbXMgOiBudWxsO1xuXG4gICAgICAgIGlmIChbJ2dldCcsICdoZWFkJ10uaW5kZXhPZihtZXRob2QudG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgIGlmIChwYXJhbXMpXG4gICAgICAgICAgICAgICAgdXJsID0gYnVpbGRVcmwodXJsLCBwYXJhbXMpO1xuXG4gICAgICAgIGlmIChib2R5KVxuICAgICAgICAgICAgYm9keSA9IHRyYW5zZm9ybWVyLnRyYW5zZm9ybVJlcXVlc3RCb2R5KGJvZHkpO1xuXG4gICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdHJhbnNmb3JtZXIuQ09OVEVOVF9UWVBFX0hFQURFUiB8fCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JztcbiAgICAgICAgaGVhZGVyc1snQWNjZXB0J10gPSB0cmFuc2Zvcm1lci5BQ0NFUFRfSEVBREVSIHx8ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyc1sneC14c3JmLXRva2VuJ10gPSBjb29raWVzLmdldChjb25maWcueHNyZkNvb2tpZU5hbWUgfHwgJ3hzcmZfdG9rZW4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIC8veGhyLnJlc3BvbnNlVHlwZSA9IHRyYW5zZm9ybWVyLnJlc3BvbnNlVHlwZTtcblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID4gNDk5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBTZXJ2ZXJFcnJvcihSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpKTtcblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID4gMzk5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBDbGllbnRFcnJvcihSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gaGVhZGVycylcbiAgICAgICAgICAgICAgICBpZiAoaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpKTtcbiAgICAgICAgICAgIHhoci5vbmFib3J0ID0gKCkgPT4gcmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpKTtcblxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUlRyYW5zcG9ydDtcbiJdfQ==