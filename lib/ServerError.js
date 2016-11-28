'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InternalServerError = undefined;
exports.create = create;

var _JHRError2 = require('./JHRError');

var _JHRError3 = _interopRequireDefault(_JHRError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ServerError
 * @param {number} status
 * @param {string} message
 * @param {object} body
 * @param {string} rawResponse
 */
var ServerError = function (_JHRError) {
    _inherits(ServerError, _JHRError);

    function ServerError(status, message, body, rawResponse) {
        _classCallCheck(this, ServerError);

        var _this = _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).call(this, message));

        _this.status = status;
        _this.body = body;
        _this.rawResponse = rawResponse;

        return _this;
    }

    return ServerError;
}(_JHRError3.default);

/* @todo expand list of supported errors */


exports.default = ServerError;

var InternalServerError = exports.InternalServerError = function (_ServerError) {
    _inherits(InternalServerError, _ServerError);

    function InternalServerError() {
        _classCallCheck(this, InternalServerError);

        return _possibleConstructorReturn(this, (InternalServerError.__proto__ || Object.getPrototypeOf(InternalServerError)).apply(this, arguments));
    }

    return InternalServerError;
}(ServerError);

function create(status, message, body, rawResponse) {

    if (status === 500) return new InternalServerError(status, message, body, rawResponse);

    return new ServerError(status, message, body, rawResponse);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJTZXJ2ZXJFcnJvciIsInN0YXR1cyIsIm1lc3NhZ2UiLCJib2R5IiwicmF3UmVzcG9uc2UiLCJJbnRlcm5hbFNlcnZlckVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUF5QmdCQSxNLEdBQUFBLE07O0FBekJoQjs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPcUJDLFc7OztBQUVqQix5QkFBWUMsTUFBWixFQUFvQkMsT0FBcEIsRUFBNkJDLElBQTdCLEVBQW1DQyxXQUFuQyxFQUFnRDtBQUFBOztBQUFBLDhIQUV0Q0YsT0FGc0M7O0FBRzVDLGNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLGNBQUtFLElBQUwsR0FBWUEsSUFBWjtBQUNBLGNBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUw0QztBQU8vQzs7Ozs7QUFJTDs7O2tCQWJxQkosVzs7SUFjUkssbUIsV0FBQUEsbUI7Ozs7Ozs7Ozs7RUFBNEJMLFc7O0FBRWxDLFNBQVNELE1BQVQsQ0FBZ0JFLE1BQWhCLEVBQXdCQyxPQUF4QixFQUFpQ0MsSUFBakMsRUFBdUNDLFdBQXZDLEVBQW9EOztBQUV2RCxRQUFJSCxXQUFXLEdBQWYsRUFDSSxPQUFPLElBQUlJLG1CQUFKLENBQXdCSixNQUF4QixFQUFnQ0MsT0FBaEMsRUFBeUNDLElBQXpDLEVBQStDQyxXQUEvQyxDQUFQOztBQUVKLFdBQU8sSUFBSUosV0FBSixDQUFnQkMsTUFBaEIsRUFBd0JDLE9BQXhCLEVBQWlDQyxJQUFqQyxFQUF1Q0MsV0FBdkMsQ0FBUDtBQUVIIiwiZmlsZSI6IlNlcnZlckVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpIUkVycm9yIGZyb20gJy4vSkhSRXJyb3InO1xuXG4vKipcbiAqIFNlcnZlckVycm9yXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtvYmplY3R9IGJvZHlcbiAqIEBwYXJhbSB7c3RyaW5nfSByYXdSZXNwb25zZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEpIUkVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgbWVzc2FnZSwgYm9keSwgcmF3UmVzcG9uc2UpIHtcblxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMucmF3UmVzcG9uc2UgPSByYXdSZXNwb25zZTtcblxuICAgIH1cblxufVxuXG4vKiBAdG9kbyBleHBhbmQgbGlzdCBvZiBzdXBwb3J0ZWQgZXJyb3JzICovXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxTZXJ2ZXJFcnJvciBleHRlbmRzIFNlcnZlckVycm9yIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoc3RhdHVzLCBtZXNzYWdlLCBib2R5LCByYXdSZXNwb25zZSkge1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gNTAwKVxuICAgICAgICByZXR1cm4gbmV3IEludGVybmFsU2VydmVyRXJyb3Ioc3RhdHVzLCBtZXNzYWdlLCBib2R5LCByYXdSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gbmV3IFNlcnZlckVycm9yKHN0YXR1cywgbWVzc2FnZSwgYm9keSwgcmF3UmVzcG9uc2UpO1xuXG59XG4iXX0=