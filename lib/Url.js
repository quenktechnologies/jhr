'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Url provides useful methods for handling url strings.
 */
var Url = function () {
  function Url() {
    _classCallCheck(this, Url);
  }

  _createClass(Url, [{
    key: 'fromString',


    /**
     * fromString will construct a url mergining any parameters passed.
     * @param {string} url
     * @param {object} [params]
     */
    value: function fromString(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      return url + '?' + _qs2.default.stringify(params);
    }
  }]);

  return Url;
}();

exports.default = new Url();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VcmwuanMiXSwibmFtZXMiOlsiVXJsIiwidXJsIiwicGFyYW1zIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7SUFHTUEsRzs7Ozs7Ozs7O0FBRUY7Ozs7OytCQUtXQyxHLEVBQWtCO0FBQUEsVUFBYkMsTUFBYSx1RUFBSixFQUFJOzs7QUFFckIsYUFBVUQsR0FBVixTQUFpQixhQUFHRSxTQUFILENBQWFELE1BQWIsQ0FBakI7QUFFVDs7Ozs7O2tCQUlZLElBQUlGLEdBQUosRSIsImZpbGUiOiJVcmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXMgZnJvbSAncXMnO1xuXG4vKipcbiAqIFVybCBwcm92aWRlcyB1c2VmdWwgbWV0aG9kcyBmb3IgaGFuZGxpbmcgdXJsIHN0cmluZ3MuXG4gKi9cbmNsYXNzIFVybCB7XG5cbiAgICAvKipcbiAgICAgKiBmcm9tU3RyaW5nIHdpbGwgY29uc3RydWN0IGEgdXJsIG1lcmdpbmluZyBhbnkgcGFyYW1ldGVycyBwYXNzZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXVxuICAgICAqL1xuICAgIGZyb21TdHJpbmcodXJsLCBwYXJhbXMgPSB7fSkge1xuXG4gICAgICAgICAgICByZXR1cm4gYCR7dXJsfT8ke3FzLnN0cmluZ2lmeShwYXJhbXMpfWA7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBVcmwoKVxuIl19