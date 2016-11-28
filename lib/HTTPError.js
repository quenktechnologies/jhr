'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InternalServerError = exports.ServerError = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.ClientError = undefined;
exports.create = create;

var _JHRError2 = require('./JHRError');

var _JHRError3 = _interopRequireDefault(_JHRError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HTTPError = function (_JHRError) {
    _inherits(HTTPError, _JHRError);

    function HTTPError(status, text, body, rawResponse) {
        _classCallCheck(this, HTTPError);

        var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, text));

        _this.status = status;
        _this.body = body;
        _this.rawResponse = rawResponse;

        return _this;
    }

    return HTTPError;
}(_JHRError3.default);

/* @todo expand list of supported errors */


exports.default = HTTPError;

var ClientError = exports.ClientError = function (_HTTPError) {
    _inherits(ClientError, _HTTPError);

    function ClientError() {
        _classCallCheck(this, ClientError);

        return _possibleConstructorReturn(this, (ClientError.__proto__ || Object.getPrototypeOf(ClientError)).apply(this, arguments));
    }

    return ClientError;
}(HTTPError);

var BadRequest = exports.BadRequest = function (_ClientError) {
    _inherits(BadRequest, _ClientError);

    function BadRequest() {
        _classCallCheck(this, BadRequest);

        return _possibleConstructorReturn(this, (BadRequest.__proto__ || Object.getPrototypeOf(BadRequest)).apply(this, arguments));
    }

    return BadRequest;
}(ClientError);

var Unauthorized = exports.Unauthorized = function (_ClientError2) {
    _inherits(Unauthorized, _ClientError2);

    function Unauthorized() {
        _classCallCheck(this, Unauthorized);

        return _possibleConstructorReturn(this, (Unauthorized.__proto__ || Object.getPrototypeOf(Unauthorized)).apply(this, arguments));
    }

    return Unauthorized;
}(ClientError);

var Forbidden = exports.Forbidden = function (_ClientError3) {
    _inherits(Forbidden, _ClientError3);

    function Forbidden() {
        _classCallCheck(this, Forbidden);

        return _possibleConstructorReturn(this, (Forbidden.__proto__ || Object.getPrototypeOf(Forbidden)).apply(this, arguments));
    }

    return Forbidden;
}(ClientError);

var NotFound = exports.NotFound = function (_ClientError4) {
    _inherits(NotFound, _ClientError4);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    return NotFound;
}(ClientError);

var Conflict = exports.Conflict = function (_ClientError5) {
    _inherits(Conflict, _ClientError5);

    function Conflict() {
        _classCallCheck(this, Conflict);

        return _possibleConstructorReturn(this, (Conflict.__proto__ || Object.getPrototypeOf(Conflict)).apply(this, arguments));
    }

    return Conflict;
}(ClientError);

var ServerError = exports.ServerError = function (_HTTPError2) {
    _inherits(ServerError, _HTTPError2);

    function ServerError() {
        _classCallCheck(this, ServerError);

        return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).apply(this, arguments));
    }

    return ServerError;
}(HTTPError);

var InternalServerError = exports.InternalServerError = function (_ServerError) {
    _inherits(InternalServerError, _ServerError);

    function InternalServerError() {
        _classCallCheck(this, InternalServerError);

        return _possibleConstructorReturn(this, (InternalServerError.__proto__ || Object.getPrototypeOf(InternalServerError)).apply(this, arguments));
    }

    return InternalServerError;
}(ServerError);

var MAP = {

    400: BadRequest,
    401: Unauthorized,
    403: Forbidden,
    404: NotFound,
    409: Conflict,
    500: InternalServerError
};

/**
 * create is a helper function for creating the correct error from a
 * response.
 * @param {number} status
 * @param {string} text
 * @param {object} [body]
 * @param {string} [rawResponse]
 */
function create(status, text, body, rawResponse) {

    if (MAP.hasOwnProperty(status)) return new MAP[status](status, text, body, rawResponse);

    if (status >= 500) return new ServerError(status, text, body, rawResponse);

    return new ClientError(status, text, body, rawResponse);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiSFRUUEVycm9yIiwic3RhdHVzIiwidGV4dCIsImJvZHkiLCJyYXdSZXNwb25zZSIsIkNsaWVudEVycm9yIiwiQmFkUmVxdWVzdCIsIlVuYXV0aG9yaXplZCIsIkZvcmJpZGRlbiIsIk5vdEZvdW5kIiwiQ29uZmxpY3QiLCJTZXJ2ZXJFcnJvciIsIkludGVybmFsU2VydmVyRXJyb3IiLCJNQVAiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBMkNnQkEsTSxHQUFBQSxNOztBQTNDaEI7Ozs7Ozs7Ozs7OztJQUVxQkMsUzs7O0FBRWpCLHVCQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQkMsSUFBMUIsRUFBZ0NDLFdBQWhDLEVBQTZDO0FBQUE7O0FBQUEsMEhBRW5DRixJQUZtQzs7QUFHekMsY0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsY0FBS0UsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBTHlDO0FBTzVDOzs7OztBQUlMOzs7a0JBYnFCSixTOztJQWNSSyxXLFdBQUFBLFc7Ozs7Ozs7Ozs7RUFBb0JMLFM7O0lBQ3BCTSxVLFdBQUFBLFU7Ozs7Ozs7Ozs7RUFBbUJELFc7O0lBQ25CRSxZLFdBQUFBLFk7Ozs7Ozs7Ozs7RUFBcUJGLFc7O0lBQ3JCRyxTLFdBQUFBLFM7Ozs7Ozs7Ozs7RUFBa0JILFc7O0lBQ2xCSSxRLFdBQUFBLFE7Ozs7Ozs7Ozs7RUFBaUJKLFc7O0lBQ2pCSyxRLFdBQUFBLFE7Ozs7Ozs7Ozs7RUFBaUJMLFc7O0lBQ2pCTSxXLFdBQUFBLFc7Ozs7Ozs7Ozs7RUFBb0JYLFM7O0lBQ3BCWSxtQixXQUFBQSxtQjs7Ozs7Ozs7OztFQUE0QkQsVzs7QUFFekMsSUFBTUUsTUFBTTs7QUFFUixTQUFLUCxVQUZHO0FBR1IsU0FBS0MsWUFIRztBQUlSLFNBQUtDLFNBSkc7QUFLUixTQUFLQyxRQUxHO0FBTVIsU0FBS0MsUUFORztBQU9SLFNBQUtFO0FBUEcsQ0FBWjs7QUFVQTs7Ozs7Ozs7QUFRTyxTQUFTYixNQUFULENBQWdCRSxNQUFoQixFQUF3QkMsSUFBeEIsRUFBOEJDLElBQTlCLEVBQW9DQyxXQUFwQyxFQUFpRDs7QUFFcEQsUUFBSVMsSUFBSUMsY0FBSixDQUFtQmIsTUFBbkIsQ0FBSixFQUNJLE9BQU8sSUFBSVksSUFBSVosTUFBSixDQUFKLENBQWdCQSxNQUFoQixFQUF3QkMsSUFBeEIsRUFBOEJDLElBQTlCLEVBQW9DQyxXQUFwQyxDQUFQOztBQUVKLFFBQUlILFVBQVUsR0FBZCxFQUNJLE9BQU8sSUFBSVUsV0FBSixDQUFnQlYsTUFBaEIsRUFBd0JDLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQ0MsV0FBcEMsQ0FBUDs7QUFFSixXQUFPLElBQUlDLFdBQUosQ0FBZ0JKLE1BQWhCLEVBQXdCQyxJQUF4QixFQUE4QkMsSUFBOUIsRUFBb0NDLFdBQXBDLENBQVA7QUFFSCIsImZpbGUiOiJIVFRQRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSkhSRXJyb3IgZnJvbSAnLi9KSFJFcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEpIUkVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgdGV4dCwgYm9keSwgcmF3UmVzcG9uc2UpIHtcblxuICAgICAgICBzdXBlcih0ZXh0KTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMucmF3UmVzcG9uc2UgPSByYXdSZXNwb25zZTtcblxuICAgIH1cblxufVxuXG4vKiBAdG9kbyBleHBhbmQgbGlzdCBvZiBzdXBwb3J0ZWQgZXJyb3JzICovXG5leHBvcnQgY2xhc3MgQ2xpZW50RXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBCYWRSZXF1ZXN0IGV4dGVuZHMgQ2xpZW50RXJyb3Ige31cbmV4cG9ydCBjbGFzcyBVbmF1dGhvcml6ZWQgZXh0ZW5kcyBDbGllbnRFcnJvciB7fVxuZXhwb3J0IGNsYXNzIEZvcmJpZGRlbiBleHRlbmRzIENsaWVudEVycm9yIHt9XG5leHBvcnQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBDbGllbnRFcnJvciB7fVxuZXhwb3J0IGNsYXNzIENvbmZsaWN0IGV4dGVuZHMgQ2xpZW50RXJyb3Ige31cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEhUVFBFcnJvciB7fVxuZXhwb3J0IGNsYXNzIEludGVybmFsU2VydmVyRXJyb3IgZXh0ZW5kcyBTZXJ2ZXJFcnJvciB7fVxuXG5jb25zdCBNQVAgPSB7XG5cbiAgICA0MDA6IEJhZFJlcXVlc3QsXG4gICAgNDAxOiBVbmF1dGhvcml6ZWQsXG4gICAgNDAzOiBGb3JiaWRkZW4sXG4gICAgNDA0OiBOb3RGb3VuZCxcbiAgICA0MDk6IENvbmZsaWN0LFxuICAgIDUwMDogSW50ZXJuYWxTZXJ2ZXJFcnJvclxufVxuXG4vKipcbiAqIGNyZWF0ZSBpcyBhIGhlbHBlciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgdGhlIGNvcnJlY3QgZXJyb3IgZnJvbSBhXG4gKiByZXNwb25zZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGF0dXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge29iamVjdH0gW2JvZHldXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Jhd1Jlc3BvbnNlXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHN0YXR1cywgdGV4dCwgYm9keSwgcmF3UmVzcG9uc2UpIHtcblxuICAgIGlmIChNQVAuaGFzT3duUHJvcGVydHkoc3RhdHVzKSlcbiAgICAgICAgcmV0dXJuIG5ldyBNQVBbc3RhdHVzXShzdGF0dXMsIHRleHQsIGJvZHksIHJhd1Jlc3BvbnNlKTtcblxuICAgIGlmIChzdGF0dXMgPj0gNTAwKVxuICAgICAgICByZXR1cm4gbmV3IFNlcnZlckVycm9yKHN0YXR1cywgdGV4dCwgYm9keSwgcmF3UmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIG5ldyBDbGllbnRFcnJvcihzdGF0dXMsIHRleHQsIGJvZHksIHJhd1Jlc3BvbnNlKTtcblxufVxuIl19