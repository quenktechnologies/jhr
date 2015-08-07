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
}

/**
 * create a new HTTPResponse
 * @param {XMLHttpRequest} xhr
 * @param {Transform} transform
 */
;

Response.create = function (xhr, transform) {
    return new Response(xhr.status, transform.transformResponseBody(xhr.response), (0, _parseHeaders2['default'])(xhr.getAllResponseHeaders()), xhr.statusText);
};
exports['default'] = Response;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzRCQUFrQixlQUFlOzs7Ozs7OztJQUszQixRQUFRLEdBRUMsU0FGVCxRQUFRLENBRUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFOzBCQUZ2QyxRQUFROztBQUlOLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBRXBCOzs7Ozs7Ozs7QUFTTCxRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUN2QyxXQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDekUsK0JBQU0sR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDM0QsQ0FBQTtxQkFDYyxRQUFRIiwiZmlsZSI6IlJlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlIGZyb20gJ3BhcnNlLWhlYWRlcnMnO1xuXG4vKipcbiAqIFJlc3BvbnNlXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgZGF0YSwgaGVhZGVycywgdGV4dCkge1xuXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogY3JlYXRlIGEgbmV3IEhUVFBSZXNwb25zZVxuICogQHBhcmFtIHtYTUxIdHRwUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gdHJhbnNmb3JtXG4gKi9cblJlc3BvbnNlLmNyZWF0ZSA9IGZ1bmN0aW9uKHhociwgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh4aHIuc3RhdHVzLCB0cmFuc2Zvcm0udHJhbnNmb3JtUmVzcG9uc2VCb2R5KHhoci5yZXNwb25zZSksXG4gICAgICAgIHBhcnNlKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSksIHhoci5zdGF0dXNUZXh0KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlO1xuIl19