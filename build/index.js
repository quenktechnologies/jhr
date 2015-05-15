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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBa0IsU0FBUzs7OzsyQkFDSCxlQUFlOzs7OzJCQUNmLGVBQWU7Ozs7eUJBQ2pCLGFBQWE7Ozs7OEJBQ1Isa0JBQWtCOzs7OzRCQUNwQixnQkFBZ0I7Ozs7NkJBQ2YsaUJBQWlCOzs7O3dCQUN0QixZQUFZOzs7O3FCQUVqQjtBQUNaLFNBQUssb0JBQU87QUFDWixZQUFRLHVCQUFVO0FBQ2xCLGdCQUFZLDJCQUFjO0FBQzFCLGlCQUFhLDRCQUFlO0FBQzVCLGVBQVcsMEJBQWE7QUFDeEIsZUFBVywwQkFBYTtBQUN4QixrQkFBYyw2QkFBZ0I7QUFDOUIsYUFBUyx3QkFBVztBQUNwQixlQUFXLEVBQUUsdUJBQVc7QUFDcEIsZUFBTyx1QkFBVSw4QkFBaUIsZ0NBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQzNEOztDQUVKIiwiZmlsZSI6InNyYy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZ2VudCBmcm9tICcuL0FnZW50JztcbmltcG9ydCBDbGllbnRFcnJvciBmcm9tICcuL0NsaWVudEVycm9yJztcbmltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICcuL1NlcnZlckVycm9yJztcbmltcG9ydCBIVFRQRXJyb3IgZnJvbSAnLi9IVFRQRXJyb3InO1xuaW1wb3J0IFRyYW5zcG9ydEVycm9yIGZyb20gJy4vVHJhbnNwb3J0RXJyb3InO1xuaW1wb3J0IFhIUlRyYW5zcG9ydCBmcm9tICcuL1hIUlRyYW5zcG9ydCc7XG5pbXBvcnQgSlNPTlRyYW5zZm9ybSBmcm9tICcuL0pTT05UcmFuc2Zvcm0nO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuXG5leHBvcnQgZGVmYXVsdCAge1xuICAgIEFnZW50OiBBZ2VudCxcbiAgICBSZXNwb25zZTogUmVzcG9uc2UsXG4gICAgWEhSVHJhbnNwb3J0OiBYSFJUcmFuc3BvcnQsXG4gICAgSlNPTlRyYW5zZm9ybTogSlNPTlRyYW5zZm9ybSxcbiAgICBDbGllbnRFcnJvcjogQ2xpZW50RXJyb3IsXG4gICAgU2VydmVyRXJyb3I6IFNlcnZlckVycm9yLFxuICAgIFRyYW5zcG9ydEVycm9yOiBUcmFuc3BvcnRFcnJvcixcbiAgICBIVFRQRXJyb3I6IEhUVFBFcnJvcixcbiAgICBjcmVhdGVBZ2VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWdlbnQobmV3IFhIUlRyYW5zcG9ydChuZXcgSlNPTlRyYW5zZm9ybSgpKSk7XG4gICAgfVxuXG59Il19