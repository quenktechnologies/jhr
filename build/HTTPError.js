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

var HTTPError = (function (_Error) {

  /**
   * @param {Response} res
   */

  function HTTPError(res) {
    _classCallCheck(this, HTTPError);

    _get(Object.getPrototypeOf(HTTPError.prototype), "constructor", this).call(this, res.text);
    this.status = res.status;
  }

  _inherits(HTTPError, _Error);

  _createClass(HTTPError, [{
    key: "toResposne",

    /**
     * toResponse returns the HTTPResponse associated with this error.
     * @returns {Response} res
     */
    value: function toResposne() {
      return res;
    }
  }]);

  return HTTPError;
})(Error);

exports["default"] = HTTPError;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVFRQRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHTSxTQUFTOzs7Ozs7QUFLQSxXQUxULFNBQVMsQ0FLQyxHQUFHLEVBQUU7MEJBTGYsU0FBUzs7QUFNUCwrQkFORixTQUFTLDZDQU1ELEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDaEIsUUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0dBQzVCOztZQVJDLFNBQVM7O2VBQVQsU0FBUzs7Ozs7OztXQWNELHNCQUFHO0FBQ1QsYUFBTyxHQUFHLENBQUM7S0FDZDs7O1NBaEJDLFNBQVM7R0FBUyxLQUFLOztxQkFtQmQsU0FBUyIsImZpbGUiOiJzcmMvSFRUUEVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIVFRQRXJyb3JcbiAqL1xuY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3J7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXMpIHtcbiAgICAgICAgc3VwZXIocmVzLnRleHQpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9SZXNwb25zZSByZXR1cm5zIHRoZSBIVFRQUmVzcG9uc2UgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZXJyb3IuXG4gICAgICogQHJldHVybnMge1Jlc3BvbnNlfSByZXNcbiAgICAgKi9cbiAgICB0b1Jlc3Bvc25lKCkge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSFRUUEVycm9yO1xuIl19