"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * HTTPError
 */

var HTTPRequestError = (function (_Error) {

  /**
   * @param {Response} res
   */

  function HTTPRequestError(res) {
    _classCallCheck(this, HTTPRequestError);

    _get(Object.getPrototypeOf(HTTPRequestError.prototype), "constructor", this).call(this, res.text);
    this.status = res.status;
  }

  _inherits(HTTPRequestError, _Error);

  _createClass(HTTPRequestError, [{
    key: "toResposne",

    /**
     * toResponse returns the HTTPResponse associated with this error.
     * @returns {Response} res
     */
    value: function toResposne() {
      return res;
    }
  }]);

  return HTTPRequestError;
})(Error);

exports["default"] = HTTPRequestError;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQUmVxdWVzdEVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR00sZ0JBQWdCOzs7Ozs7QUFLUCxXQUxULGdCQUFnQixDQUtOLEdBQUcsRUFBRTswQkFMZixnQkFBZ0I7O0FBTWQsK0JBTkYsZ0JBQWdCLDZDQU1SLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDaEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0dBQzVCOztZQVJDLGdCQUFnQjs7ZUFBaEIsZ0JBQWdCOzs7Ozs7O1dBY1Isc0JBQUc7QUFDVCxhQUFPLEdBQUcsQ0FBQztLQUNkOzs7U0FoQkMsZ0JBQWdCO0dBQVMsS0FBSzs7cUJBbUJyQixnQkFBZ0IiLCJmaWxlIjoic3JjL0hUVFBSZXF1ZXN0RXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhUVFBFcnJvclxuICovXG5jbGFzcyBIVFRQUmVxdWVzdEVycm9yIGV4dGVuZHMgRXJyb3J7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXMpIHtcbiAgICAgICAgc3VwZXIocmVzLnRleHQpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9SZXNwb25zZSByZXR1cm5zIHRoZSBIVFRQUmVzcG9uc2UgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZXJyb3IuXG4gICAgICogQHJldHVybnMge1Jlc3BvbnNlfSByZXNcbiAgICAgKi9cbiAgICB0b1Jlc3Bvc25lKCkge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSFRUUFJlcXVlc3RFcnJvclxuXG4iXX0=