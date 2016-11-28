"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FilteredResposneHandler
 * @interface
 */
var FilteredResposneHandler = function () {
  function FilteredResposneHandler() {
    _classCallCheck(this, FilteredResposneHandler);
  }

  _createClass(FilteredResposneHandler, [{
    key: "onSuccess",


    /**
     * onSuccess is called on status 200
     * @param {Response} response
     */
    value: function onSuccess() {}

    /**
     * onCreated is called on status 201.
     * @param {Response} response
     */

  }, {
    key: "onCreated",
    value: function onCreated() {}

    /**
     * onNoContent is called on status 204.
     * @param {Response} response
     */

  }, {
    key: "onNoContent",
    value: function onNoContent() {}

    /**
     * onBadRequest is called on status 400.
     * @param {ClientError} err
     */

  }, {
    key: "onBadRequest",
    value: function onBadRequest() {}

    /**
     * onUnauthorized is called on status 401.
     * The user must authenticate to complete the request.
     * @param {ClientError} err
     */

  }, {
    key: "onUnauthorized",
    value: function onUnauthorized() {}

    /**
     * onForbidden is called on status 403.
     * The user does not have enough permissions to
     * perform the request.
     * @param {ClientError} err
     */

  }, {
    key: "onForbidden",
    value: function onForbidden() {}

    /**
     * onNotFound is called on status 404.
     * The resource was not found.
     * @param {ClientError} err
     */

  }, {
    key: "onNotFound",
    value: function onNotFound() {}

    /**
     * onConflict is called on status 409.
     * @param {ClientError} err
     */

  }, {
    key: "onConflict",
    value: function onConflict() {}

    /**
     * onInternalError is called on status 500.
     * The back end died.
     * @param {ServerError} err
     */

  }, {
    key: "onInternalError",
    value: function onInternalError() {}

    /**
     * onError is called when a non http error occurs
     * @param {Error} err
     */

  }, {
    key: "onError",
    value: function onError() {}
  }]);

  return FilteredResposneHandler;
}();

exports.default = FilteredResposneHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GaWx0ZXJlZFJlc3BvbnNlSGFuZGxlci5qcyJdLCJuYW1lcyI6WyJGaWx0ZXJlZFJlc3Bvc25lSGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLHVCOzs7Ozs7Ozs7QUFFRjs7OztnQ0FJWSxDQUVYOztBQUVEOzs7Ozs7O2dDQUlZLENBRVg7O0FBRUQ7Ozs7Ozs7a0NBSWMsQ0FFYjs7QUFFRDs7Ozs7OzttQ0FJVyxDQUFFOztBQUViOzs7Ozs7OztxQ0FLaUIsQ0FBRTs7QUFFbkI7Ozs7Ozs7OztrQ0FNYyxDQUFFOztBQUVoQjs7Ozs7Ozs7aUNBS2EsQ0FBRTs7QUFFZjs7Ozs7OztpQ0FJYSxDQUFFOztBQUVmOzs7Ozs7OztzQ0FLa0IsQ0FBRTs7QUFFcEI7Ozs7Ozs7OEJBSVUsQ0FBRTs7Ozs7O2tCQU1EQSx1QiIsImZpbGUiOiJGaWx0ZXJlZFJlc3BvbnNlSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsdGVyZWRSZXNwb3NuZUhhbmRsZXJcbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgRmlsdGVyZWRSZXNwb3NuZUhhbmRsZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdWNjZXNzIGlzIGNhbGxlZCBvbiBzdGF0dXMgMjAwXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2VcbiAgICAgKi9cbiAgICBvblN1Y2Nlc3MoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbkNyZWF0ZWQgaXMgY2FsbGVkIG9uIHN0YXR1cyAyMDEuXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2VcbiAgICAgKi9cbiAgICBvbkNyZWF0ZWQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbk5vQ29udGVudCBpcyBjYWxsZWQgb24gc3RhdHVzIDIwNC5cbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICAgICAqL1xuICAgIG9uTm9Db250ZW50KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25CYWRSZXF1ZXN0IGlzIGNhbGxlZCBvbiBzdGF0dXMgNDAwLlxuICAgICAqIEBwYXJhbSB7Q2xpZW50RXJyb3J9IGVyclxuICAgICAqL1xub25CYWRSZXF1ZXN0KCkge31cblxuICAgIC8qKlxuICAgICAqIG9uVW5hdXRob3JpemVkIGlzIGNhbGxlZCBvbiBzdGF0dXMgNDAxLlxuICAgICAqIFRoZSB1c2VyIG11c3QgYXV0aGVudGljYXRlIHRvIGNvbXBsZXRlIHRoZSByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7Q2xpZW50RXJyb3J9IGVyclxuICAgICAqL1xuICAgIG9uVW5hdXRob3JpemVkKCkge31cblxuICAgIC8qKlxuICAgICAqIG9uRm9yYmlkZGVuIGlzIGNhbGxlZCBvbiBzdGF0dXMgNDAzLlxuICAgICAqIFRoZSB1c2VyIGRvZXMgbm90IGhhdmUgZW5vdWdoIHBlcm1pc3Npb25zIHRvXG4gICAgICogcGVyZm9ybSB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge0NsaWVudEVycm9yfSBlcnJcbiAgICAgKi9cbiAgICBvbkZvcmJpZGRlbigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBvbk5vdEZvdW5kIGlzIGNhbGxlZCBvbiBzdGF0dXMgNDA0LlxuICAgICAqIFRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kLlxuICAgICAqIEBwYXJhbSB7Q2xpZW50RXJyb3J9IGVyclxuICAgICAqL1xuICAgIG9uTm90Rm91bmQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogb25Db25mbGljdCBpcyBjYWxsZWQgb24gc3RhdHVzIDQwOS5cbiAgICAgKiBAcGFyYW0ge0NsaWVudEVycm9yfSBlcnJcbiAgICAgKi9cbiAgICBvbkNvbmZsaWN0KCkge31cblxuICAgIC8qKlxuICAgICAqIG9uSW50ZXJuYWxFcnJvciBpcyBjYWxsZWQgb24gc3RhdHVzIDUwMC5cbiAgICAgKiBUaGUgYmFjayBlbmQgZGllZC5cbiAgICAgKiBAcGFyYW0ge1NlcnZlckVycm9yfSBlcnJcbiAgICAgKi9cbiAgICBvbkludGVybmFsRXJyb3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogb25FcnJvciBpcyBjYWxsZWQgd2hlbiBhIG5vbiBodHRwIGVycm9yIG9jY3Vyc1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICAgICAqL1xuICAgIG9uRXJyb3IoKSB7fVxuXG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJlZFJlc3Bvc25lSGFuZGxlclxuIl19