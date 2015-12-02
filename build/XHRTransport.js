'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

/**
 * XHRTransport
 * @param {Transform} transformer
 * @param {Object} config
 */

var XHRTransport = (function () {
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

            params = params ? adapter ? adapter(params) : params : null;

            if (['get', 'head'].indexOf(method.toLowerCase()) > -1) if (params) url = (0, _buildUrl2['default'])(url, params);

            if (body) body = transformer.transformRequestBody(body);

            headers['Content-Type'] = transformer.CONTENT_TYPE_HEADER || 'application/json;charset=utf-8';
            headers['Accept'] = transformer.ACCEPT_HEADER || 'application/json, text/plain, */*';

            this.headers['x-xsrf-token'] = _browserCookies2['default'].get(config.xsrfCookieName || 'xsrf_token');

            return new _bluebird2['default'](function (resolve, reject) {

                xhr.onload = function () {

                    //xhr.responseType = transformer.responseType;

                    if (xhr.status > 499) return reject(new _ServerError2['default'](_Response2['default'].create(xhr, transformer)));

                    if (xhr.status > 399) return reject(new _ClientError2['default'](_Response2['default'].create(xhr, transformer)));

                    resolve(_Response2['default'].create(xhr, transformer));
                };

                xhr.open(method, url, true);

                for (var key in headers) if (headers[key]) xhr.setRequestHeader(key, headers[key]);

                xhr.onerror = function () {
                    return reject(new _TransportError2['default'](_Response2['default'].create(xhr, transformer)));
                };
                xhr.onabort = function () {
                    return reject(new _TransportError2['default'](_Response2['default'].create(xhr, transformer)));
                };

                xhr.send(body);
            });
        }
    }]);

    return XHRTransport;
})();

exports['default'] = XHRTransport;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9YSFJUcmFuc3BvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzhCQUFvQixpQkFBaUI7Ozs7d0JBQ2pCLFVBQVU7Ozs7d0JBQ1QsWUFBWTs7OztxQkFDZixTQUFTOzs7OzJCQUNILGVBQWU7Ozs7MkJBQ2YsZUFBZTs7Ozs4QkFDWixrQkFBa0I7Ozs7d0JBQ3hCLFlBQVk7Ozs7Ozs7Ozs7SUFPM0IsWUFBWTtBQUdILGFBSFQsWUFBWSxDQUdGLFdBQVcsRUFBRSxNQUFNLEVBQUU7OEJBSC9CLFlBQVk7O0FBSVYsWUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQzNCLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7aUJBUEMsWUFBWTs7ZUFTTCxtQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2xCLGdCQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUMxQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRUcsY0FBQyxHQUFHLEVBQUU7O0FBRU4sZ0JBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFDL0IsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDbkMsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDM0IsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0FBQ2pDLGdCQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ2xCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLGdCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3hCLGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDOztBQUUxQixrQkFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLEFBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRSxNQUFNLEdBQUUsSUFBSSxDQUFDOztBQUU1RCxnQkFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xELElBQUksTUFBTSxFQUNOLEdBQUcsR0FBRywyQkFBUyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXBDLGdCQUFJLElBQUksRUFDSixJQUFJLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVsRCxtQkFBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxnQ0FBZ0MsQ0FBQztBQUM5RixtQkFBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxhQUFhLElBQUksbUNBQW1DLENBQUM7O0FBRXJGLGdCQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLDRCQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLFlBQVksQ0FBQyxDQUFDOztBQUVsRixtQkFBTywwQkFBWSxVQUFTLE9BQU8sRUFBRSxNQUFNLEVBQUU7O0FBRXpDLG1CQUFHLENBQUMsTUFBTSxHQUFHLFlBQVc7Ozs7QUFJcEIsd0JBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQ2hCLE9BQU8sTUFBTSxDQUFDLDZCQUFnQixzQkFBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsd0JBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQ2hCLE9BQU8sTUFBTSxDQUFDLDZCQUFnQixzQkFBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEUsMkJBQU8sQ0FBQyxzQkFBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBRTlDLENBQUM7O0FBRUYsbUJBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFNUIscUJBQUssSUFBSSxHQUFHLElBQUksT0FBTyxFQUNuQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDWixHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUVoRCxtQkFBRyxDQUFDLE9BQU8sR0FBRzsyQkFBTSxNQUFNLENBQUMsZ0NBQW1CLHNCQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztpQkFBQSxDQUFDO0FBQ2xGLG1CQUFHLENBQUMsT0FBTyxHQUFHOzJCQUFNLE1BQU0sQ0FBQyxnQ0FBbUIsc0JBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUFBLENBQUM7O0FBRWxGLG1CQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBRWxCLENBQUMsQ0FBQztTQUdOOzs7V0F0RUMsWUFBWTs7O3FCQTJFSCxZQUFZIiwiZmlsZSI6IlhIUlRyYW5zcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVzIGZyb20gJ2Jyb3dzZXItY29va2llcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgYnVpbGRVcmwgZnJvbSAnLi9idWlsZFVybCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgQ2xpZW50RXJyb3IgZnJvbSAnLi9DbGllbnRFcnJvcic7XG5pbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnLi9TZXJ2ZXJFcnJvcic7XG5pbXBvcnQgVHJhbnNwb3J0RXJyb3IgZnJvbSAnLi9UcmFuc3BvcnRFcnJvcic7XG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XG5cbi8qKlxuICogWEhSVHJhbnNwb3J0XG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gdHJhbnNmb3JtZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAqL1xuY2xhc3MgWEhSVHJhbnNwb3J0IHtcblxuXG4gICAgY29uc3RydWN0b3IodHJhbnNmb3JtZXIsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXI7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNlbmQocmVxKSB7XG5cbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdHJhbnNmb3JtZXIgPSB0aGlzLnRyYW5zZm9ybWVyO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHRoaXMuaGVhZGVycztcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnZ2V0JztcbiAgICAgICAgdmFyIHVybCA9IHJlcS51cmw7XG4gICAgICAgIHZhciBib2R5ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXJhbXMgPSByZXEucGFyYW1zO1xuICAgICAgICB2YXIgYWRhcHRlciA9IHJlcS5hZGFwdGVyO1xuXG4gICAgICAgIHBhcmFtcyA9IChwYXJhbXMpPyAoYWRhcHRlcik/IGFkYXB0ZXIocGFyYW1zKSA6cGFyYW1zOiBudWxsO1xuXG4gICAgICAgIGlmIChbJ2dldCcsICdoZWFkJ10uaW5kZXhPZihtZXRob2QudG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgIGlmIChwYXJhbXMpIFxuICAgICAgICAgICAgICAgIHVybCA9IGJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAoYm9keSlcbiAgICAgICAgICAgIGJvZHkgPSB0cmFuc2Zvcm1lci50cmFuc2Zvcm1SZXF1ZXN0Qm9keShib2R5KTtcblxuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHRyYW5zZm9ybWVyLkNPTlRFTlRfVFlQRV9IRUFERVIgfHwgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCc7XG4gICAgICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gdHJhbnNmb3JtZXIuQUNDRVBUX0hFQURFUiB8fCAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJztcblxuICAgICAgICB0aGlzLmhlYWRlcnNbJ3gteHNyZi10b2tlbiddID0gY29va2llcy5nZXQoY29uZmlnLnhzcmZDb29raWVOYW1lIHx8ICd4c3JmX3Rva2VuJyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAvL3hoci5yZXNwb25zZVR5cGUgPSB0cmFuc2Zvcm1lci5yZXNwb25zZVR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDQ5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgU2VydmVyRXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDM5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgQ2xpZW50RXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG4gICAgICAgICAgICB4aHIub25hYm9ydCA9ICgpID0+IHJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBYSFJUcmFuc3BvcnQ7XG4iXX0=