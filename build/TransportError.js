"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * TransportError indicates a lowlevel error.
 *
 * The error may be due to an abort on a request or the browser being unable to
 * honour it.
 */

var TransportError = (function (_Error) {
  function TransportError() {
    _classCallCheck(this, TransportError);

    if (_Error != null) {
      _Error.apply(this, arguments);
    }
  }

  _inherits(TransportError, _Error);

  return TransportError;
})(Error);

exports["default"] = TransportError;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc3BvcnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQU1NLGNBQWM7V0FBZCxjQUFjOzBCQUFkLGNBQWM7Ozs7Ozs7WUFBZCxjQUFjOztTQUFkLGNBQWM7R0FBUyxLQUFLOztxQkFDbkIsY0FBYyIsImZpbGUiOiJzcmMvVHJhbnNwb3J0RXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRyYW5zcG9ydEVycm9yIGluZGljYXRlcyBhIGxvd2xldmVsIGVycm9yLlxuICpcbiAqIFRoZSBlcnJvciBtYXkgYmUgZHVlIHRvIGFuIGFib3J0IG9uIGEgcmVxdWVzdCBvciB0aGUgYnJvd3NlciBiZWluZyB1bmFibGUgdG9cbiAqIGhvbm91ciBpdC5cbiAqL1xuY2xhc3MgVHJhbnNwb3J0RXJyb3IgZXh0ZW5kcyBFcnJvcnt9XG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnRFcnJvclxuXG4iXX0=