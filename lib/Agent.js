'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Headers = exports.Methods = exports.Request = exports.ResponseFilter = exports.CSRFAdapter = exports.Response = exports.NoTransform = exports.JSONTransform = exports.JHRError = exports.TransportError = exports.HTTPError = exports.Status = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Headers = require('./Headers');

var _Headers2 = _interopRequireDefault(_Headers);

var _Methods = require('./Methods');

var _Methods2 = _interopRequireDefault(_Methods);

var _Transform = require('./Transform');

var _Transform2 = _interopRequireDefault(_Transform);

var _JSONTransform2 = require('./JSONTransform');

var _JSONTransform3 = _interopRequireDefault(_JSONTransform2);

var _Adapter = require('./Adapter');

var _Adapter2 = _interopRequireDefault(_Adapter);

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _Status2 = require('./Status');

var _Status = _interopRequireWildcard(_Status2);

var _HTTPError2 = require('./HTTPError');

var _HTTPError = _interopRequireWildcard(_HTTPError2);

var _TransportError2 = require('./TransportError');

var _TransportError3 = _interopRequireDefault(_TransportError2);

var _JHRError2 = require('./JHRError');

var _JHRError3 = _interopRequireDefault(_JHRError2);

var _NoTransform2 = require('./NoTransform');

var _NoTransform3 = _interopRequireDefault(_NoTransform2);

var _Response2 = require('./Response');

var _Response3 = _interopRequireDefault(_Response2);

var _CSRFAdapter2 = require('./CSRFAdapter');

var _CSRFAdapter3 = _interopRequireDefault(_CSRFAdapter2);

var _ResponseFilter2 = require('./ResponseFilter');

var _ResponseFilter3 = _interopRequireDefault(_ResponseFilter2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COPIED = ['method', 'headers', 'ttl', 'query'];

/**
 * @param {Transform} [transform]
 */

var Agent = function () {
    function Agent() {
        var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _JSONTransform3.default();

        _classCallCheck(this, Agent);

        (0, _beof2.default)({ transform: transform }).interface(_Transform2.default);

        this.transform = transform;
        this.headers = {};
        this.adapters = [];
    }

    /**
     * create
     * @param {Transform} transform
     */


    _createClass(Agent, [{
        key: 'add',


        /**
         * add
         * @param {Adapter} a
         */
        value: function add(a) {

            (0, _beof2.default)({ a: a }).interface(_Adapter2.default);
            this.adapters.push(a);
            return this;
        }

        /**
         * @param {String} url
         * @param {Object} [query]
         * @param {Object} [headers]
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @return {Promise}
         */

    }, {
        key: 'head',
        value: function head(url, query, headers, maco) {

            return this.send({ method: _Methods2.default.HEAD, url: url, query: query, headers: headers }, maco);
        }

        /**
         *
         * @param {String} url
         * @param {Object} [query]
         * @param {Object} [headers]
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @return {Promise}
         */

    }, {
        key: 'get',
        value: function get(url, query, headers, maco) {

            return this.send({ method: _Methods2.default.GET, url: url, query: query, headers: headers }, maco);
        }

        /**
         * @param {String} url
         * @param {Object} body
         * @param {Object} [headers]
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @return {Promise}
         */

    }, {
        key: 'post',
        value: function post(url, body, headers, maco) {

            return this.send({ method: _Methods2.default.POST, url: url, body: body, headers: headers }, maco);
        }

        /**
         * @param {String} url
         * @param {Object} body
         * @param {Object} [headers]
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @return {Promise}
         */

    }, {
        key: 'put',
        value: function put(url, body, headers, maco) {

            return this.send({ method: _Methods2.default.PUT, url: url, body: body, headers: headers }, maco);
        }

        /**
         * @param {String} url
         * @param {Object} body
         * @param {Object} [headers]
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @return {Promise}
         */

    }, {
        key: 'delete',
        value: function _delete(url, body, headers, maco, ErrorMaco) {

            return this.send({ method: _Methods2.default.DELETE, url: url, body: body, headers: headers }, maco);
        }

        /**
         * @param {Object} req
         * @param {Maco} [maco]
         * @param {ErrorMaco} [errorMaco]
         * @returns {Promise}
         */

    }, {
        key: 'send',
        value: function send(req, maco) {

            return this.newRequest(req, maco).execute();
        }

        /**
         * newRequest creates a new Request from an object descriptor.
         * @param {object} req
         * @param {Request.Maco} [maco]
         * @param {Request.ErrorMaco} [errorMaco]
         */

    }, {
        key: 'newRequest',
        value: function newRequest(req, maco) {

            var ret = new _Request2.default(req.method, req.url, this, maco);

            COPIED.forEach(function (k) {
                if (req.hasOwnProperty(k)) if (req[k] != null) ret[k] = req[k];
            });

            if (!req.method) throw new ReferenceError('No method supplied!');

            if (!req.method) throw new ReferenceError('No url specified!');

            if (ret.method === _Methods2.default.GET || ret.method === _Methods2.default.HEAD) {

                ret.headers[_Headers2.default.ACCEPT] = this.transform.accepts();
            } else {

                ret.headers[_Headers2.default.CONTENT_TYPE] = this.transform.contentType();
                ret.body = this.transform.parseRequestBody(req.body);
            }

            return ret;
        }
    }], [{
        key: 'create',
        value: function create(transform) {

            return new Agent(transform);
        }

        /**
         * send
         * @param {object} request
         * @param {Maco} maco
         */

    }, {
        key: 'send',
        value: function send(request, maco) {

            return Agent.create().send(request);
        }
    }]);

    return Agent;
}();

/* jshint ignore: start */


exports.Status = _Status;
exports.HTTPError = _HTTPError;
exports.TransportError = _TransportError3.default;
exports.JHRError = _JHRError3.default;
exports.JSONTransform = _JSONTransform3.default;
exports.NoTransform = _NoTransform3.default;
exports.Response = _Response3.default;
exports.CSRFAdapter = _CSRFAdapter3.default;
exports.ResponseFilter = _ResponseFilter3.default;
/* jshint ignore: end */

exports.Request = _Request2.default;
exports.Methods = _Methods2.default;
exports.Headers = _Headers2.default;
exports.default = Agent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2VudC5qcyJdLCJuYW1lcyI6WyJDT1BJRUQiLCJBZ2VudCIsInRyYW5zZm9ybSIsImludGVyZmFjZSIsImhlYWRlcnMiLCJhZGFwdGVycyIsImEiLCJwdXNoIiwidXJsIiwicXVlcnkiLCJtYWNvIiwic2VuZCIsIm1ldGhvZCIsIkhFQUQiLCJHRVQiLCJib2R5IiwiUE9TVCIsIlBVVCIsIkVycm9yTWFjbyIsIkRFTEVURSIsInJlcSIsIm5ld1JlcXVlc3QiLCJleGVjdXRlIiwicmV0IiwiZm9yRWFjaCIsImhhc093blByb3BlcnR5IiwiayIsIlJlZmVyZW5jZUVycm9yIiwiQUNDRVBUIiwiYWNjZXB0cyIsIkNPTlRFTlRfVFlQRSIsImNvbnRlbnRUeXBlIiwicGFyc2VSZXF1ZXN0Qm9keSIsInJlcXVlc3QiLCJjcmVhdGUiLCJTdGF0dXMiLCJIVFRQRXJyb3IiLCJUcmFuc3BvcnRFcnJvciIsIkpIUkVycm9yIiwiSlNPTlRyYW5zZm9ybSIsIk5vVHJhbnNmb3JtIiwiUmVzcG9uc2UiLCJDU1JGQWRhcHRlciIsIlJlc3BvbnNlRmlsdGVyIiwiUmVxdWVzdCIsIk1ldGhvZHMiLCJIZWFkZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLEtBQXRCLEVBQTZCLE9BQTdCLENBQWY7O0FBRUE7Ozs7SUFHTUMsSztBQUVGLHFCQUE2QztBQUFBLFlBQWpDQyxTQUFpQyx1RUFBckIsNkJBQXFCOztBQUFBOztBQUV6Qyw0QkFBSyxFQUFFQSxvQkFBRixFQUFMLEVBQW9CQyxTQUFwQjs7QUFFQSxhQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLGFBQUtFLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS0MsUUFBTCxH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QUosR0FBVyxLQUFLYixTQUFMLENBQWU4QixnQkFBZixDQUFnQ1osSUFBSUwsSUFBcEMsQ0FBWDtBQUVIOztBQUVELG1CQUFPUSxHQUFQO0FBRUg7OzsrQkFsSmFyQixTLEVBQVc7O0FBRXJCLG1CQUFPLElBQUlELEtBQUosQ0FBVUMsU0FBVixDQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7OzZCQUtZK0IsTyxFQUFTdkIsSSxFQUFNOztBQUV2QixtQkFBT1QsTUFBTWlDLE1BQU4sR0FBZXZCLElBQWYsQ0FBb0JzQixPQUFwQixDQUFQO0FBRUg7Ozs7OztBQXVJTDs7O1FBQ1lFLE07UUFDQUMsUztRQUNMQyxjO1FBQ0FDLFE7UUFDQUMsYTtRQUNBQyxXO1FBQ0FDLFE7UUFDQUMsVztRQUNBQyxjO0FBQ1A7O1FBRVNDLE87UUFBU0MsTztRQUFTQyxPO2tCQUNaN0MsSyIsImZpbGUiOiJBZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEhlYWRlcnMgZnJvbSAnLi9IZWFkZXJzJztcbmltcG9ydCBNZXRob2RzIGZyb20gJy4vTWV0aG9kcyc7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gJy4vVHJhbnNmb3JtJztcbmltcG9ydCBKU09OVHJhbnNmb3JtIGZyb20gJy4vSlNPTlRyYW5zZm9ybSc7XG5pbXBvcnQgQWRhcHRlciBmcm9tICcuL0FkYXB0ZXInO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0JztcblxuY29uc3QgQ09QSUVEID0gWydtZXRob2QnLCAnaGVhZGVycycsICd0dGwnLCAncXVlcnknXTtcblxuLyoqXG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gW3RyYW5zZm9ybV1cbiAqL1xuY2xhc3MgQWdlbnQge1xuXG4gICAgY29uc3RydWN0b3IodHJhbnNmb3JtID0gbmV3IEpTT05UcmFuc2Zvcm0oKSkge1xuXG4gICAgICAgIGJlb2YoeyB0cmFuc2Zvcm0gfSkuaW50ZXJmYWNlKFRyYW5zZm9ybSk7XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHt9O1xuICAgICAgICB0aGlzLmFkYXB0ZXJzID0gW107XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge1RyYW5zZm9ybX0gdHJhbnNmb3JtXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSh0cmFuc2Zvcm0pIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFnZW50KHRyYW5zZm9ybSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZW5kXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0ge01hY299IG1hY29cbiAgICAgKi9cbiAgICBzdGF0aWMgc2VuZChyZXF1ZXN0LCBtYWNvKSB7XG5cbiAgICAgICAgcmV0dXJuIEFnZW50LmNyZWF0ZSgpLnNlbmQocmVxdWVzdCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGRcbiAgICAgKiBAcGFyYW0ge0FkYXB0ZXJ9IGFcbiAgICAgKi9cbiAgICBhZGQoYSkge1xuXG4gICAgICAgIGJlb2YoeyBhIH0pLmludGVyZmFjZShBZGFwdGVyKTtcbiAgICAgICAgdGhpcy5hZGFwdGVycy5wdXNoKGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaGVhZGVyc11cbiAgICAgKiBAcGFyYW0ge01hY299IFttYWNvXVxuICAgICAqIEBwYXJhbSB7RXJyb3JNYWNvfSBbZXJyb3JNYWNvXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgaGVhZCh1cmwsIHF1ZXJ5LCBoZWFkZXJzLCBtYWNvKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7IG1ldGhvZDogTWV0aG9kcy5IRUFELCB1cmwsIHF1ZXJ5LCBoZWFkZXJzIH0sIG1hY28pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtxdWVyeV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2hlYWRlcnNdXG4gICAgICogQHBhcmFtIHtNYWNvfSBbbWFjb11cbiAgICAgKiBAcGFyYW0ge0Vycm9yTWFjb30gW2Vycm9yTWFjb11cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGdldCh1cmwsIHF1ZXJ5LCBoZWFkZXJzLCBtYWNvKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7IG1ldGhvZDogTWV0aG9kcy5HRVQsIHVybCwgcXVlcnksIGhlYWRlcnMgfSwgbWFjbyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2hlYWRlcnNdXG4gICAgICogQHBhcmFtIHtNYWNvfSBbbWFjb11cbiAgICAgKiBAcGFyYW0ge0Vycm9yTWFjb30gW2Vycm9yTWFjb11cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHBvc3QodXJsLCBib2R5LCBoZWFkZXJzLCBtYWNvKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCh7IG1ldGhvZDogTWV0aG9kcy5QT1NULCB1cmwsIGJvZHksIGhlYWRlcnMgfSwgbWFjbyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2hlYWRlcnNdXG4gICAgICogQHBhcmFtIHtNYWNvfSBbbWFjb11cbiAgICAgKiBAcGFyYW0ge0Vycm9yTWFjb30gW2Vycm9yTWFjb11cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHB1dCh1cmwsIGJvZHksIGhlYWRlcnMsIG1hY28pIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKHsgbWV0aG9kOiBNZXRob2RzLlBVVCwgdXJsLCBib2R5LCBoZWFkZXJzIH0sIG1hY28pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXVxuICAgICAqIEBwYXJhbSB7TWFjb30gW21hY29dXG4gICAgICogQHBhcmFtIHtFcnJvck1hY299IFtlcnJvck1hY29dXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGUodXJsLCBib2R5LCBoZWFkZXJzLCBtYWNvLCBFcnJvck1hY28pIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKHsgbWV0aG9kOiBNZXRob2RzLkRFTEVURSwgdXJsLCBib2R5LCBoZWFkZXJzIH0sIG1hY28pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlcVxuICAgICAqIEBwYXJhbSB7TWFjb30gW21hY29dXG4gICAgICogQHBhcmFtIHtFcnJvck1hY299IFtlcnJvck1hY29dXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgc2VuZChyZXEsIG1hY28pIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5uZXdSZXF1ZXN0KHJlcSwgbWFjbykuZXhlY3V0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG5ld1JlcXVlc3QgY3JlYXRlcyBhIG5ldyBSZXF1ZXN0IGZyb20gYW4gb2JqZWN0IGRlc2NyaXB0b3IuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdC5NYWNvfSBbbWFjb11cbiAgICAgKiBAcGFyYW0ge1JlcXVlc3QuRXJyb3JNYWNvfSBbZXJyb3JNYWNvXVxuICAgICAqL1xuICAgIG5ld1JlcXVlc3QocmVxLCBtYWNvKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IG5ldyBSZXF1ZXN0KHJlcS5tZXRob2QsIHJlcS51cmwsIHRoaXMsIG1hY28pO1xuXG4gICAgICAgIENPUElFRC5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICBpZiAocmVxW2tdICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldFtrXSA9IHJlcVtrXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFyZXEubWV0aG9kKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBObyBtZXRob2Qgc3VwcGxpZWQhYCk7XG5cbiAgICAgICAgaWYgKCFyZXEubWV0aG9kKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBObyB1cmwgc3BlY2lmaWVkIWApO1xuXG4gICAgICAgIGlmICgocmV0Lm1ldGhvZCA9PT0gTWV0aG9kcy5HRVQpIHx8IChyZXQubWV0aG9kID09PSBNZXRob2RzLkhFQUQpKSB7XG5cbiAgICAgICAgICAgIHJldC5oZWFkZXJzW0hlYWRlcnMuQUNDRVBUXSA9IHRoaXMudHJhbnNmb3JtLmFjY2VwdHMoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXQuaGVhZGVyc1tIZWFkZXJzLkNPTlRFTlRfVFlQRV0gPSB0aGlzLnRyYW5zZm9ybS5jb250ZW50VHlwZSgpO1xuICAgICAgICAgICAgcmV0LmJvZHkgPSB0aGlzLnRyYW5zZm9ybS5wYXJzZVJlcXVlc3RCb2R5KHJlcS5ib2R5KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxufVxuXG4vKiBqc2hpbnQgaWdub3JlOiBzdGFydCAqL1xuZXhwb3J0ICogYXMgU3RhdHVzIGZyb20gJy4vU3RhdHVzJztcbmV4cG9ydCAqIGFzIEhUVFBFcnJvciBmcm9tICcuL0hUVFBFcnJvcic7XG5leHBvcnQgVHJhbnNwb3J0RXJyb3IgZnJvbSAnLi9UcmFuc3BvcnRFcnJvcic7XG5leHBvcnQgSkhSRXJyb3IgZnJvbSAnLi9KSFJFcnJvcic7XG5leHBvcnQgSlNPTlRyYW5zZm9ybSBmcm9tICcuL0pTT05UcmFuc2Zvcm0nO1xuZXhwb3J0IE5vVHJhbnNmb3JtIGZyb20gJy4vTm9UcmFuc2Zvcm0nO1xuZXhwb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuZXhwb3J0IENTUkZBZGFwdGVyIGZyb20gJy4vQ1NSRkFkYXB0ZXInO1xuZXhwb3J0IFJlc3BvbnNlRmlsdGVyIGZyb20gJy4vUmVzcG9uc2VGaWx0ZXInO1xuLyoganNoaW50IGlnbm9yZTogZW5kICovXG5cbmV4cG9ydCB7IFJlcXVlc3QsIE1ldGhvZHMsIEhlYWRlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IEFnZW50XG4iXX0=