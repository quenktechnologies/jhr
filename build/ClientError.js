'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _HTTPError2 = require('./HTTPError');

var _HTTPError3 = _interopRequireDefault(_HTTPError2);

/**
 * ClientError
 */

var ClientError = (function (_HTTPError) {
  function ClientError(res) {
    _classCallCheck(this, ClientError);

    _get(Object.getPrototypeOf(ClientError.prototype), 'constructor', this).call(this, res);
    this.body = res.data;
  }

  _inherits(ClientError, _HTTPError);

  return ClientError;
})(_HTTPError3['default']);

exports['default'] = ClientError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGllbnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUFzQixhQUFhOzs7Ozs7OztJQUk3QixXQUFXO0FBQ0osV0FEUCxXQUFXLENBQ0gsR0FBRyxFQUFFOzBCQURiLFdBQVc7O0FBRWIsK0JBRkUsV0FBVyw2Q0FFUCxHQUFHLEVBQUU7QUFDWCxRQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7R0FDdEI7O1lBSkcsV0FBVzs7U0FBWCxXQUFXOzs7cUJBTUYsV0FBVyIsImZpbGUiOiJzcmMvQ2xpZW50RXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSFRUUEVycm9yIGZyb20gJy4vSFRUUEVycm9yJztcbi8qKlxuICogQ2xpZW50RXJyb3JcbiAqL1xuY2xhc3MgQ2xpZW50RXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihyZXMpIHtcbiAgICBzdXBlcihyZXMpO1xuICAgIHRoaXMuYm9keSA9IHJlcy5kYXRhO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDbGllbnRFcnJvclxuXG4iXX0=