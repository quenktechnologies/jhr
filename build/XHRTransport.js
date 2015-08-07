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
        value: function send(req) {

            var xhr = new XMLHttpRequest();
            var transformer = this.transformer;
            var headers = this.headers;
            var config = this.config;
            var method = req.method || 'get';
            var url = req.url;
            var body = req.body;

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
//# sourceMappingURL=data:application/json;base64,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LEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUFBLENBQUM7QUFDaEYsbUJBQUcsQ0FBQyxPQUFPLEdBQUc7MkJBQUksTUFBTSxDQUFDLGdDQUFtQixzQkFBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBQUEsQ0FBQzs7QUFFaEYsbUJBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFFbEIsQ0FBQyxDQUFDO1NBR047OztXQS9EQyxZQUFZOzs7cUJBb0VILFlBQVkiLCJmaWxlIjoiWEhSVHJhbnNwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvb2tpZXMgZnJvbSAnYnJvd3Nlci1jb29raWVzJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IENsaWVudEVycm9yIGZyb20gJy4vQ2xpZW50RXJyb3InO1xuaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJy4vU2VydmVyRXJyb3InO1xuaW1wb3J0IFRyYW5zcG9ydEVycm9yIGZyb20gJy4vVHJhbnNwb3J0RXJyb3InO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuXG4vKipcbiAqIFhIUlRyYW5zcG9ydFxuICogQHBhcmFtIHtUcmFuc2Zvcm19IHRyYW5zZm9ybWVyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gKi9cbmNsYXNzIFhIUlRyYW5zcG9ydCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKHRyYW5zZm9ybWVyLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lciA9IHRyYW5zZm9ybWVyO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG5cbiAgICBzZXRIZWFkZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZW5kKHJlcSkge1xuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gdGhpcy50cmFuc2Zvcm1lcjtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2QgfHwgJ2dldCc7XG4gICAgICAgIHZhciB1cmwgPSByZXEudXJsO1xuICAgICAgICB2YXIgYm9keSA9IHJlcS5ib2R5O1xuXG5cbiAgICAgICAgaWYgKGJvZHkpXG4gICAgICAgICAgICBib2R5ID0gdHJhbnNmb3JtZXIudHJhbnNmb3JtUmVxdWVzdEJvZHkoYm9keSk7XG5cbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB0cmFuc2Zvcm1lci5DT05URU5UX1RZUEVfSEVBREVSIHx8ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnO1xuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9IHRyYW5zZm9ybWVyLkFDQ0VQVF9IRUFERVIgfHwgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKic7XG5cbiAgICAgICAgdGhpcy5oZWFkZXJzWyd4LXhzcmYtdG9rZW4nXSA9IGNvb2tpZXMuZ2V0KGNvbmZpZy54c3JmQ29va2llTmFtZSB8fCAneHNyZl90b2tlbicpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAvL3hoci5yZXNwb25zZVR5cGUgPSB0cmFuc2Zvcm1lci5yZXNwb25zZVR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDQ5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgU2VydmVyRXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+IDM5OSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgQ2xpZW50RXJyb3IoUmVzcG9uc2UuY3JlYXRlKHhociwgdHJhbnNmb3JtZXIpKSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpPT5yZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSkpO1xuICAgICAgICAgICAgeGhyLm9uYWJvcnQgPSAoKT0+cmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpKTtcblxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUlRyYW5zcG9ydDtcblxuIl19