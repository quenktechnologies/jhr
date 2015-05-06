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

var _TransportError = require('./TransportError');

var _TransportError2 = _interopRequireDefault(_TransportError);

var _Transport = require('./Transport');

var _Transport2 = _interopRequireDefault(_Transport);

var _JSONTransform = require('./JSONTransform');

var _JSONTransform2 = _interopRequireDefault(_JSONTransform);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

exports['default'] = {
    Agent: _Agent2['default'],
    Response: _Response2['default'],
    XHRTransport: _Transport2['default'],
    JSONTransform: _JSONTransform2['default'],
    ClientError: _ClientError2['default'],
    ServerError: _ServerError2['default'],
    TransportError: _TransportError2['default'],
    createAgent: function createAgent() {
        return new _Agent2['default'](new _Transport2['default'](new _JSONTransform2['default']()));
    }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztxQkFBa0IsU0FBUzs7OzsyQkFDSCxlQUFlOzs7OzJCQUNmLGVBQWU7Ozs7OEJBQ1osa0JBQWtCOzs7O3lCQUNwQixhQUFhOzs7OzZCQUNaLGlCQUFpQjs7Ozt3QkFDdEIsWUFBWTs7OztxQkFFakI7QUFDWixTQUFLLG9CQUFPO0FBQ1osWUFBUSx1QkFBVTtBQUNsQixnQkFBWSx3QkFBYztBQUMxQixpQkFBYSw0QkFBZTtBQUM1QixlQUFXLDBCQUFhO0FBQ3hCLGVBQVcsMEJBQWE7QUFDeEIsa0JBQWMsNkJBQWdCO0FBQzlCLGVBQVcsRUFBRSx1QkFBVztBQUNwQixlQUFPLHVCQUFVLDJCQUFpQixnQ0FBbUIsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7O0NBRUoiLCJmaWxlIjoic3JjL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFnZW50IGZyb20gJy4vQWdlbnQnO1xuaW1wb3J0IENsaWVudEVycm9yIGZyb20gJy4vQ2xpZW50RXJyb3InO1xuaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJy4vU2VydmVyRXJyb3InO1xuaW1wb3J0IFRyYW5zcG9ydEVycm9yIGZyb20gJy4vVHJhbnNwb3J0RXJyb3InO1xuaW1wb3J0IFhIUlRyYW5zcG9ydCBmcm9tICcuL1RyYW5zcG9ydCc7XG5pbXBvcnQgSlNPTlRyYW5zZm9ybSBmcm9tICcuL0pTT05UcmFuc2Zvcm0nO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuXG5leHBvcnQgZGVmYXVsdCAge1xuICAgIEFnZW50OiBBZ2VudCxcbiAgICBSZXNwb25zZTogUmVzcG9uc2UsXG4gICAgWEhSVHJhbnNwb3J0OiBYSFJUcmFuc3BvcnQsXG4gICAgSlNPTlRyYW5zZm9ybTogSlNPTlRyYW5zZm9ybSxcbiAgICBDbGllbnRFcnJvcjogQ2xpZW50RXJyb3IsXG4gICAgU2VydmVyRXJyb3I6IFNlcnZlckVycm9yLFxuICAgIFRyYW5zcG9ydEVycm9yOiBUcmFuc3BvcnRFcnJvcixcbiAgICBjcmVhdGVBZ2VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWdlbnQobmV3IFhIUlRyYW5zcG9ydChuZXcgSlNPTlRyYW5zZm9ybSgpKSk7XG4gICAgfVxuXG59Il19