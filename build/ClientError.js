'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _HTTPError2 = require('./HTTPError');

var _HTTPError3 = _interopRequireDefault(_HTTPError2);

/**
 * ClientError
 */

var ClientError = (function (_HTTPError) {
  function ClientError() {
    _classCallCheck(this, ClientError);

    if (_HTTPError != null) {
      _HTTPError.apply(this, arguments);
    }
  }

  _inherits(ClientError, _HTTPError);

  return ClientError;
})(_HTTPError3['default']);

exports['default'] = ClientError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGllbnRFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7MEJBQXNCLGFBQWE7Ozs7Ozs7O0lBSTdCLFdBQVc7V0FBWCxXQUFXOzBCQUFYLFdBQVc7Ozs7Ozs7WUFBWCxXQUFXOztTQUFYLFdBQVc7OztxQkFDRixXQUFXIiwiZmlsZSI6InNyYy9DbGllbnRFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIVFRQRXJyb3IgZnJvbSAnLi9IVFRQRXJyb3InO1xuLyoqXG4gKiBDbGllbnRFcnJvclxuICovXG5jbGFzcyBDbGllbnRFcnJvciBleHRlbmRzIEhUVFBFcnJvciB7fVxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50RXJyb3JcblxuIl19