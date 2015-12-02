'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _buildUrl = require('./buildUrl');

var _buildUrl2 = _interopRequireDefault(_buildUrl);

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
            url = (0, _buildUrl2['default'])(url, params);
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
            url = (0, _buildUrl2['default'])(url, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQXFCLFlBQVk7Ozs7Ozs7Ozs7SUFPM0IsS0FBSztBQUVJLGFBRlQsS0FBSyxDQUVLLFNBQVMsRUFBRTs4QkFGckIsS0FBSzs7QUFHSCxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUM5Qjs7Ozs7Ozs7O2lCQUpDLEtBQUs7O2VBWUgsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2QsZUFBRyxHQUFHLDJCQUFTLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM1QixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzNEOzs7Ozs7Ozs7O2VBUUUsYUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2IsZUFBRyxHQUFHLDJCQUFTLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM1QixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzFEOzs7Ozs7Ozs7O2VBUUcsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2QsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMzRDs7Ozs7Ozs7OztlQVFFLGFBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNiLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDMUQ7Ozs7Ozs7Ozs7ZUFRSyxpQkFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2hCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDN0Q7OztlQUVRLG1CQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7QUFDbkIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzNCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7Ozs7Ozs7Ozs7ZUFVRyxjQUFDLEdBQUcsRUFBRTtBQUNOLG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2xDOzs7V0F6RUMsS0FBSzs7O3FCQThFSSxLQUFLIiwiZmlsZSI6IkFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkVXJsIGZyb20gJy4vYnVpbGRVcmwnO1xuXG4vKipcbiAqIEh0dHAgcHJvdmlkZXMgYW4gYXBpIHNpbWlsYXIgdG8gYW5ndWxhcidzICRodHRwLlxuICogVXNlcyBwcm9taXNlcyBmb3Igc2FuaXR5IGFuZCBsZXNzIHN1Y2suXG4gKiBAcGFyYW0ge0hUVFBUcmFuc3BvcnR9IHRyYW5zcG9ydFxuICovXG5jbGFzcyBBZ2VudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc3BvcnQpIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgaGVhZCh1cmwsIHBhcmFtcykge1xuICAgICAgICB1cmwgPSBidWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoe21ldGhvZDonSEVBRCcsIHVybDp1cmwsIGJvZHk6cGFyYW1zfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZ2V0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHVybCA9IGJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7bWV0aG9kOidHRVQnLCB1cmw6dXJsLCBib2R5OnBhcmFtc30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHBvc3QodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7bWV0aG9kOidQT1NUJywgdXJsOnVybCwgYm9keTpwYXJhbXN9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwdXQodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7bWV0aG9kOidQVVQnLCB1cmw6dXJsLCBib2R5OnBhcmFtc30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZSh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKHttZXRob2Q6J0RFTEVURScsIHVybDp1cmwsIGJvZHk6cGFyYW1zfSk7XG4gICAgfVxuXG4gICAgc2V0SGVhZGVyKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxLm1ldGhvZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXEudXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtyZXEucGFyYW1zXVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHNlbmQocmVxKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKHJlcSlcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBZ2VudDtcblxuIl19