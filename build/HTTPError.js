/**
 * HTTPError
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HTTPError = (function (_Error) {
  _inherits(HTTPError, _Error);

  /**
   * @param {Response} res
   */

  function HTTPError(res) {
    _classCallCheck(this, HTTPError);

    _get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this);
    this.message = res.text + (typeof res.body === 'string') ? res.body : '';
    this.status = res.status;
  }

  /**
   * toResponse returns the HTTPResponse associated with this error.
   * @returns {Response} res
   */

  _createClass(HTTPError, [{
    key: 'toResposne',
    value: function toResposne() {
      return res;
    }
  }]);

  return HTTPError;
})(Error);

exports['default'] = HTTPError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHTSxTQUFTO1lBQVQsU0FBUzs7Ozs7O0FBS0EsV0FMVCxTQUFTLENBS0MsR0FBRyxFQUFFOzBCQUxmLFNBQVM7O0FBTVAsK0JBTkYsU0FBUyw2Q0FNQztBQUNSLFFBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFBLEFBQUMsR0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQztBQUNuRSxRQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7R0FDNUI7Ozs7Ozs7ZUFUQyxTQUFTOztXQWVELHNCQUFHO0FBQ1QsYUFBTyxHQUFHLENBQUM7S0FDZDs7O1NBakJDLFNBQVM7R0FBUyxLQUFLOztxQkFvQmQsU0FBUyIsImZpbGUiOiJIVFRQRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhUVFBFcnJvclxuICovXG5jbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFcnJvcntcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSByZXMudGV4dCsodHlwZW9mIHJlcy5ib2R5ID09PSAnc3RyaW5nJyk/cmVzLmJvZHk6Jyc7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b1Jlc3BvbnNlIHJldHVybnMgdGhlIEhUVFBSZXNwb25zZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBlcnJvci5cbiAgICAgKiBAcmV0dXJucyB7UmVzcG9uc2V9IHJlc1xuICAgICAqL1xuICAgIHRvUmVzcG9zbmUoKSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIVFRQRXJyb3I7XG4iXX0=