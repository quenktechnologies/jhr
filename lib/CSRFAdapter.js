'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Cookies = require('./Cookies');

var _Cookies2 = _interopRequireDefault(_Cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 * @param {string} cookieName - The name of the cookie to read the token from.
 * @param {string} headerName - The name of the header to set.
 */
var CSRFAdapter = function () {
    function CSRFAdapter() {
        var cookieName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xsrf-token';
        var headerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x-xsrf-token';

        _classCallCheck(this, CSRFAdapter);

        (0, _beof2.default)({ cookieName: cookieName }).string();
        (0, _beof2.default)({ headerName: headerName }).string();

        this.cookieName = cookieName;
        this.headerName = headerName;
    }

    _createClass(CSRFAdapter, [{
        key: 'beforeRequest',
        value: function beforeRequest(req, xhr, agent) {

            xhr.setRequestHeader(this.headerName, _Cookies2.default.get(this.cookieName));
        }
    }]);

    return CSRFAdapter;
}();

exports.default = CSRFAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DU1JGQWRhcHRlci5qcyJdLCJuYW1lcyI6WyJDU1JGQWRhcHRlciIsImNvb2tpZU5hbWUiLCJoZWFkZXJOYW1lIiwic3RyaW5nIiwicmVxIiwieGhyIiwiYWdlbnQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLFc7QUFFRiwyQkFBZ0U7QUFBQSxZQUFwREMsVUFBb0QsdUVBQXpDLFlBQXlDO0FBQUEsWUFBM0JDLFVBQTJCLHVFQUFoQixjQUFnQjs7QUFBQTs7QUFFNUQsNEJBQUssRUFBRUQsc0JBQUYsRUFBTCxFQUFxQkUsTUFBckI7QUFDQSw0QkFBSyxFQUFFRCxzQkFBRixFQUFMLEVBQXFCQyxNQUFyQjs7QUFFQSxhQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLGFBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBRUg7Ozs7c0NBRWFFLEcsRUFBS0MsRyxFQUFLQyxLLEVBQU87O0FBRTNCRCxnQkFBSUUsZ0JBQUosQ0FBcUIsS0FBS0wsVUFBMUIsRUFBc0Msa0JBQVFNLEdBQVIsQ0FBWSxLQUFLUCxVQUFqQixDQUF0QztBQUVIOzs7Ozs7a0JBSVVELFciLCJmaWxlIjoiQ1NSRkFkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBDb29raWVzIGZyb20gJy4vQ29va2llcyc7XG5cbi8qKlxuICogQ1NSRkFkYXB0ZXIgc2V0cyB0aGUgQ1NSRiBwcmV2ZW50aW9uIGhlYWRlciBvbiB3cml0ZSByZXF1ZXN0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvb2tpZSB0byByZWFkIHRoZSB0b2tlbiBmcm9tLlxuICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlck5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgaGVhZGVyIHRvIHNldC5cbiAqL1xuY2xhc3MgQ1NSRkFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29va2llTmFtZT0neHNyZi10b2tlbicsIGhlYWRlck5hbWU9J3gteHNyZi10b2tlbicpIHtcblxuICAgICAgICBiZW9mKHsgY29va2llTmFtZSB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IGhlYWRlck5hbWUgfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5jb29raWVOYW1lID0gY29va2llTmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXJOYW1lID0gaGVhZGVyTmFtZTtcblxuICAgIH1cblxuICAgIGJlZm9yZVJlcXVlc3QocmVxLCB4aHIsIGFnZW50KSB7XG5cbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIodGhpcy5oZWFkZXJOYW1lLCBDb29raWVzLmdldCh0aGlzLmNvb2tpZU5hbWUpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDU1JGQWRhcHRlclxuIl19