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
 * HTTPError
 */

var HTTPError = (function (_ES6Error) {
  _inherits(HTTPError, _ES6Error);

  /**
   * @param {Response} res
   */

  function HTTPError(res) {
    _classCallCheck(this, HTTPError);

    _get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this, res.body);
    this.status = res.status;
  }

  return HTTPError;
})(_es6Error2['default']);

exports['default'] = HTTPError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7d0JBQXFCLFdBQVc7Ozs7Ozs7O0lBSzFCLFNBQVM7WUFBVCxTQUFTOzs7Ozs7QUFLQSxXQUxULFNBQVMsQ0FLQyxHQUFHLEVBQUU7MEJBTGYsU0FBUzs7QUFNUCwrQkFORixTQUFTLDZDQU1ELEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDaEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0dBQzVCOztTQVJDLFNBQVM7OztxQkFXQSxTQUFTIiwiZmlsZSI6IkhUVFBFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFUzZFcnJvciBmcm9tICdlczYtZXJyb3InO1xuXG4vKipcbiAqIEhUVFBFcnJvclxuICovXG5jbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFUzZFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXMpIHtcbiAgICAgICAgc3VwZXIocmVzLmJvZHkpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIVFRQRXJyb3I7XG4iXX0=