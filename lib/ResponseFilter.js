"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ResponseFilter filters a response to determine what Requesthandler
 * method to call.
 * @param {FilteredResponseMaco} handler
 * @implements {ResponseMaco}
 */
var ResponseFilter = function () {
    function ResponseFilter(handler) {
        _classCallCheck(this, ResponseFilter);

        this.handler = handler;
    }

    _createClass(ResponseFilter, [{
        key: "onResponse",
        value: function onResponse(r) {

            switch (r.status) {

                case 200:
                    this.handler.onSuccess(r);
                    break;
                case 201:
                    this.handler.onCreated(r);
                    break;
                case 204:
                    this.handler.onNoContent(r);
                    break;

                default:
                    throw new Error("Unknown status " + r.status);

            }
        }
    }, {
        key: "onError",
        value: function onError(e) {

            switch (e.status) {

                case 400:
                    this.handler.onBadRequest(e);
                    break;

                case 401:
                    this.handler.onUnauthorzied(e);
                    break;

                case 403:
                    this.handler.onForbidden(e);
                    break;

                case 404:
                    this.handler.onNotFound(e);
                    break;

                case 409:
                    this.handler.onConflict(e);
                    break;

                case 500:
                    this.handler.onInternalError(e);
                    break;

                default:
                    this.handler.onError(e);
                    break;

            }
        }
    }]);

    return ResponseFilter;
}();

exports.default = ResponseFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zZUZpbHRlci5qcyJdLCJuYW1lcyI6WyJSZXNwb25zZUZpbHRlciIsImhhbmRsZXIiLCJyIiwic3RhdHVzIiwib25TdWNjZXNzIiwib25DcmVhdGVkIiwib25Ob0NvbnRlbnQiLCJFcnJvciIsImUiLCJvbkJhZFJlcXVlc3QiLCJvblVuYXV0aG9yemllZCIsIm9uRm9yYmlkZGVuIiwib25Ob3RGb3VuZCIsIm9uQ29uZmxpY3QiLCJvbkludGVybmFsRXJyb3IiLCJvbkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztJQU1NQSxjO0FBRUYsNEJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFFakIsYUFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBRUg7Ozs7bUNBRVVDLEMsRUFBRzs7QUFFVixvQkFBUUEsRUFBRUMsTUFBVjs7QUFFSSxxQkFBSyxHQUFMO0FBQ0kseUJBQUtGLE9BQUwsQ0FBYUcsU0FBYixDQUF1QkYsQ0FBdkI7QUFDQTtBQUNKLHFCQUFLLEdBQUw7QUFDSSx5QkFBS0QsT0FBTCxDQUFhSSxTQUFiLENBQXVCSCxDQUF2QjtBQUNBO0FBQ0oscUJBQUssR0FBTDtBQUNJLHlCQUFLRCxPQUFMLENBQWFLLFdBQWIsQ0FBeUJKLENBQXpCO0FBQ0E7O0FBRUo7QUFDSSwwQkFBTSxJQUFJSyxLQUFKLHFCQUE0QkwsRUFBRUMsTUFBOUIsQ0FBTjs7QUFiUjtBQWlCSDs7O2dDQUVPSyxDLEVBQUc7O0FBRVAsb0JBQVFBLEVBQUVMLE1BQVY7O0FBRUkscUJBQUssR0FBTDtBQUNJLHlCQUFLRixPQUFMLENBQWFRLFlBQWIsQ0FBMEJELENBQTFCO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLUCxPQUFMLENBQWFTLGNBQWIsQ0FBNEJGLENBQTVCO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLUCxPQUFMLENBQWFVLFdBQWIsQ0FBeUJILENBQXpCO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLUCxPQUFMLENBQWFXLFVBQWIsQ0FBd0JKLENBQXhCO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLUCxPQUFMLENBQWFZLFVBQWIsQ0FBd0JMLENBQXhCO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLUCxPQUFMLENBQWFhLGVBQWIsQ0FBNkJOLENBQTdCO0FBQ0E7O0FBRUo7QUFDSSx5QkFBS1AsT0FBTCxDQUFhYyxPQUFiLENBQXFCUCxDQUFyQjtBQUNBOztBQTVCUjtBQWdDSDs7Ozs7O2tCQUlVUixjIiwiZmlsZSI6IlJlc3BvbnNlRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXNwb25zZUZpbHRlciBmaWx0ZXJzIGEgcmVzcG9uc2UgdG8gZGV0ZXJtaW5lIHdoYXQgUmVxdWVzdGhhbmRsZXJcbiAqIG1ldGhvZCB0byBjYWxsLlxuICogQHBhcmFtIHtGaWx0ZXJlZFJlc3BvbnNlTWFjb30gaGFuZGxlclxuICogQGltcGxlbWVudHMge1Jlc3BvbnNlTWFjb31cbiAqL1xuY2xhc3MgUmVzcG9uc2VGaWx0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoaGFuZGxlcikge1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cbiAgICB9XG5cbiAgICBvblJlc3BvbnNlKHIpIHtcblxuICAgICAgICBzd2l0Y2ggKHIuc3RhdHVzKSB7XG5cbiAgICAgICAgICAgIGNhc2UgMjAwOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vblN1Y2Nlc3Mocik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMTpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25DcmVhdGVkKHIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyLm9uTm9Db250ZW50KHIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBzdGF0dXMgJHtyLnN0YXR1c31gKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvbkVycm9yKGUpIHtcblxuICAgICAgICBzd2l0Y2ggKGUuc3RhdHVzKSB7XG5cbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vbkJhZFJlcXVlc3QoZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vblVuYXV0aG9yemllZChlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyLm9uRm9yYmlkZGVuKGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25Ob3RGb3VuZChlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MDk6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyLm9uQ29uZmxpY3QoZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vbkludGVybmFsRXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlRmlsdGVyXG4iXX0=