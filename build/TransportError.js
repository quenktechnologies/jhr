'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

/**
 * TransportError indicates a lowlevel error.
 *
 * The error may be due to an abort on a request or the browser being unable to
 * honour it.
 */

var TransportError = (function (_ES6Error) {
    _inherits(TransportError, _ES6Error);

    function TransportError(res) {
        _classCallCheck(this, TransportError);

        _get(Object.getPrototypeOf(TransportError.prototype), 'constructor', this).call(this, 'An error occured during transport! Is the server down?');
    }

    return TransportError;
})(_es6Error2['default']);

exports['default'] = TransportError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc3BvcnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozt3QkFBcUIsV0FBVzs7Ozs7Ozs7Ozs7SUFPMUIsY0FBYztjQUFkLGNBQWM7O0FBQ0wsYUFEVCxjQUFjLENBQ0osR0FBRyxFQUFDOzhCQURkLGNBQWM7O0FBRVosbUNBRkYsY0FBYyw2Q0FFTix3REFBd0QsRUFBRTtLQUNuRTs7V0FIQyxjQUFjOzs7cUJBS0wsY0FBYyIsImZpbGUiOiJUcmFuc3BvcnRFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFUzZFcnJvciBmcm9tICdlczYtZXJyb3InO1xuLyoqXG4gKiBUcmFuc3BvcnRFcnJvciBpbmRpY2F0ZXMgYSBsb3dsZXZlbCBlcnJvci5cbiAqXG4gKiBUaGUgZXJyb3IgbWF5IGJlIGR1ZSB0byBhbiBhYm9ydCBvbiBhIHJlcXVlc3Qgb3IgdGhlIGJyb3dzZXIgYmVpbmcgdW5hYmxlIHRvXG4gKiBob25vdXIgaXQuXG4gKi9cbmNsYXNzIFRyYW5zcG9ydEVycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlcyl7XG4gICAgICAgIHN1cGVyKCdBbiBlcnJvciBvY2N1cmVkIGR1cmluZyB0cmFuc3BvcnQhIElzIHRoZSBzZXJ2ZXIgZG93bj8nKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnRFcnJvclxuXG4iXX0=