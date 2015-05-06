'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

/**
 * JSONTransform
 */

var JSONTransform = (function () {
    function JSONTransform(prefix) {
        _classCallCheck(this, JSONTransform);

        this.prefix = prefix || /^\)\]\}',?\n/;
        this.responseType = 'json';
        this.ACCEPT_HEADER = 'application/json';
        this.CONTENT_TYPE_HEADER = 'application/json;charset=utf-8';
    }

    _createClass(JSONTransform, [{
        key: 'transformRequestBody',
        value: function transformRequestBody(body) {
            return _is2['default'].object(body) && !_Utils2['default'].isFile(body) && !_Utils2['default'].isBlob(body) && !_Utils2['default'].isFormData(body) ? JSON.stringify(body) : body;
        }
    }, {
        key: 'transformResponseBody',
        value: function transformResponseBody(body) {

            if (_is2['default'].string(body)) {

                body = body.replace(this.prefix, '').trim();

                if (body) body = JSON.parse(body);
            }

            return body;
        }
    }]);

    return JSONTransform;
})();

exports['default'] = JSONTransform;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU09OVHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQkFBZSxJQUFJOzs7O3FCQUNELFNBQVM7Ozs7Ozs7O0lBS3JCLGFBQWE7QUFFSixhQUZULGFBQWEsQ0FFSCxNQUFNLEVBQUU7OEJBRmxCLGFBQWE7O0FBSVgsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDO0FBQ3ZDLFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFlBQUksQ0FBQyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsWUFBSSxDQUFDLG1CQUFtQixHQUFHLGdDQUFnQyxDQUFDO0tBQy9EOztpQkFSQyxhQUFhOztlQVVLLDhCQUFDLElBQUksRUFBRTtBQUN2QixtQkFBTyxBQUFDLGdCQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFDM0MsQ0FBQyxtQkFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDcEY7OztlQUVvQiwrQkFBQyxJQUFJLEVBQUU7O0FBRXhCLGdCQUFJLGdCQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTs7QUFFakIsb0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRTVDLG9CQUFHLElBQUksRUFDUCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUV2Qjs7QUFFTCxtQkFBTyxJQUFJLENBQUM7U0FFZjs7O1dBNUJDLGFBQWE7OztxQkFnQ0osYUFBYSIsImZpbGUiOiJzcmMvSlNPTlRyYW5zZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpcyBmcm9tICdpcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbi8qKlxuICogSlNPTlRyYW5zZm9ybVxuICovXG5jbGFzcyBKU09OVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKHByZWZpeCkge1xuXG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4IHx8IC9eXFwpXFxdXFx9Jyw/XFxuLztcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIHRoaXMuQUNDRVBUX0hFQURFUiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgdGhpcy5DT05URU5UX1RZUEVfSEVBREVSID0gJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCc7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtUmVxdWVzdEJvZHkoYm9keSkge1xuICAgICAgICByZXR1cm4gKGlzLm9iamVjdChib2R5KSAmJiAhVXRpbHMuaXNGaWxlKGJvZHkpXG4gICAgICAgICYmICFVdGlscy5pc0Jsb2IoYm9keSkgJiYgIVV0aWxzLmlzRm9ybURhdGEoYm9keSkpID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBib2R5O1xuICAgIH1cblxuICAgIHRyYW5zZm9ybVJlc3BvbnNlQm9keShib2R5KSB7XG5cbiAgICAgICAgaWYgKGlzLnN0cmluZyhib2R5KSkge1xuXG4gICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKHRoaXMucHJlZml4LCAnJykudHJpbSgpO1xuXG4gICAgICAgICAgICBpZihib2R5KVxuICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBKU09OVHJhbnNmb3JtO1xuXG4iXX0=