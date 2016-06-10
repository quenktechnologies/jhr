'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var buildUrl = function buildUrl(url, params) {
    if (!params) return url;
    return url + '?' + _qs2['default'].stringify(params);
};

exports['default'] = buildUrl;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9idWlsZFVybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBZSxJQUFJOzs7O0FBRW5CLElBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUM7QUFDaEMsUUFBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN2QixXQUFPLEdBQUcsR0FBQyxHQUFHLEdBQUMsZ0JBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLENBQUE7O3FCQUVjLFFBQVEiLCJmaWxlIjoiYnVpbGRVcmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXMgZnJvbSAncXMnO1xuXG52YXIgYnVpbGRVcmwgPSBmdW5jdGlvbih1cmwsIHBhcmFtcyl7XG4gICAgaWYoIXBhcmFtcykgcmV0dXJuIHVybDtcbiAgICByZXR1cm4gdXJsKyc/Jytxcy5zdHJpbmdpZnkocGFyYW1zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVcmxcbiJdfQ==