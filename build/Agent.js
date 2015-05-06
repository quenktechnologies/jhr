'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _HTTPRequest = require('./HTTPRequest');

var _HTTPRequest2 = _interopRequireDefault(_HTTPRequest);

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

            url = _Utils2['default'].buildUrl(url, params);
            return this.send('HEAD', url);
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
            url = _Utils2['default'].buildUrl(url, params);
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

            var self = this;

            return new Promise(function (resolve, reject) {

                self.transport.send(method, url, params, function (err, res) {

                    if (err) return reject(err, res);
                    resolve(res);
                });
            });
        }
    }]);

    return Agent;
})();

exports['default'] = Agent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7OztxQkFFRCxTQUFTOzs7OzJCQUNILGVBQWU7Ozs7Ozs7Ozs7SUFVakMsS0FBSztBQUVJLGFBRlQsS0FBSyxDQUVLLFNBQVMsRUFBRTs4QkFGckIsS0FBSzs7QUFJSCxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUU5Qjs7aUJBTkMsS0FBSzs7Ozs7Ozs7O2VBY0gsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVkLGVBQUcsR0FBRyxtQkFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBRWpDOzs7Ozs7Ozs7O2VBUUUsYUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2IsZUFBRyxHQUFHLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDOzs7Ozs7Ozs7O2VBUUcsY0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2QsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pDOzs7Ozs7Ozs7O2VBUUUsYUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDOzs7Ozs7Ozs7O2VBUUssaUJBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNoQixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7OztlQUVRLG1CQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7O0FBRW5CLGdCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUMzQixtQkFBTyxJQUFJLENBQUM7U0FFZjs7Ozs7Ozs7Ozs7ZUFTRyxjQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUV0QixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7O0FBRTFDLG9CQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUU7O0FBRXhELHdCQUFHLEdBQUcsRUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsMkJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFFaEIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBQ047OztXQXpGQyxLQUFLOzs7cUJBOEZJLEtBQUsiLCJmaWxlIjoic3JjL0FnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzIGZyb20gJ2lzJztcblxuaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IEhUVFBSZXF1ZXN0IGZyb20gJy4vSFRUUFJlcXVlc3QnO1xuXG5cblxuXG4vKipcbiAqIEh0dHAgcHJvdmlkZXMgYW4gYXBpIHNpbWlsYXIgdG8gYW5ndWxhcidzICRodHRwLlxuICogVXNlcyBwcm9taXNlcyBmb3Igc2FuaXR5IGFuZCBsZXNzIHN1Y2suXG4gKiBAcGFyYW0ge0hUVFBUcmFuc3BvcnR9IHRyYW5zcG9ydFxuICovXG5jbGFzcyBBZ2VudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc3BvcnQpIHtcblxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGhlYWQodXJsLCBwYXJhbXMpIHtcblxuICAgICAgICB1cmwgPSBVdGlscy5idWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoJ0hFQUQnLCB1cmwpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZ2V0KHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHVybCA9IFV0aWxzLmJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnR0VUJywgdXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHBvc3QodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnUE9TVCcsIHVybCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwdXQodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnUFVUJywgdXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZSh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdERUxFVEUnLCB1cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgc2V0SGVhZGVyKG5hbWUsIHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzZW5kKG1ldGhvZCwgdXJsLCBwYXJhbXMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgc2VsZi50cmFuc3BvcnQuc2VuZChtZXRob2QsIHVybCwgcGFyYW1zLCBmdW5jdGlvbihlcnIsIHJlcykge1xuXG4gICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVyciwgcmVzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBZ2VudDtcblxuIl19