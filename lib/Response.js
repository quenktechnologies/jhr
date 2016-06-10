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

var Response = function Response(status, data, headers, body, statusText) {
    _classCallCheck(this, Response);

    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.headers = headers;
    this.body = body;
}

/**
 * create a new HTTPResponse
 * @param {XMLHttpRequest} xhr
 * @param {Transform} transform
 */
;

Response.create = function (xhr, transform) {
    return new Response(xhr.status, transform.transformResponseBody(xhr.response), (0, _parseHeaders2['default'])(xhr.getAllResponseHeaders()), xhr.responseText, xhr.statusText);
};
exports['default'] = Response;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzRCQUFrQixlQUFlOzs7Ozs7OztJQUszQixRQUFRLEdBRUMsU0FGVCxRQUFRLENBRUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTswQkFGbkQsUUFBUTs7QUFHTixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQjs7Ozs7Ozs7O0FBU0wsUUFBUSxDQUFDLE1BQU0sR0FBRyxVQUFTLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDdkMsV0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQ3pFLCtCQUFNLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDN0UsQ0FBQTtxQkFDYyxRQUFRIiwiZmlsZSI6IlJlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlIGZyb20gJ3BhcnNlLWhlYWRlcnMnO1xuXG4vKipcbiAqIFJlc3BvbnNlXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgZGF0YSwgaGVhZGVycywgYm9keSwgc3RhdHVzVGV4dCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBuZXcgSFRUUFJlc3BvbnNlXG4gKiBAcGFyYW0ge1hNTEh0dHBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSB0cmFuc2Zvcm1cbiAqL1xuUmVzcG9uc2UuY3JlYXRlID0gZnVuY3Rpb24oeGhyLCB0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHhoci5zdGF0dXMsIHRyYW5zZm9ybS50cmFuc2Zvcm1SZXNwb25zZUJvZHkoeGhyLnJlc3BvbnNlKSxcbiAgICAgICAgcGFyc2UoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSwgeGhyLnJlc3BvbnNlVGV4dCwgeGhyLnN0YXR1c1RleHQpO1xufVxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2U7XG4iXX0=