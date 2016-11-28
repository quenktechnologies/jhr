'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * JSONTransform
 */
var JSONTransform = function () {
    function JSONTransform() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /^\)\]\}',?\n/;

        _classCallCheck(this, JSONTransform);

        this.prefix = prefix;
        this.responseType = '';
    }

    _createClass(JSONTransform, [{
        key: 'accepts',
        value: function accepts() {

            return 'application/json';
        }
    }, {
        key: 'contentType',
        value: function contentType() {

            return 'application/json;charset=utf-8';
        }
    }, {
        key: 'parseRequestBody',
        value: function parseRequestBody(body) {

            return _Utils2.default.isObject(body) && !_Utils2.default.isFile(body) && !_Utils2.default.isBlob(body) && !_Utils2.default.isFormData(body) ? JSON.stringify(body) : body;
        }
    }, {
        key: 'parseResponseBody',
        value: function parseResponseBody(body) {

            if (typeof body === 'string') {

                body = body.replace(this.prefix, '').trim();

                if (body) {

                    try {

                        body = JSON.parse(body);
                    } catch (e) {

                        body = null;
                    }
                }
            }

            return body;
        }
    }]);

    return JSONTransform;
}();

exports.default = JSONTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU09OVHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbIkpTT05UcmFuc2Zvcm0iLCJwcmVmaXgiLCJyZXNwb25zZVR5cGUiLCJib2R5IiwiaXNPYmplY3QiLCJpc0ZpbGUiLCJpc0Jsb2IiLCJpc0Zvcm1EYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJ0cmltIiwicGFyc2UiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7SUFHTUEsYTtBQUVGLDZCQUFxQztBQUFBLFlBQXpCQyxNQUF5Qix1RUFBaEIsY0FBZ0I7O0FBQUE7O0FBRWpDLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFFSDs7OztrQ0FFUzs7QUFFTixtQkFBTyxrQkFBUDtBQUVIOzs7c0NBRWE7O0FBRVYsbUJBQU8sZ0NBQVA7QUFFSDs7O3lDQUVnQkMsSSxFQUFNOztBQUVuQixtQkFBUSxnQkFBTUMsUUFBTixDQUFlRCxJQUFmLEtBQ0EsQ0FBQyxnQkFBTUUsTUFBTixDQUFhRixJQUFiLENBREQsSUFFQSxDQUFDLGdCQUFNRyxNQUFOLENBQWFILElBQWIsQ0FGRCxJQUdBLENBQUMsZ0JBQU1JLFVBQU4sQ0FBaUJKLElBQWpCLENBSEYsR0FJSEssS0FBS0MsU0FBTCxDQUFlTixJQUFmLENBSkcsR0FJb0JBLElBSjNCO0FBTUg7OzswQ0FFaUJBLEksRUFBTTs7QUFFcEIsZ0JBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4Qjs7QUFFMUJBLHVCQUFPQSxLQUFLTyxPQUFMLENBQWEsS0FBS1QsTUFBbEIsRUFBMEIsRUFBMUIsRUFBOEJVLElBQTlCLEVBQVA7O0FBRUEsb0JBQUlSLElBQUosRUFBVTs7QUFFTix3QkFBSTs7QUFFQUEsK0JBQU9LLEtBQUtJLEtBQUwsQ0FBV1QsSUFBWCxDQUFQO0FBRUgscUJBSkQsQ0FJRSxPQUFPVSxDQUFQLEVBQVU7O0FBRVJWLCtCQUFRLElBQVI7QUFFSDtBQUVKO0FBRUo7O0FBRUQsbUJBQU9BLElBQVA7QUFFSDs7Ozs7O2tCQUlVSCxhIiwiZmlsZSI6IkpTT05UcmFuc2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbi8qKlxuICogSlNPTlRyYW5zZm9ybVxuICovXG5jbGFzcyBKU09OVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKHByZWZpeCA9IC9eXFwpXFxdXFx9Jyw/XFxuLykge1xuXG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgYWNjZXB0cygpIHtcblxuICAgICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uL2pzb24nO1xuXG4gICAgfVxuXG4gICAgY29udGVudFR5cGUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnO1xuXG4gICAgfVxuXG4gICAgcGFyc2VSZXF1ZXN0Qm9keShib2R5KSB7XG5cbiAgICAgICAgcmV0dXJuIChVdGlscy5pc09iamVjdChib2R5KSAmJlxuICAgICAgICAgICAgICAgICFVdGlscy5pc0ZpbGUoYm9keSkgJiZcbiAgICAgICAgICAgICAgICAhVXRpbHMuaXNCbG9iKGJvZHkpICYmXG4gICAgICAgICAgICAgICAgIVV0aWxzLmlzRm9ybURhdGEoYm9keSkpID9cbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGJvZHkpIDogYm9keTtcblxuICAgIH1cblxuICAgIHBhcnNlUmVzcG9uc2VCb2R5KGJvZHkpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmIChib2R5KSB7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSAgbnVsbDtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBKU09OVHJhbnNmb3JtO1xuIl19