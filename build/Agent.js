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

    _createClass(Agent, [{
        key: 'head',

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
        value: function head(url, params) {

            url = buildUrl(url, params);
            return this.send('HEAD', url, params);
        }
    }, {
        key: 'get',

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
        value: function get(url, params) {
            url = buildUrl(url, params);
            return this.send('GET', url, params);
        }
    }, {
        key: 'post',

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
        value: function post(url, params) {
            return this.send('POST', url, params);
        }
    }, {
        key: 'put',

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
        value: function put(url, params) {
            return this.send('PUT', url, params);
        }
    }, {
        key: 'delete',

        /**
         *
         * @param {String} url
         * @param {Object} params
         * @return {Promise}
         */
        value: function _delete(url, params) {
            return this.send('DELETE', url, params);
        }
    }, {
        key: 'setHeader',
        value: function setHeader(name, value) {

            this.headers[name] = value;
            return this;
        }
    }, {
        key: 'send',

        /**
         *
         * @param {String} method
         * @param {String} url
         * @param {Object} params
         * @returns {Promise}
         */
        value: function send(method, url, params) {
            return this.transport.send(method, url, params);
        }
    }]);

    return Agent;
})();

exports['default'] = Agent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7OztrQkFDSixJQUFJOzs7O0FBRW5CLElBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUM7QUFDaEMsUUFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN2QixXQUFPLEdBQUcsR0FBQyxHQUFHLEdBQUMsZ0JBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLENBQUE7Ozs7Ozs7O0lBUUssS0FBSztBQUVJLGFBRlQsS0FBSyxDQUVLLFNBQVMsRUFBRTs4QkFGckIsS0FBSzs7QUFJSCxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUU5Qjs7aUJBTkMsS0FBSzs7Ozs7Ozs7O2VBY0gsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVkLGVBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUV6Qzs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLGVBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4Qzs7Ozs7Ozs7OztlQVFHLGNBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNkLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6Qzs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4Qzs7Ozs7Ozs7OztlQVFLLGlCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNDOzs7ZUFFUSxtQkFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFOztBQUVuQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDM0IsbUJBQU8sSUFBSSxDQUFDO1NBRWY7Ozs7Ozs7Ozs7O2VBU0csY0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUN0QixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2xEOzs7V0E5RUMsS0FBSzs7O3FCQW1GSSxLQUFLIiwiZmlsZSI6InNyYy9BZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpcyBmcm9tICdpcyc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuXG52YXIgYnVpbGRVcmwgPSBmdW5jdGlvbih1cmwsIHBhcmFtcyl7XG4gICAgaWYoIXBhcmFtcykgcmV0dXJuIHVybDtcbiAgICByZXR1cm4gdXJsKyc/Jytxcy5zdHJpbmdpZnkocGFyYW1zKTtcbn1cblxuXG4vKipcbiAqIEh0dHAgcHJvdmlkZXMgYW4gYXBpIHNpbWlsYXIgdG8gYW5ndWxhcidzICRodHRwLlxuICogVXNlcyBwcm9taXNlcyBmb3Igc2FuaXR5IGFuZCBsZXNzIHN1Y2suXG4gKiBAcGFyYW0ge0hUVFBUcmFuc3BvcnR9IHRyYW5zcG9ydFxuICovXG5jbGFzcyBBZ2VudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc3BvcnQpIHtcblxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGhlYWQodXJsLCBwYXJhbXMpIHtcblxuICAgICAgICB1cmwgPSBidWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ0hFQUQnLCB1cmwsIHBhcmFtcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXQodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgdXJsID0gYnVpbGRVcmwodXJsLCBwYXJhbXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdHRVQnLCB1cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcG9zdCh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdQT1NUJywgdXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHB1dCh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdQVVQnLCB1cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ0RFTEVURScsIHVybCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBzZXRIZWFkZXIobmFtZSwgdmFsdWUpIHtcblxuICAgICAgICB0aGlzLmhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHNlbmQobWV0aG9kLCB1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuc2VuZChtZXRob2QsIHVybCwgcGFyYW1zKVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFnZW50O1xuXG4iXX0=