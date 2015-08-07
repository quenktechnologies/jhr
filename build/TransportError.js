/**
 * TransportError indicates a lowlevel error.
 *
 * The error may be due to an abort on a request or the browser being unable to
 * honour it.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransportError = (function (_Error) {
  _inherits(TransportError, _Error);

  function TransportError() {
    _classCallCheck(this, TransportError);

    _get(Object.getPrototypeOf(TransportError.prototype), "constructor", this).apply(this, arguments);
  }

  return TransportError;
})(Error);

exports["default"] = TransportError;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc3BvcnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNTSxjQUFjO1lBQWQsY0FBYzs7V0FBZCxjQUFjOzBCQUFkLGNBQWM7OytCQUFkLGNBQWM7OztTQUFkLGNBQWM7R0FBUyxLQUFLOztxQkFDbkIsY0FBYyIsImZpbGUiOiJUcmFuc3BvcnRFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVHJhbnNwb3J0RXJyb3IgaW5kaWNhdGVzIGEgbG93bGV2ZWwgZXJyb3IuXG4gKlxuICogVGhlIGVycm9yIG1heSBiZSBkdWUgdG8gYW4gYWJvcnQgb24gYSByZXF1ZXN0IG9yIHRoZSBicm93c2VyIGJlaW5nIHVuYWJsZSB0b1xuICogaG9ub3VyIGl0LlxuICovXG5jbGFzcyBUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9ye31cbmV4cG9ydCBkZWZhdWx0IFRyYW5zcG9ydEVycm9yXG5cbiJdfQ==