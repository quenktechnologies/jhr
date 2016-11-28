'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = undefined;
exports.create = create;

var _JHRError2 = require('./JHRError');

var _JHRError3 = _interopRequireDefault(_JHRError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ClientError
 * @param {number} status
 * @param {string} message
 * @param {object} body
 * @param {string} rawResponse
 */
var ClientError = function (_JHRError) {
    _inherits(ClientError, _JHRError);

    function ClientError(status, message, body, rawResponse) {
        _classCallCheck(this, ClientError);

        var _this = _possibleConstructorReturn(this, (ClientError.__proto__ || Object.getPrototypeOf(ClientError)).call(this, message));

        _this.status = status;
        _this.body = body;
        _this.rawResponse = rawResponse;

        return _this;
    }

    return ClientError;
}(_JHRError3.default);

/* @todo expand list of supported errors */


exports.default = ClientError;

var BadRequest = exports.BadRequest = function (_ClientError) {
    _inherits(BadRequest, _ClientError);

    function BadRequest() {
        _classCallCheck(this, BadRequest);

        return _possibleConstructorReturn(this, (BadRequest.__proto__ || Object.getPrototypeOf(BadRequest)).apply(this, arguments));
    }

    return BadRequest;
}(ClientError);

var Unauthorized = exports.Unauthorized = function (_ClientErorr) {
    _inherits(Unauthorized, _ClientErorr);

    function Unauthorized() {
        _classCallCheck(this, Unauthorized);

        return _possibleConstructorReturn(this, (Unauthorized.__proto__ || Object.getPrototypeOf(Unauthorized)).apply(this, arguments));
    }

    return Unauthorized;
}(ClientErorr);

var Forbidden = exports.Forbidden = function (_ClientError2) {
    _inherits(Forbidden, _ClientError2);

    function Forbidden() {
        _classCallCheck(this, Forbidden);

        return _possibleConstructorReturn(this, (Forbidden.__proto__ || Object.getPrototypeOf(Forbidden)).apply(this, arguments));
    }

    return Forbidden;
}(ClientError);

var NotFound = exports.NotFound = function (_ClientError3) {
    _inherits(NotFound, _ClientError3);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    return NotFound;
}(ClientError);

var Conflict = exports.Conflict = function (_ClientError4) {
    _inherits(Conflict, _ClientError4);

    function Conflict() {
        _classCallCheck(this, Conflict);

        return _possibleConstructorReturn(this, (Conflict.__proto__ || Object.getPrototypeOf(Conflict)).apply(this, arguments));
    }

    return Conflict;
}(ClientError);

var STATUS = {

    400: BadRequest,
    401: Unauthorized,
    403: Forbidden,
    404: NotFound,
    409: Conflict
};

function create(status, message, body, rawResponse) {

    if (STATUS.hasOwnProperty(status)) return new STATUS[status](status, message, body, rawResponse);

    return new ClientError(status, message, body, rawResponse);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGllbnRFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJDbGllbnRFcnJvciIsInN0YXR1cyIsIm1lc3NhZ2UiLCJib2R5IiwicmF3UmVzcG9uc2UiLCJCYWRSZXF1ZXN0IiwiVW5hdXRob3JpemVkIiwiQ2xpZW50RXJvcnIiLCJGb3JiaWRkZW4iLCJOb3RGb3VuZCIsIkNvbmZsaWN0IiwiU1RBVFVTIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7OztRQXNDZ0JBLE0sR0FBQUEsTTs7QUF0Q2hCOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU9xQkMsVzs7O0FBRWpCLHlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBbUNDLFdBQW5DLEVBQWdEO0FBQUE7O0FBQUEsOEhBRXRDRixPQUZzQzs7QUFHNUMsY0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsY0FBS0UsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBTDRDO0FBTy9DOzs7OztBQUlMOzs7a0JBYnFCSixXOztJQWNSSyxVLFdBQUFBLFU7Ozs7Ozs7Ozs7RUFBbUJMLFc7O0lBQ25CTSxZLFdBQUFBLFk7Ozs7Ozs7Ozs7RUFBcUJDLFc7O0lBQ3JCQyxTLFdBQUFBLFM7Ozs7Ozs7Ozs7RUFBa0JSLFc7O0lBQ2xCUyxRLFdBQUFBLFE7Ozs7Ozs7Ozs7RUFBaUJULFc7O0lBQ2pCVSxRLFdBQUFBLFE7Ozs7Ozs7Ozs7RUFBaUJWLFc7O0FBRTlCLElBQU1XLFNBQVM7O0FBRVgsU0FBS04sVUFGTTtBQUdYLFNBQUtDLFlBSE07QUFJWCxTQUFLRSxTQUpNO0FBS1gsU0FBS0MsUUFMTTtBQU1YLFNBQUtDO0FBTk0sQ0FBZjs7QUFTTyxTQUFTWCxNQUFULENBQWdCRSxNQUFoQixFQUF3QkMsT0FBeEIsRUFBaUNDLElBQWpDLEVBQXVDQyxXQUF2QyxFQUFvRDs7QUFFdkQsUUFBSU8sT0FBT0MsY0FBUCxDQUFzQlgsTUFBdEIsQ0FBSixFQUNJLE9BQU8sSUFBSVUsT0FBT1YsTUFBUCxDQUFKLENBQW1CQSxNQUFuQixFQUEyQkMsT0FBM0IsRUFBb0NDLElBQXBDLEVBQTBDQyxXQUExQyxDQUFQOztBQUVKLFdBQU8sSUFBSUosV0FBSixDQUFnQkMsTUFBaEIsRUFBd0JDLE9BQXhCLEVBQWlDQyxJQUFqQyxFQUF1Q0MsV0FBdkMsQ0FBUDtBQUVIIiwiZmlsZSI6IkNsaWVudEVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpIUkVycm9yIGZyb20gJy4vSkhSRXJyb3InO1xuXG4vKipcbiAqIENsaWVudEVycm9yXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtvYmplY3R9IGJvZHlcbiAqIEBwYXJhbSB7c3RyaW5nfSByYXdSZXNwb25zZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRFcnJvciBleHRlbmRzIEpIUkVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgbWVzc2FnZSwgYm9keSwgcmF3UmVzcG9uc2UpIHtcblxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMucmF3UmVzcG9uc2UgPSByYXdSZXNwb25zZTtcblxuICAgIH1cblxufVxuXG4vKiBAdG9kbyBleHBhbmQgbGlzdCBvZiBzdXBwb3J0ZWQgZXJyb3JzICovXG5leHBvcnQgY2xhc3MgQmFkUmVxdWVzdCBleHRlbmRzIENsaWVudEVycm9yIHt9XG5leHBvcnQgY2xhc3MgVW5hdXRob3JpemVkIGV4dGVuZHMgQ2xpZW50RXJvcnIge31cbmV4cG9ydCBjbGFzcyBGb3JiaWRkZW4gZXh0ZW5kcyBDbGllbnRFcnJvciB7fVxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ2xpZW50RXJyb3Ige31cbmV4cG9ydCBjbGFzcyBDb25mbGljdCBleHRlbmRzIENsaWVudEVycm9yIHt9XG5cbmNvbnN0IFNUQVRVUyA9IHtcblxuICAgIDQwMDogQmFkUmVxdWVzdCxcbiAgICA0MDE6IFVuYXV0aG9yaXplZCxcbiAgICA0MDM6IEZvcmJpZGRlbixcbiAgICA0MDQ6IE5vdEZvdW5kLFxuICAgIDQwOTogQ29uZmxpY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShzdGF0dXMsIG1lc3NhZ2UsIGJvZHksIHJhd1Jlc3BvbnNlKSB7XG5cbiAgICBpZiAoU1RBVFVTLmhhc093blByb3BlcnR5KHN0YXR1cykpXG4gICAgICAgIHJldHVybiBuZXcgU1RBVFVTW3N0YXR1c10oc3RhdHVzLCBtZXNzYWdlLCBib2R5LCByYXdSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gbmV3IENsaWVudEVycm9yKHN0YXR1cywgbWVzc2FnZSwgYm9keSwgcmF3UmVzcG9uc2UpO1xuXG59XG4iXX0=