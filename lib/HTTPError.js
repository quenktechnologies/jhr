'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ErrorClass2 = require('./ErrorClass');

var _ErrorClass3 = _interopRequireDefault(_ErrorClass2);

/**
 * HTTPError
 */

var HTTPError = (function (_ErrorClass) {
	_inherits(HTTPError, _ErrorClass);

	/**
  * @param {Response} res
  */

	function HTTPError(res) {
		_classCallCheck(this, HTTPError);

		_get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this, res.body);
		this.status = res.status;
	}

	return HTTPError;
})(_ErrorClass3['default']);

exports['default'] = HTTPError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7MkJBQXVCLGNBQWM7Ozs7Ozs7O0lBSy9CLFNBQVM7V0FBVCxTQUFTOzs7Ozs7QUFLSCxVQUxOLFNBQVMsQ0FLRixHQUFHLEVBQUU7d0JBTFosU0FBUzs7QUFNYiw2QkFOSSxTQUFTLDZDQU1QLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDRixNQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDdkM7O1FBUkksU0FBUzs7O3FCQVdBLFNBQVMiLCJmaWxlIjoiSFRUUEVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yQ2xhc3MgZnJvbSAnLi9FcnJvckNsYXNzJztcblxuLyoqXG4gKiBIVFRQRXJyb3JcbiAqL1xuY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3JDbGFzcyB7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuXHQgKi9cblx0Y29uc3RydWN0b3IocmVzKSB7XG5cdFx0c3VwZXIocmVzLmJvZHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gcmVzLnN0YXR1cztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBIVFRQRXJyb3I7XG5cbiJdfQ==