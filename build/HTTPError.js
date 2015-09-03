'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

		_get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this, 'HTTPError');
		this.status = res.status;
		this.message = res.body;
	}

	return HTTPError;
})(_ErrorClass3['default']);

exports['default'] = HTTPError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7MkJBQXVCLGNBQWM7Ozs7Ozs7O0lBSy9CLFNBQVM7V0FBVCxTQUFTOzs7Ozs7QUFLSCxVQUxOLFNBQVMsQ0FLRixHQUFHLEVBQUU7d0JBTFosU0FBUzs7QUFNYiw2QkFOSSxTQUFTLDZDQU1QLFdBQVcsRUFBRTtBQUNuQixNQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDekIsTUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0VBQ3hCOztRQVRJLFNBQVM7OztxQkFZQSxTQUFTIiwiZmlsZSI6IkhUVFBFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJvckNsYXNzIGZyb20gJy4vRXJyb3JDbGFzcyc7XG5cbi8qKlxuICogSFRUUEVycm9yXG4gKi9cbmNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVycm9yQ2xhc3Mge1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcblx0ICovXG5cdGNvbnN0cnVjdG9yKHJlcykge1xuXHRcdHN1cGVyKCdIVFRQRXJyb3InKTtcblx0XHR0aGlzLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG5cdFx0dGhpcy5tZXNzYWdlID0gcmVzLmJvZHk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSFRUUEVycm9yO1xuXG4iXX0=