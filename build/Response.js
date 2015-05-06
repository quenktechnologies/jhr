'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parseHeaders = require('parse-headers');

var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

/**
 * Response
 */

var Response = function Response(status, data, headers, text) {
    _classCallCheck(this, Response);

    this.status = status;
    this.data = data;
    this.headers = headers;
    this.text = text;
};

/**
 * create a new HTTPResponse
 * @param {XMLHttpRequest} xhr
 * @param {Transform} transform
 */
Response.create = function (xhr, transform) {
    return new Response(xhr.status, transform.transformResponseBody(xhr.response), _parseHeaders2['default'](xhr.getAllResponseHeaders()), xhr.statusText);
};
exports['default'] = Response;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzRCQUFrQixlQUFlOzs7Ozs7OztJQUszQixRQUFRLEdBRUMsU0FGVCxRQUFRLENBRUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFOzBCQUZ2QyxRQUFROztBQUlOLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBRXBCOzs7Ozs7O0FBU0wsUUFBUSxDQUFDLE1BQU0sR0FBRyxVQUFTLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDdkMsV0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQ3pFLDBCQUFNLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNELENBQUE7cUJBQ2MsUUFBUSIsImZpbGUiOiJzcmMvUmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFyc2UgZnJvbSAncGFyc2UtaGVhZGVycyc7XG5cbi8qKlxuICogUmVzcG9uc2VcbiAqL1xuY2xhc3MgUmVzcG9uc2Uge1xuXG4gICAgY29uc3RydWN0b3Ioc3RhdHVzLCBkYXRhLCBoZWFkZXJzLCB0ZXh0KSB7XG5cbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBuZXcgSFRUUFJlc3BvbnNlXG4gKiBAcGFyYW0ge1hNTEh0dHBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSB0cmFuc2Zvcm1cbiAqL1xuUmVzcG9uc2UuY3JlYXRlID0gZnVuY3Rpb24oeGhyLCB0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHhoci5zdGF0dXMsIHRyYW5zZm9ybS50cmFuc2Zvcm1SZXNwb25zZUJvZHkoeGhyLnJlc3BvbnNlKSxcbiAgICAgICAgcGFyc2UoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSwgeGhyLnN0YXR1c1RleHQpO1xufVxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2U7XG4iXX0=