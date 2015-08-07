'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var buildUrl = function buildUrl(url, params) {
    if (!params) return url;
    return url + '?' + _qs2['default'].stringify(params);
};

/**
 * Http provides an api similar to angular's $http.
 * Uses promises for sanity and less suck.
 * @param {HTTPTransport} transport
 */

var Agent = (function () {
    function Agent(transport) {
        _classCallCheck(this, Agent);

        this.transport = transport;
    }

    /**
     *
     * @param {String} url
     * @param {Object} params
     * @return {Promise}
     */

    _createClass(Agent, [{
        key: 'head',
        value: function head(url, params) {
            url = buildUrl(url, params);
            return this.send({ method: 'HEAD', url: url, body: params });
        }

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
    }, {
        key: 'get',
        value: function get(url, params) {
            url = buildUrl(url, params);
            return this.send({ method: 'GET', url: url, body: params });
        }

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
    }, {
        key: 'post',
        value: function post(url, params) {
            return this.send({ method: 'POST', url: url, body: params });
        }

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
    }, {
        key: 'put',
        value: function put(url, params) {
            return this.send({ method: 'PUT', url: url, body: params });
        }

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
    }, {
        key: 'delete',
        value: function _delete(url, params) {
            return this.send({ method: 'DELETE', url: url, body: params });
        }
    }, {
        key: 'setHeader',
        value: function setHeader(name, value) {
            this.headers[name] = value;
            return this;
        }

        /**
         *
         * @param {Object} req
         * @param {String} req.method
         * @param {String} req.url
         * @param {Object} [req.params]
         * @returns {Promise}
         */
    }, {
        key: 'send',
        value: function send(req) {
            return this.transport.send(req);
        }
    }]);

    return Agent;
})();

exports['default'] = Agent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7OztrQkFDSixJQUFJOzs7O0FBRW5CLElBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUM7QUFDaEMsUUFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN2QixXQUFPLEdBQUcsR0FBQyxHQUFHLEdBQUMsZ0JBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLENBQUE7Ozs7Ozs7O0lBUUssS0FBSztBQUVJLGFBRlQsS0FBSyxDQUVLLFNBQVMsRUFBRTs4QkFGckIsS0FBSzs7QUFHSCxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUM5Qjs7Ozs7Ozs7O2lCQUpDLEtBQUs7O2VBWUgsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2QsZUFBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUIsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMzRDs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLGVBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDMUQ7Ozs7Ozs7Ozs7ZUFRRyxjQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDZCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzNEOzs7Ozs7Ozs7O2VBUUUsYUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMxRDs7Ozs7Ozs7OztlQVFLLGlCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUM3RDs7O2VBRVEsbUJBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNuQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDM0IsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7Ozs7Ozs7Ozs7OztlQVVHLGNBQUMsR0FBRyxFQUFFO0FBQ04sbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDbEM7OztXQXpFQyxLQUFLOzs7cUJBOEVJLEtBQUsiLCJmaWxlIjoiQWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXMgZnJvbSAnaXMnO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcblxudmFyIGJ1aWxkVXJsID0gZnVuY3Rpb24odXJsLCBwYXJhbXMpe1xuICAgIGlmKCFwYXJhbXMpIHJldHVybiB1cmw7XG4gICAgcmV0dXJuIHVybCsnPycrcXMuc3RyaW5naWZ5KHBhcmFtcyk7XG59XG5cblxuLyoqXG4gKiBIdHRwIHByb3ZpZGVzIGFuIGFwaSBzaW1pbGFyIHRvIGFuZ3VsYXIncyAkaHR0cC5cbiAqIFVzZXMgcHJvbWlzZXMgZm9yIHNhbml0eSBhbmQgbGVzcyBzdWNrLlxuICogQHBhcmFtIHtIVFRQVHJhbnNwb3J0fSB0cmFuc3BvcnRcbiAqL1xuY2xhc3MgQWdlbnQge1xuXG4gICAgY29uc3RydWN0b3IodHJhbnNwb3J0KSB7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGhlYWQodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgdXJsID0gYnVpbGRVcmwodXJsLCBwYXJhbXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKHttZXRob2Q6J0hFQUQnLCB1cmw6dXJsLCBib2R5OnBhcmFtc30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGdldCh1cmwsIHBhcmFtcykge1xuICAgICAgICB1cmwgPSBidWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoe21ldGhvZDonR0VUJywgdXJsOnVybCwgYm9keTpwYXJhbXN9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwb3N0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoe21ldGhvZDonUE9TVCcsIHVybDp1cmwsIGJvZHk6cGFyYW1zfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcHV0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoe21ldGhvZDonUFVUJywgdXJsOnVybCwgYm9keTpwYXJhbXN9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGUodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7bWV0aG9kOidERUxFVEUnLCB1cmw6dXJsLCBib2R5OnBhcmFtc30pO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVxXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcS5tZXRob2RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxLnVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxLnBhcmFtc11cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzZW5kKHJlcSkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChyZXEpXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWdlbnQ7XG5cbiJdfQ==