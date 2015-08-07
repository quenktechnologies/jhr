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

                if (body) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
            }

            return body;
        }
    }]);

    return JSONTransform;
})();

exports['default'] = JSONTransform;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU09OVHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQkFBZSxJQUFJOzs7O3FCQUNELFNBQVM7Ozs7Ozs7O0lBS3JCLGFBQWE7QUFFSixhQUZULGFBQWEsQ0FFSCxNQUFNLEVBQUU7OEJBRmxCLGFBQWE7O0FBSVgsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDO0FBQ3ZDLFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFlBQUksQ0FBQyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsWUFBSSxDQUFDLG1CQUFtQixHQUFHLGdDQUFnQyxDQUFDO0tBQy9EOztpQkFSQyxhQUFhOztlQVVLLDhCQUFDLElBQUksRUFBRTtBQUN2QixtQkFBTyxBQUFDLGdCQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFDM0MsQ0FBQyxtQkFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDcEY7OztlQUVvQiwrQkFBQyxJQUFJLEVBQUU7O0FBRXhCLGdCQUFJLGdCQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTs7QUFFakIsb0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRTVDLG9CQUFHLElBQUksRUFBRTtBQUNQLHdCQUFHO0FBQ0QsNEJBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN6QixDQUFBLE9BQU0sQ0FBQyxFQUFDLEVBRVI7aUJBQ0Y7YUFFQTs7QUFFTCxtQkFBTyxJQUFJLENBQUM7U0FFZjs7O1dBakNDLGFBQWE7OztxQkFxQ0osYUFBYSIsImZpbGUiOiJKU09OVHJhbnNmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzIGZyb20gJ2lzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzJztcblxuLyoqXG4gKiBKU09OVHJhbnNmb3JtXG4gKi9cbmNsYXNzIEpTT05UcmFuc2Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IocHJlZml4KSB7XG5cbiAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXggfHwgL15cXClcXF1cXH0nLD9cXG4vO1xuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgdGhpcy5BQ0NFUFRfSEVBREVSID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB0aGlzLkNPTlRFTlRfVFlQRV9IRUFERVIgPSAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JztcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1SZXF1ZXN0Qm9keShib2R5KSB7XG4gICAgICAgIHJldHVybiAoaXMub2JqZWN0KGJvZHkpICYmICFVdGlscy5pc0ZpbGUoYm9keSlcbiAgICAgICAgJiYgIVV0aWxzLmlzQmxvYihib2R5KSAmJiAhVXRpbHMuaXNGb3JtRGF0YShib2R5KSkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IGJvZHk7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtUmVzcG9uc2VCb2R5KGJvZHkpIHtcblxuICAgICAgICBpZiAoaXMuc3RyaW5nKGJvZHkpKSB7XG5cbiAgICAgICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmKGJvZHkpIHtcbiAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvZHk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNPTlRyYW5zZm9ybTtcblxuIl19