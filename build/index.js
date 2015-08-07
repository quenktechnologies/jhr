'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Agent = require('./Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _ClientError = require('./ClientError');

var _ClientError2 = _interopRequireDefault(_ClientError);

var _ServerError = require('./ServerError');

var _ServerError2 = _interopRequireDefault(_ServerError);

var _HTTPError = require('./HTTPError');

var _HTTPError2 = _interopRequireDefault(_HTTPError);

var _TransportError = require('./TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

var _XHRTransport = require('./XHRTransport');

var _XHRTransport2 = _interopRequireDefault(_XHRTransport);

var _JSONTransform = require('./JSONTransform');

var _JSONTransform2 = _interopRequireDefault(_JSONTransform);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

exports['default'] = {
    Agent: _Agent2['default'],
    Response: _Response2['default'],
    XHRTransport: _XHRTransport2['default'],
    JSONTransform: _JSONTransform2['default'],
    ClientError: _ClientError2['default'],
    ServerError: _ServerError2['default'],
    TransportError: _TransportError2['default'],
    HTTPError: _HTTPError2['default'],
    createAgent: function createAgent() {
        return new _Agent2['default'](new _XHRTransport2['default'](new _JSONTransform2['default']()));
    }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBa0IsU0FBUzs7OzsyQkFDSCxlQUFlOzs7OzJCQUNmLGVBQWU7Ozs7eUJBQ2pCLGFBQWE7Ozs7OEJBQ1Isa0JBQWtCOzs7OzRCQUNwQixnQkFBZ0I7Ozs7NkJBQ2YsaUJBQWlCOzs7O3dCQUN0QixZQUFZOzs7O3FCQUVqQjtBQUNaLFNBQUssb0JBQU87QUFDWixZQUFRLHVCQUFVO0FBQ2xCLGdCQUFZLDJCQUFjO0FBQzFCLGlCQUFhLDRCQUFlO0FBQzVCLGVBQVcsMEJBQWE7QUFDeEIsZUFBVywwQkFBYTtBQUN4QixrQkFBYyw2QkFBZ0I7QUFDOUIsYUFBUyx3QkFBVztBQUNwQixlQUFXLEVBQUUsdUJBQVc7QUFDcEIsZUFBTyx1QkFBVSw4QkFBaUIsZ0NBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQzNEOztDQUVKIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFnZW50IGZyb20gJy4vQWdlbnQnO1xuaW1wb3J0IENsaWVudEVycm9yIGZyb20gJy4vQ2xpZW50RXJyb3InO1xuaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJy4vU2VydmVyRXJyb3InO1xuaW1wb3J0IEhUVFBFcnJvciBmcm9tICcuL0hUVFBFcnJvcic7XG5pbXBvcnQgVHJhbnNwb3J0RXJyb3IgZnJvbSAnLi9UcmFuc3BvcnRFcnJvcic7XG5pbXBvcnQgWEhSVHJhbnNwb3J0IGZyb20gJy4vWEhSVHJhbnNwb3J0JztcbmltcG9ydCBKU09OVHJhbnNmb3JtIGZyb20gJy4vSlNPTlRyYW5zZm9ybSc7XG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICB7XG4gICAgQWdlbnQ6IEFnZW50LFxuICAgIFJlc3BvbnNlOiBSZXNwb25zZSxcbiAgICBYSFJUcmFuc3BvcnQ6IFhIUlRyYW5zcG9ydCxcbiAgICBKU09OVHJhbnNmb3JtOiBKU09OVHJhbnNmb3JtLFxuICAgIENsaWVudEVycm9yOiBDbGllbnRFcnJvcixcbiAgICBTZXJ2ZXJFcnJvcjogU2VydmVyRXJyb3IsXG4gICAgVHJhbnNwb3J0RXJyb3I6IFRyYW5zcG9ydEVycm9yLFxuICAgIEhUVFBFcnJvcjogSFRUUEVycm9yLFxuICAgIGNyZWF0ZUFnZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBZ2VudChuZXcgWEhSVHJhbnNwb3J0KG5ldyBKU09OVHJhbnNmb3JtKCkpKTtcbiAgICB9XG5cbn0iXX0=