"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JHRError = (function (_super) {
    __extends(JHRError, _super);
    function JHRError(message) {
        if (message === void 0) { message = ''; }
        var _this = _super.call(this, message) || this;
        (Object.setPrototypeOf) ?
            Object.setPrototypeOf(_this, JHRError.prototype) :
            _this.__proto__ = JHRError.prototype;
        _this.message = message;
        _this.stack = (new Error(message)).stack;
        if (Error.hasOwnProperty('captureStackTrace'))
            Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return JHRError;
}(Error));
exports.JHRError = JHRError;
JHRError.prototype = Object.create(Error.prototype);
JHRError.prototype.constructor = JHRError;
var AbortError = (function (_super) {
    __extends(AbortError, _super);
    function AbortError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbortError;
}(JHRError));
exports.AbortError = AbortError;
var TransportError = (function (_super) {
    __extends(TransportError, _super);
    function TransportError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransportError;
}(JHRError));
exports.TransportError = TransportError;
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(status, text, body, rawResponse) {
        var _this = _super.call(this, text) || this;
        _this.status = status;
        _this.text = text;
        _this.body = body;
        _this.rawResponse = rawResponse;
        _this.__proto__ = HTTPError.prototype;
        return _this;
    }
    return HTTPError;
}(JHRError));
exports.HTTPError = HTTPError;
var ClientError = (function (_super) {
    __extends(ClientError, _super);
    function ClientError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClientError;
}(HTTPError));
exports.ClientError = ClientError;
var BadRequest = (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BadRequest;
}(ClientError));
exports.BadRequest = BadRequest;
var Unauthorized = (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Unauthorized;
}(ClientError));
exports.Unauthorized = Unauthorized;
var Forbidden = (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Forbidden;
}(ClientError));
exports.Forbidden = Forbidden;
var NotFound = (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFound;
}(ClientError));
exports.NotFound = NotFound;
var Conflict = (function (_super) {
    __extends(Conflict, _super);
    function Conflict() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Conflict;
}(ClientError));
exports.Conflict = Conflict;
var ServerError = (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerError;
}(HTTPError));
exports.ServerError = ServerError;
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalServerError;
}(ServerError));
exports.InternalServerError = InternalServerError;
var MAP = {
    400: BadRequest,
    401: Unauthorized,
    403: Forbidden,
    404: NotFound,
    409: Conflict,
    500: InternalServerError
};
/**
 * create is a helper function for creating the correct error from a
 * response.
 */
function create(status, text, body, rawResponse) {
    if (MAP.hasOwnProperty(status)) {
        var C = MAP[status];
        return new C(status, text, body, rawResponse);
    }
    if (status >= 500)
        return new ServerError(status, text, body, rawResponse);
    return new ClientError(status, text, body, rawResponse);
}
exports.create = create;
//# sourceMappingURL=Errors.js.map