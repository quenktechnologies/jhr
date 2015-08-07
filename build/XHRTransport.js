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
                    return reject(new _TransportError2['default']());
                };
                xhr.onabort = function () {
                    return reject(new _TransportError2['default']());
                };

                xhr.send(body);
            });
        }
    }]);

    return XHRTransport;
})();

exports['default'] = XHRTransport;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LENBQUMsQ0FBQztTQUdOOzs7V0E1REMsWUFBWTs7O3FCQWlFSCxZQUFZIiwiZmlsZSI6IlhIUlRyYW5zcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVzIGZyb20gJ2Jyb3dzZXItY29va2llcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBDbGllbnRFcnJvciBmcm9tICcuL0NsaWVudEVycm9yJztcbmltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICcuL1NlcnZlckVycm9yJztcbmltcG9ydCBUcmFuc3BvcnRFcnJvciBmcm9tICcuL1RyYW5zcG9ydEVycm9yJztcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcblxuLyoqXG4gKiBYSFJUcmFuc3BvcnRcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICovXG5jbGFzcyBYSFJUcmFuc3BvcnQge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2Zvcm1lciwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lcjtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuXG4gICAgc2V0SGVhZGVyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2VuZChtZXRob2QsIHVybCwgYm9keSkge1xuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gdGhpcy50cmFuc2Zvcm1lcjtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcblxuXG4gICAgICAgIGlmIChib2R5KVxuICAgICAgICAgICAgYm9keSA9IHRyYW5zZm9ybWVyLnRyYW5zZm9ybVJlcXVlc3RCb2R5KGJvZHkpO1xuXG4gICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdHJhbnNmb3JtZXIuQ09OVEVOVF9UWVBFX0hFQURFUiB8fCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JztcbiAgICAgICAgaGVhZGVyc1snQWNjZXB0J10gPSB0cmFuc2Zvcm1lci5BQ0NFUFRfSEVBREVSIHx8ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyc1sneC14c3JmLXRva2VuJ10gPSBjb29raWVzLmdldChjb25maWcueHNyZkNvb2tpZU5hbWUgfHwgJ3hzcmZfdG9rZW4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgLy94aHIucmVzcG9uc2VUeXBlID0gdHJhbnNmb3JtZXIucmVzcG9uc2VUeXBlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPiA0OTkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IFNlcnZlckVycm9yKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPiAzOTkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IENsaWVudEVycm9yKFJlc3BvbnNlLmNyZWF0ZSh4aHIsIHRyYW5zZm9ybWVyKSkpO1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShSZXNwb25zZS5jcmVhdGUoeGhyLCB0cmFuc2Zvcm1lcikpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpPT5yZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKCkpO1xuICAgICAgICAgICAgeGhyLm9uYWJvcnQgPSAoKT0+cmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcigpKTtcblxuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUlRyYW5zcG9ydDtcblxuIl19