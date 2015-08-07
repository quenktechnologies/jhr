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
            return this.send('HEAD', url, params);
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
            return this.send('GET', url, params);
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
            return this.send('POST', url, params);
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
            return this.send('PUT', url, params);
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
            return this.send('DELETE', url, params);
        }
    }, {
        key: 'setHeader',
        value: function setHeader(name, value) {

            this.headers[name] = value;
            return this;
        }

        /**
         *
         * @param {String} method
         * @param {String} url
         * @param {Object} params
         * @returns {Promise}
         */
    }, {
        key: 'send',
        value: function send(method, url, params) {
            return this.transport.send(method, url, params);
        }
    }]);

    return Agent;
})();

exports['default'] = Agent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7OztrQkFDSixJQUFJOzs7O0FBRW5CLElBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUM7QUFDaEMsUUFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN2QixXQUFPLEdBQUcsR0FBQyxHQUFHLEdBQUMsZ0JBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLENBQUE7Ozs7Ozs7O0lBUUssS0FBSztBQUVJLGFBRlQsS0FBSyxDQUVLLFNBQVMsRUFBRTs4QkFGckIsS0FBSzs7QUFJSCxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUU5Qjs7Ozs7Ozs7O2lCQU5DLEtBQUs7O2VBY0gsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVkLGVBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUV6Qzs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLGVBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4Qzs7Ozs7Ozs7OztlQVFHLGNBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNkLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6Qzs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4Qzs7Ozs7Ozs7OztlQVFLLGlCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNDOzs7ZUFFUSxtQkFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFOztBQUVuQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDM0IsbUJBQU8sSUFBSSxDQUFDO1NBRWY7Ozs7Ozs7Ozs7O2VBU0csY0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUN0QixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2xEOzs7V0E5RUMsS0FBSzs7O3FCQW1GSSxLQUFLIiwiZmlsZSI6IkFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzIGZyb20gJ2lzJztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cbnZhciBidWlsZFVybCA9IGZ1bmN0aW9uKHVybCwgcGFyYW1zKXtcbiAgICBpZighcGFyYW1zKSByZXR1cm4gdXJsO1xuICAgIHJldHVybiB1cmwrJz8nK3FzLnN0cmluZ2lmeShwYXJhbXMpO1xufVxuXG5cbi8qKlxuICogSHR0cCBwcm92aWRlcyBhbiBhcGkgc2ltaWxhciB0byBhbmd1bGFyJ3MgJGh0dHAuXG4gKiBVc2VzIHByb21pc2VzIGZvciBzYW5pdHkgYW5kIGxlc3Mgc3Vjay5cbiAqIEBwYXJhbSB7SFRUUFRyYW5zcG9ydH0gdHJhbnNwb3J0XG4gKi9cbmNsYXNzIEFnZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHRyYW5zcG9ydCkge1xuXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgaGVhZCh1cmwsIHBhcmFtcykge1xuXG4gICAgICAgIHVybCA9IGJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnSEVBRCcsIHVybCwgcGFyYW1zKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGdldCh1cmwsIHBhcmFtcykge1xuICAgICAgICB1cmwgPSBidWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ0dFVCcsIHVybCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwb3N0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ1BPU1QnLCB1cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcHV0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ1BVVCcsIHVybCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGUodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnREVMRVRFJywgdXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHNldEhlYWRlcihuYW1lLCB2YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgc2VuZChtZXRob2QsIHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKG1ldGhvZCwgdXJsLCBwYXJhbXMpXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWdlbnQ7XG5cbiJdfQ==