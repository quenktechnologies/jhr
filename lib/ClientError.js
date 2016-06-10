'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _HTTPError2 = require('./HTTPError');

var _HTTPError3 = _interopRequireDefault(_HTTPError2);

/**
 * ClientError
 */

var ClientError = (function (_HTTPError) {
    _inherits(ClientError, _HTTPError);

    function ClientError(res) {
        _classCallCheck(this, ClientError);

        _get(Object.getPrototypeOf(ClientError.prototype), 'constructor', this).call(this, res);
        this.data = res.data;
        this.response = res;
    }

    return ClientError;
})(_HTTPError3['default']);

exports['default'] = ClientError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGllbnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzswQkFBc0IsYUFBYTs7Ozs7Ozs7SUFJN0IsV0FBVztjQUFYLFdBQVc7O0FBQ0YsYUFEVCxXQUFXLENBQ0QsR0FBRyxFQUFFOzhCQURmLFdBQVc7O0FBRVQsbUNBRkYsV0FBVyw2Q0FFSCxHQUFHLEVBQUU7QUFDWCxZQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDckIsWUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDdkI7O1dBTEMsV0FBVzs7O3FCQU9GLFdBQVciLCJmaWxlIjoiQ2xpZW50RXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSFRUUEVycm9yIGZyb20gJy4vSFRUUEVycm9yJztcbi8qKlxuICogQ2xpZW50RXJyb3JcbiAqL1xuY2xhc3MgQ2xpZW50RXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlcykge1xuICAgICAgICBzdXBlcihyZXMpO1xuICAgICAgICB0aGlzLmRhdGEgPSByZXMuZGF0YTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlcztcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDbGllbnRFcnJvclxuIl19