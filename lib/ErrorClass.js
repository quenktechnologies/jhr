'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorClass = (function (_Error) {
	_inherits(ErrorClass, _Error);

	function ErrorClass(message) {
		_classCallCheck(this, ErrorClass);

		_get(Object.getPrototypeOf(ErrorClass.prototype), 'constructor', this).call(this);

		if (Error.hasOwnProperty('captureStackTrace')) Error.captureStackTrace(this, this.constructor);else Object.defineProperty(this, 'stack', {
			value: new Error().stack
		});

		Object.defineProperty(this, 'message', {
			value: message
		});
	}

	return ErrorClass;
})(Error);

exports['default'] = ErrorClass;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FcnJvckNsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFNLFVBQVU7V0FBVixVQUFVOztBQUNKLFVBRE4sVUFBVSxDQUNILE9BQU8sRUFBRTt3QkFEaEIsVUFBVTs7QUFFZCw2QkFGSSxVQUFVLDZDQUVOOztBQUVSLE1BQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUM1QyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUVoRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDcEMsUUFBSyxFQUFFLEFBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBRSxLQUFLO0dBQzFCLENBQUMsQ0FBQzs7QUFFSixRQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDdEMsUUFBSyxFQUFFLE9BQU87R0FDZCxDQUFDLENBQUM7RUFDSDs7UUFkSSxVQUFVO0dBQVMsS0FBSzs7cUJBa0JmLFVBQVUiLCJmaWxlIjoiRXJyb3JDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVycm9yQ2xhc3MgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKEVycm9yLmhhc093blByb3BlcnR5KCdjYXB0dXJlU3RhY2tUcmFjZScpKVxuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG5cdFx0ZWxzZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGFjaycsIHtcblx0XHRcdFx0dmFsdWU6IChuZXcgRXJyb3IoKSkuc3RhY2tcblx0XHRcdH0pO1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuXHRcdFx0dmFsdWU6IG1lc3NhZ2Vcblx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQ2xhc3M7XG4iXX0=