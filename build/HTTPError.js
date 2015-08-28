'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _errorClass = require('error-class');

var _errorClass2 = _interopRequireDefault(_errorClass);

/**
 * HTTPError
 */

var HTTPError = (function (_ES6Error) {
  _inherits(HTTPError, _ES6Error);

  /**
   * @param {Response} res
   */

  function HTTPError(res) {
    _classCallCheck(this, HTTPError);

    _get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this, 'HTTPError');
    this.status = res.status;
    this.message = res.body;
  }

  return HTTPError;
})(_errorClass2['default']);

exports['default'] = HTTPError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7MEJBQXFCLGFBQWE7Ozs7Ozs7O0lBSzVCLFNBQVM7WUFBVCxTQUFTOzs7Ozs7QUFLQSxXQUxULFNBQVMsQ0FLQyxHQUFHLEVBQUU7MEJBTGYsU0FBUzs7QUFNUCwrQkFORixTQUFTLDZDQU1ELFdBQVcsRUFBRTtBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDekIsUUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0dBQzNCOztTQVRDLFNBQVM7OztxQkFZQSxTQUFTIiwiZmlsZSI6IkhUVFBFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFUzZFcnJvciBmcm9tICdlcnJvci1jbGFzcyc7XG5cbi8qKlxuICogSFRUUEVycm9yXG4gKi9cbmNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVTNkVycm9yIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcykge1xuICAgICAgICBzdXBlcignSFRUUEVycm9yJyk7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzLmJvZHk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIVFRQRXJyb3I7XG4iXX0=