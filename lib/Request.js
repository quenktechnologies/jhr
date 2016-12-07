'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Maco = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Headers = require('./Headers');

var _Headers2 = _interopRequireDefault(_Headers);

var _Url = require('./Url');

var _Url2 = _interopRequireDefault(_Url);

var _TransportError = require('./TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

var _HTTPError = require('./HTTPError');

var HTTPError = _interopRequireWildcard(_HTTPError);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Maco
 */
var Maco = function () {
    function Maco() {
        _classCallCheck(this, Maco);
    }

    _createClass(Maco, [{
        key: 'onResponse',


        /**
         * onResponse
         */
        value: function onResponse() {}
    }, {
        key: 'onError',
        value: function onError() {}
    }]);

    return Maco;
}();

/**
 * ErrorMaco
 */


var ErrorMaco = function ErrorMaco() {
    _classCallCheck(this, ErrorMaco);
};

var defaultMaco = {
    onResponse: function onResponse(res) {

        return res;
    },
    onError: function onError(e) {

        throw e;
    }
};

/**
 * Request
 * @param {string} method
 * @param {string} url
 * @param {Agent} agent
 * @param {ResponseHandler} maco
 *
 * @property {string} url
 * @property {object} params
 * @property {Agent} agent
 * @property {string} method
 * @property {object} headers
 */

var Request = function () {
    function Request(method, url, agent) {
        var maco = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultMaco;

        _classCallCheck(this, Request);

        (0, _beof2.default)({ method: method }).string();
        (0, _beof2.default)({ url: url }).string();
        (0, _beof2.default)({ agent: agent }).object();
        (0, _beof2.default)({ maco: maco }).interface(Maco);

        this.url = url;
        this.query = {};
        this.body = null;
        this.agent = agent;
        this.method = '';
        this.headers = {};
        this.ttl = 0;
        this.maco = maco;
    }

    _createClass(Request, [{
        key: 'execute',
        value: function execute() {
            var _this = this;

            var xhr = new XMLHttpRequest();

            return new _bluebird2.default(function (resolve, reject) {

                xhr.open(_this.method, _Url2.default.fromString(_this.url, _this.query), true);

                xhr.onload = function () {

                    var responseBody = null;

                    if (xhr.response != null && xhr.response !== '') responseBody = _this.agent.transform.parseResponseBody(xhr.response);

                    if (xhr.status >= 400) return reject(HTTPError.create(xhr.status, xhr.responseText, responseBody, xhr.response));

                    resolve(_Response2.default.create(xhr, responseBody));
                };

                if (_this.ttl > 0) xhr.timeout = _this.ttl;

                _Headers2.default.set(xhr, _this.agent.headers, _this.headers);

                xhr.responseType = _this.agent.transform.responseType || '';

                _this.agent.adapters.forEach(function (a) {
                    return a.beforeRequest(_this, xhr, _this.agent);
                });
                rejec = function rejec(val) {

                    console.log(val);
                    reject(val);
                };
                xhr.onerror = function () {
                    return rejec(new _TransportError2.default());
                };
                xhr.onabort = function () {
                    return rejec(new _TransportError2.default());
                };
                xhr.send(_this.body);
            }).then(function (res) {
                return _this.maco.onResponse(res);
            }).catch(function (e) {
                return _this.maco.onError(e);
            });
        }
    }]);

    return Request;
}();

exports.Maco = Maco;
exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkhUVFBFcnJvciIsIk1hY28iLCJFcnJvck1hY28iLCJkZWZhdWx0TWFjbyIsIm9uUmVzcG9uc2UiLCJyZXMiLCJvbkVycm9yIiwiZSIsIlJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJhZ2VudCIsIm1hY28iLCJzdHJpbmciLCJvYmplY3QiLCJpbnRlcmZhY2UiLCJxdWVyeSIsImJvZHkiLCJoZWFkZXJzIiwidHRsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXNvbHZlIiwicmVqZWN0Iiwib3BlbiIsImZyb21TdHJpbmciLCJvbmxvYWQiLCJyZXNwb25zZUJvZHkiLCJyZXNwb25zZSIsInRyYW5zZm9ybSIsInBhcnNlUmVzcG9uc2VCb2R5Iiwic3RhdHVzIiwiY3JlYXRlIiwicmVzcG9uc2VUZXh0IiwidGltZW91dCIsInNldCIsInJlc3BvbnNlVHlwZSIsImFkYXB0ZXJzIiwiZm9yRWFjaCIsImEiLCJiZWZvcmVSZXF1ZXN0IiwicmVqZWMiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsIm9uYWJvcnQiLCJzZW5kIiwidGhlbiIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsUzs7Ozs7Ozs7QUFFWjs7O0lBR01DLEk7Ozs7Ozs7OztBQUVGOzs7cUNBR2EsQ0FFWjs7O2tDQUVTLENBQUU7Ozs7OztBQUloQjs7Ozs7SUFHTUMsUzs7OztBQUtOLElBQU1DLGNBQWM7QUFFaEJDLGNBRmdCLHNCQUVMQyxHQUZLLEVBRUE7O0FBRVosZUFBT0EsR0FBUDtBQUVILEtBTmU7QUFRaEJDLFdBUmdCLG1CQVFSQyxDQVJRLEVBUUw7O0FBRVAsY0FBTUEsQ0FBTjtBQUVIO0FBWmUsQ0FBcEI7O0FBZ0JBOzs7Ozs7Ozs7Ozs7OztJQWFNQyxPO0FBRUYscUJBQVlDLE1BQVosRUFBb0JDLEdB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Q0FBbEIsQ0FBTDtBQUFBLGFBdkNDLENBQVA7QUF5Q0g7Ozs7OztRQUlJTixJLEdBQUFBLEk7a0JBQ01PLE8iLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEhlYWRlcnMgZnJvbSAnLi9IZWFkZXJzJztcbmltcG9ydCBVcmwgZnJvbSAnLi9VcmwnO1xuaW1wb3J0IFRyYW5zcG9ydEVycm9yIGZyb20gJy4vVHJhbnNwb3J0RXJyb3InO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuaW1wb3J0ICogYXMgSFRUUEVycm9yIGZyb20gJy4vSFRUUEVycm9yJztcblxuLyoqXG4gKiBNYWNvXG4gKi9cbmNsYXNzIE1hY28ge1xuXG4gICAgLyoqXG4gICAgICogb25SZXNwb25zZVxuICAgICAqL1xuICAgIG9uUmVzcG9uc2UoKSB7XG5cbiAgICB9XG5cbiAgICBvbkVycm9yKCkge31cblxufVxuXG4vKipcbiAqIEVycm9yTWFjb1xuICovXG5jbGFzcyBFcnJvck1hY28ge1xuXG5cbn1cblxuY29uc3QgZGVmYXVsdE1hY28gPSB7XG5cbiAgICBvblJlc3BvbnNlKHJlcykge1xuXG4gICAgICAgIHJldHVybiByZXM7XG5cbiAgICB9LFxuXG4gICAgb25FcnJvcihlKSB7XG5cbiAgICAgICAgdGhyb3cgZTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcXVlc3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7QWdlbnR9IGFnZW50XG4gKiBAcGFyYW0ge1Jlc3BvbnNlSGFuZGxlcn0gbWFjb1xuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cmxcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwYXJhbXNcbiAqIEBwcm9wZXJ0eSB7QWdlbnR9IGFnZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kXG4gKiBAcHJvcGVydHkge29iamVjdH0gaGVhZGVyc1xuICovXG5jbGFzcyBSZXF1ZXN0IHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgdXJsLCBhZ2VudCwgbWFjbyA9IGRlZmF1bHRNYWNvKSB7XG5cbiAgICAgICAgYmVvZih7IG1ldGhvZCB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IHVybCB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IGFnZW50IH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgbWFjbyB9KS5pbnRlcmZhY2UoTWFjbyk7XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgICAgdGhpcy5ib2R5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZ2VudCA9IGFnZW50O1xuICAgICAgICB0aGlzLm1ldGhvZCA9ICcnO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgdGhpcy50dGwgPSAwO1xuICAgICAgICB0aGlzLm1hY28gPSBtYWNvO1xuXG4gICAgfVxuXG4gICAgZXhlY3V0ZSgpIHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIFVybC5mcm9tU3RyaW5nKHRoaXMudXJsLCB0aGlzLnF1ZXJ5KSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VCb2R5ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICgoeGhyLnJlc3BvbnNlICE9IG51bGwpICYmIHhoci5yZXNwb25zZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQm9keSA9IHRoaXMuYWdlbnQudHJhbnNmb3JtLnBhcnNlUmVzcG9uc2VCb2R5KHhoci5yZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA0MDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoSFRUUEVycm9yLmNyZWF0ZSh4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCwgcmVzcG9uc2VCb2R5LCB4aHIucmVzcG9uc2UpKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoUmVzcG9uc2UuY3JlYXRlKHhociwgcmVzcG9uc2VCb2R5KSk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR0bCA+IDApXG4gICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnR0bDtcblxuICAgICAgICAgICAgSGVhZGVycy5zZXQoeGhyLCB0aGlzLmFnZW50LmhlYWRlcnMsIHRoaXMuaGVhZGVycyk7XG5cbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLmFnZW50LnRyYW5zZm9ybS5yZXNwb25zZVR5cGUgfHwgJyc7XG5cbiAgICAgICAgICAgIHRoaXMuYWdlbnQuYWRhcHRlcnMuZm9yRWFjaChhID0+IGEuYmVmb3JlUmVxdWVzdCh0aGlzLCB4aHIsIHRoaXMuYWdlbnQpKTtcbiAgICAgICAgICAgIHJlamVjID0gZnVuY3Rpb24odmFsKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgICAgICAgICAgICAgIHJlamVjdCh2YWwpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjKG5ldyBUcmFuc3BvcnRFcnJvcigpKTtcbiAgICAgICAgICAgIHhoci5vbmFib3J0ID0gKCkgPT4gcmVqZWMobmV3IFRyYW5zcG9ydEVycm9yKCkpO1xuICAgICAgICAgICAgeGhyLnNlbmQodGhpcy5ib2R5KTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbihyZXMgPT4gdGhpcy5tYWNvLm9uUmVzcG9uc2UocmVzKSkuXG4gICAgICAgIGNhdGNoKGUgPT4gdGhpcy5tYWNvLm9uRXJyb3IoZSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IE1hY28gfVxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdFxuIl19