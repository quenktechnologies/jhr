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
        value: function send(method, url, body) {

            var xhr = new XMLHttpRequest();
            var transformer = this.transformer;
            var headers = this.headers;
            var config = this.config;

            if (body) body = transformer.transformRequestBody(body);

            headers['Content-Type'] = transformer.CONTENT_TYPE_HEADER || 'application/json;charset=utf-8';
            headers['Accept'] = transformer.ACCEPT_HEADER || 'application/json, text/plain, */*';

            console.log('xsrf ', _browserCookies2['default'].get('xsrf_token'));

            this.headers['x-xsrf-token'] = _browserCookies2['default'].get(config.xsrfCookieName || 'xsrf_token');

            return new _bluebird2['default'](function (resolve, reject) {

                xhr.open(method, url, true);

                for (var key in headers) if (headers[key]) xhr.setRequestHeader(key, headers[key]);

                xhr.onerror = function () {
                    return reject(new _TransportError2['default']());
                };
                xhr.onabort = function () {
                    return reject(new _TransportError2['default']());
                };

                xhr.onload = function () {

                    xhr.responseType = transformer.responseType;

                    if (xhr.status > 499) return reject(new _ServerError2['default'](_Response2['default'].create(xhr, transformer)));

                    if (xhr.status > 399) return reject(new _ClientError2['default'](_Response2['default'].create(xhr, transformer)));

                    resolve(_Response2['default'].create(xhr, transformer));
                };

                xhr.send(body);
            });
        }
    }]);

    return XHRTransport;
})();

exports['default'] = XHRTransport;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RXRFLDJCQUFPLENBQUMsc0JBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUU5QyxDQUFBOztBQUVELG1CQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBRWxCLENBQUMsQ0FBQztTQUdOOzs7V0E3REMsWUFBWTs7O3FCQWtFSCxZQUFZIiwiZmlsZSI6InNyYy9YSFJUcmFuc3BvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29va2llcyBmcm9tICdicm93c2VyLWNvb2tpZXMnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgQ2xpZW50RXJyb3IgZnJvbSAnLi9DbGllbnRFcnJvcic7XG5pbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnLi9TZXJ2ZXJFcnJvcic7XG5pbXBvcnQgVHJhbnNwb3J0RXJyb3IgZnJvbSAnLi9UcmFuc3BvcnRFcnJvcic7XG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XG5cbi8qKlxuICogWEhSVHJhbnNwb3J0XG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gdHJhbnNmb3JtZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAqL1xuY2xhc3MgWEhSVHJhbnNwb3J0IHtcblxuXG4gICAgY29uc3RydWN0b3IodHJhbnNmb3JtZXIsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXI7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNlbmQobWV0aG9kLCB1cmwsIGJvZHkpIHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lciA9IHRoaXMudHJhbnNmb3JtZXI7XG4gICAgICAgIHZhciBoZWFkZXJzID0gdGhpcy5oZWFkZXJzO1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgaWYgKGJvZHkpXG4gICAgICAgICAgICBib2R5ID0gdHJhbnNmb3JtZXIudHJhbnNmb3JtUmVxdWVzdEJvZHkoYm9keSk7XG5cbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB0cmFuc2Zvcm1lci5DT05URU5UX1RZUEVfSEVBREVSIHx8ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnO1xuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9IHRyYW5zZm9ybWVyLkFDQ0VQVF9IRUFERVIgfHwgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKic7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3hzcmYgJywgY29va2llcy5nZXQoJ3hzcmZfdG9rZW4nKSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXJzWyd4LXhzcmYtdG9rZW4nXSA9IGNvb2tpZXMuZ2V0KGNvbmZpZy54c3JmQ29va2llTmFtZSB8fCAneHNyZl90b2tlbicpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpPT5yZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKCkpO1xuICAgICAgICAgICAgeGhyLm9uYWJvcnQgPSAoKT0+cmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcigpKTtcblxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0cmFuc2Zvcm1lci5yZXNwb25zZVR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDQ5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgU2VydmVyRXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDM5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgQ2xpZW50RXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUlRyYW5zcG9ydDtcblxuIl19