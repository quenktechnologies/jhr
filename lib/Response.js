'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Headers = require('./Headers');

var _Headers2 = _interopRequireDefault(_Headers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Response
 * @property {number} status
 * @property {Object} body
 * @property {Object} headers
 */
var Response = function () {
    function Response(status, body, headers) {
        _classCallCheck(this, Response);

        (0, _beof2.default)({ status: status }).number();
        (0, _beof2.default)({ body: body }).optional().object();
        (0, _beof2.default)({ headers: headers }).object();

        this.status = status;
        this.headers = headers;
        this.body = body;
    }

    /**
     * create a new HTTPResponse
     * @param {XMLHttpRequest} xhr
     * @param {object} body
     */


    _createClass(Response, null, [{
        key: 'create',
        value: function create(xhr, body) {

            return new Response(xhr.status, body, _Headers2.default.parse(xhr.getAllResponseHeaders()));
        }
    }]);

    return Response;
}();

exports.default = Response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zZS5qcyJdLCJuYW1lcyI6WyJSZXNwb25zZSIsInN0YXR1cyIsImJvZHkiLCJoZWFkZXJzIiwibnVtYmVyIiwib3B0aW9uYWwiLCJvYmplY3QiLCJ4aHIiLCJwYXJzZSIsImdldEFsbFJlc3BvbnNlSGVhZGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7SUFNTUEsUTtBQUVGLHNCQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUM7QUFBQTs7QUFFL0IsNEJBQUssRUFBRUYsY0FBRixFQUFMLEVBQWlCRyxNQUFqQjtBQUNBLDRCQUFLLEVBQUVGLFVBQUYsRUFBTCxFQUFlRyxRQUFmLEdBQTBCQyxNQUExQjtBQUNBLDRCQUFLLEVBQUVILGdCQUFGLEVBQUwsRUFBa0JHLE1BQWxCOztBQUVBLGFBQUtMLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtFLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtELElBQUwsR0FBWUEsSUFBWjtBQUVIOztBQUVEOzs7Ozs7Ozs7K0JBS2NLLEcsRUFBS0wsSSxFQUFNOztBQUVyQixtQkFBTyxJQUFJRixRQUFKLENBQWFPLElBQUlOLE1BQWpCLEVBQXlCQyxJQUF6QixFQUNILGtCQUFRTSxLQUFSLENBQWNELElBQUlFLHFCQUFKLEVBQWQsQ0FERyxDQUFQO0FBR0g7Ozs7OztrQkFJVVQsUSIsImZpbGUiOiJSZXNwb25zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEhlYWRlcnMgZnJvbSAnLi9IZWFkZXJzJztcblxuLyoqXG4gKiBSZXNwb25zZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXR1c1xuICogQHByb3BlcnR5IHtPYmplY3R9IGJvZHlcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBoZWFkZXJzXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgYm9keSwgaGVhZGVycykge1xuXG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG4gICAgICAgIGJlb2YoeyBib2R5IH0pLm9wdGlvbmFsKCkub2JqZWN0KCk7XG4gICAgICAgIGJlb2YoeyBoZWFkZXJzIH0pLm9iamVjdCgpO1xuXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlIGEgbmV3IEhUVFBSZXNwb25zZVxuICAgICAqIEBwYXJhbSB7WE1MSHR0cFJlcXVlc3R9IHhoclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib2R5XG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSh4aHIsIGJvZHkpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHhoci5zdGF0dXMsIGJvZHksXG4gICAgICAgICAgICBIZWFkZXJzLnBhcnNlKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlXG4iXX0=