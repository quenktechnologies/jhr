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

var _HTTPError2 = _interopRequireDefault(_HTTPError);

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
        this.body = {};
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

                    var responseBody = {};

                    if (xhr.response != null && xhr.response !== '') responseBody = _this.agent.transform.parseResponseBody(xhr.response);

                    if (xhr.status >= 400) return reject((0, _HTTPError.create)(xhr.status, xhr.responseText, responseBody, xhr.response));

                    resolve(_Response2.default.create(xhr, responseBody));
                };

                if (_this.ttl > 0) xhr.timeout = _this.ttl;

                _Headers2.default.set(xhr, _this.agent.headers, _this.headers);

                xhr.responseType = _this.agent.transform.responseType || '';

                _this.agent.adapters.forEach(function (a) {
                    return a.beforeRequest(_this, xhr, _this.agent);
                });

                xhr.onerror = function () {
                    return reject(new _TransportError2.default());
                };
                xhr.onabort = function () {
                    return reject(new _TransportError2.default());
                };
                xhr.send(_this.body);
            }).then(function (res) {
                return _this.maco.onResponse(res);
            }).catch(_HTTPError2.default, function (e) {
                return _this.maco.onError(e);
            });
        }
    }]);

    return Request;
}();

exports.Maco = Maco;
exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIk1hY28iLCJFcnJvck1hY28iLCJkZWZhdWx0TWFjbyIsIm9uUmVzcG9uc2UiLCJyZXMiLCJvbkVycm9yIiwiZSIsIlJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJhZ2VudCIsIm1hY28iLCJzdHJpbmciLCJvYmplY3QiLCJpbnRlcmZhY2UiLCJxdWVyeSIsImJvZHkiLCJoZWFkZXJzIiwidHRsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXNvbHZlIiwicmVqZWN0Iiwib3BlbiIsImZyb21TdHJpbmciLCJvbmxvYWQiLCJyZXNwb25zZUJvZHkiLCJyZXNwb25zZSIsInRyYW5zZm9ybSIsInBhcnNlUmVzcG9uc2VCb2R5Iiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiY3JlYXRlIiwidGltZW91dCIsInNldCIsInJlc3BvbnNlVHlwZSIsImFkYXB0ZXJzIiwiZm9yRWFjaCIsImEiLCJiZWZvcmVSZXF1ZXN0Iiwib25lcnJvciIsIm9uYWJvcnQiLCJzZW5kIiwidGhlbiIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFHQTs7O0lBR01BLEk7Ozs7Ozs7OztBQUVGOzs7cUNBR2EsQ0FFWjs7O2tDQUVTLENBQUU7Ozs7OztBQUloQjs7Ozs7SUFHTUMsUzs7OztBQUtOLElBQU1DLGNBQWM7QUFFaEJDLGNBRmdCLHNCQUVMQyxHQUZLLEVBRUE7O0FBRVosZUFBT0EsR0FBUDtBQUVILEtBTmU7QUFRaEJDLFdBUmdCLG1CQVFSQyxDQVJRLEVBUUw7O0FBRVAsY0FBTUEsQ0FBTjtBQUVIO0FBWmUsQ0FBcEI7O0FBZ0JBOzs7Ozs7Ozs7Ozs7OztJQWFNQyxPO0FBRUYscUJBQVlDLE1BQVosRUFBb0JDLEdBQXBCLEVBQXlCQyxLQUF6QixFQUFvRDtBQUFBLFlBQXBCQyxJQUFvQix1RUFBYlQsV0FBYTs7QUFBQTs7QUFFaEQsNEJBQUssRUFBRU0sY0FBRixFQUFMLEVBQWlCSSxNQUFqQjtBQUNBLDRCQUFLLEVBQUVILFFBQUYsRUFBTCxFQUFjRyxNQUFkO0FBQ0EsNEJBQUssRUFBRUYsWUFBRixFQUFMLEVBQWdCRyxNQUFoQjtBQUNBLDRCQUFLLEVBQUVGLFVBQUYsRUFBTCxFQUFlRyxTQUFmLENBQXlCZCxJQUF6Qjs7QUFFQSxhQUFLUyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFLTSxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBS04sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0YsTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLUyxPQUFMLEdBQWUsRUFBZjtBQUNBLGFBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsYUFBS1AsSUFBTCxHQUFZQSxJQUFaO0FBRUg7Ozs7a0NBRVM7QUFBQTs7QUFFTixnQkFBSVEsTUFBTSxJQUFJQyxjQUFKLEVBQVY7O0FBRUEsbUJBQU8sdUJBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCOztBQUVwQ0gsb0JBQUlJLElBQUosQ0FBUyxNQUFLZixNQUFkLEVBQXNCLGNBQUlnQixVQUFKLENBQWUsTUFBS2YsR0FBcEIsRUFBeUIsTUFBS00sS0FBOUIsQ0FBdEIsRUFBNEQsSUFBNUQ7O0FBRUFJLG9CQUFJTSxNQUFKLEdBQWEsWUFBTTs7QUFFZix3QkFBSUMsZUFBZSxFQUFuQjs7QUFFQSx3QkFBS1AsSUFBSVEsUUFBSixJQUFnQixJQUFqQixJQUEwQlIsSUFBSVEsUUFBSixLQUFpQixFQUEvQyxFQUNJRCxlQUFlLE1BQUtoQixLQUFMLENBQVdrQixTQUFYLENBQXFCQyxpQkFBckIsQ0FBdUNWLElBQUlRLFFBQTNDLENBQWY7O0FBRUosd0JBQUlSLElBQUlXLE1BQUosSUFBYyxHQUFsQixFQUNJLE9BQU9SLE9BQU8sdUJBQU9ILElBQUlXLE1BQVgsRUFDVlgsSUFBSVksWUFETSxFQUNRTCxZQURSLEVBQ3NCUCxJQUFJUSxRQUQxQixDQUFQLENBQVA7O0FBR0pOLDRCQUFRLG1CQUFTVyxNQUFULENBQWdCYixHQUFoQixFQUFxQk8sWUFBckIsQ0FBUjtBQUVILGlCQWJEOztBQWVBLG9CQUFJLE1BQUtSLEdBQUwsR0FBVyxDQUFmLEVBQ0lDLElBQUljLE9BQUosR0FBYyxNQUFLZixHQUFuQjs7QUFFSixrQ0FBUWdCLEdBQVIsQ0FBWWYsR0FBWixFQUFpQixNQUFLVCxLQUFMLENBQVdPLE9BQTVCLEVBQXFDLE1BQUtBLE9BQTFDOztBQUVBRSxvQkFBSWdCLFlBQUosR0FBbUIsTUFBS3pCLEtBQUwsQ0FBV2tCLFNBQVgsQ0FBcUJPLFlBQXJCLElBQXFDLEVBQXhEOztBQUVBLHNCQUFLekIsS0FBTCxDQUFXMEIsUUFBWCxDQUFvQkMsT0FBcEIsQ0FBNEI7QUFBQSwyQkFBS0MsRUFBRUMsYUFBRixRQUFzQnBCLEdBQXRCLEVBQTJCLE1BQUtULEtBQWhDLENBQUw7QUFBQSxpQkFBNUI7O0FBRUFTLG9CQUFJcUIsT0FBSixHQUFjO0FBQUEsMkJBQU1sQixPQUFPLDhCQUFQLENBQU47QUFBQSxpQkFBZDtBQUNBSCxvQkFBSXNCLE9BQUosR0FBYztBQUFBLDJCQUFNbkIsT0FBTyw4QkFBUCxDQUFOO0FBQUEsaUJBQWQ7QUFDQUgsb0JBQUl1QixJQUFKLENBQVMsTUFBSzFCLElBQWQ7QUFFSCxhQWhDTSxFQWlDUDJCLElBakNPLENBaUNGO0FBQUEsdUJBQU8sTUFBS2hDLElBQUwsQ0FBVVIsVUFBVixDQUFxQkMsR0FBckIsQ0FBUDtBQUFBLGFBakNFLEVBa0NQd0MsS0FsQ08sc0JBa0NVO0FBQUEsdUJBQUssTUFBS2pDLElBQUwsQ0FBVU4sT0FBVixDQUFrQkMsQ0FBbEIsQ0FBTDtBQUFBLGFBbENWLENBQVA7QUFvQ0g7Ozs7OztRQUlJTixJLEdBQUFBLEk7a0JBQ01PLE8iLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEhlYWRlcnMgZnJvbSAnLi9IZWFkZXJzJztcbmltcG9ydCBVcmwgZnJvbSAnLi9VcmwnO1xuaW1wb3J0IFRyYW5zcG9ydEVycm9yIGZyb20gJy4vVHJhbnNwb3J0RXJyb3InO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuaW1wb3J0IEhUVFBFcnJvciBmcm9tICcuL0hUVFBFcnJvcic7XG5pbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi9IVFRQRXJyb3InO1xuXG4vKipcbiAqIE1hY29cbiAqL1xuY2xhc3MgTWFjbyB7XG5cbiAgICAvKipcbiAgICAgKiBvblJlc3BvbnNlXG4gICAgICovXG4gICAgb25SZXNwb25zZSgpIHtcblxuICAgIH1cblxuICAgIG9uRXJyb3IoKSB7fVxuXG59XG5cbi8qKlxuICogRXJyb3JNYWNvXG4gKi9cbmNsYXNzIEVycm9yTWFjbyB7XG5cblxufVxuXG5jb25zdCBkZWZhdWx0TWFjbyA9IHtcblxuICAgIG9uUmVzcG9uc2UocmVzKSB7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH0sXG5cbiAgICBvbkVycm9yKGUpIHtcblxuICAgICAgICB0aHJvdyBlO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVxdWVzdFxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtBZ2VudH0gYWdlbnRcbiAqIEBwYXJhbSB7UmVzcG9uc2VIYW5kbGVyfSBtYWNvXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVybFxuICogQHByb3BlcnR5IHtvYmplY3R9IHBhcmFtc1xuICogQHByb3BlcnR5IHtBZ2VudH0gYWdlbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBoZWFkZXJzXG4gKi9cbmNsYXNzIFJlcXVlc3Qge1xuXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCB1cmwsIGFnZW50LCBtYWNvID0gZGVmYXVsdE1hY28pIHtcblxuICAgICAgICBiZW9mKHsgbWV0aG9kIH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgdXJsIH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgYWdlbnQgfSkub2JqZWN0KCk7XG4gICAgICAgIGJlb2YoeyBtYWNvIH0pLmludGVyZmFjZShNYWNvKTtcblxuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgICB0aGlzLmJvZHkgPSB7fTtcbiAgICAgICAgdGhpcy5hZ2VudCA9IGFnZW50O1xuICAgICAgICB0aGlzLm1ldGhvZCA9ICcnO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgdGhpcy50dGwgPSAwO1xuICAgICAgICB0aGlzLm1hY28gPSBtYWNvO1xuXG4gICAgfVxuXG4gICAgZXhlY3V0ZSgpIHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIFVybC5mcm9tU3RyaW5nKHRoaXMudXJsLCB0aGlzLnF1ZXJ5KSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VCb2R5ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoKHhoci5yZXNwb25zZSAhPSBudWxsKSAmJiB4aHIucmVzcG9uc2UgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUJvZHkgPSB0aGlzLmFnZW50LnRyYW5zZm9ybS5wYXJzZVJlc3BvbnNlQm9keSh4aHIucmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNDAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGNyZWF0ZSh4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCwgcmVzcG9uc2VCb2R5LCB4aHIucmVzcG9uc2UpKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoUmVzcG9uc2UuY3JlYXRlKHhociwgcmVzcG9uc2VCb2R5KSk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR0bCA+IDApXG4gICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnR0bDtcblxuICAgICAgICAgICAgSGVhZGVycy5zZXQoeGhyLCB0aGlzLmFnZW50LmhlYWRlcnMsIHRoaXMuaGVhZGVycyk7XG5cbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLmFnZW50LnRyYW5zZm9ybS5yZXNwb25zZVR5cGUgfHwgJyc7XG5cbiAgICAgICAgICAgIHRoaXMuYWdlbnQuYWRhcHRlcnMuZm9yRWFjaChhID0+IGEuYmVmb3JlUmVxdWVzdCh0aGlzLCB4aHIsIHRoaXMuYWdlbnQpKTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKCkpO1xuICAgICAgICAgICAgeGhyLm9uYWJvcnQgPSAoKSA9PiByZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKCkpO1xuICAgICAgICAgICAgeGhyLnNlbmQodGhpcy5ib2R5KTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbihyZXMgPT4gdGhpcy5tYWNvLm9uUmVzcG9uc2UocmVzKSkuXG4gICAgICAgIGNhdGNoKEhUVFBFcnJvciwgZSA9PiB0aGlzLm1hY28ub25FcnJvcihlKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgTWFjbyB9XG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0XG4iXX0=