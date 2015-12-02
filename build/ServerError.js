'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _HTTPError2 = require('./HTTPError');

var _HTTPError3 = _interopRequireDefault(_HTTPError2);

/**
 * ServerError
 */

var ServerError = (function (_HTTPError) {
  _inherits(ServerError, _HTTPError);

  function ServerError(res) {
    _classCallCheck(this, ServerError);

    _get(Object.getPrototypeOf(ServerError.prototype), 'constructor', this).call(this, res);
    this.response = response;
  }

  return ServerError;
})(_HTTPError3['default']);

exports['default'] = ServerError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzswQkFBc0IsYUFBYTs7Ozs7Ozs7SUFJN0IsV0FBVztZQUFYLFdBQVc7O0FBRUosV0FGUCxXQUFXLENBRUgsR0FBRyxFQUFFOzBCQUZiLFdBQVc7O0FBR2pCLCtCQUhNLFdBQVcsNkNBR1gsR0FBRyxFQUFFO0FBQ1gsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7R0FDdEI7O1NBTEcsV0FBVzs7O3FCQVFGLFdBQVciLCJmaWxlIjoiU2VydmVyRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSFRUUEVycm9yIGZyb20gJy4vSFRUUEVycm9yJztcbi8qKlxuICogU2VydmVyRXJyb3JcbiAqL1xuY2xhc3MgU2VydmVyRXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3J7XG5cbiAgY29uc3RydWN0b3IocmVzKSB7XG5zdXBlcihyZXMpO1xudGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFNlcnZlckVycm9yXG5cbiJdfQ==