"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = exports.InternalServerError = exports.ServerError = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.ClientError = exports.Created = exports.NoContent = exports.Accepted = exports.Ok = exports.Success = exports.GenericResponse = void 0;
var status = require("./status");
/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
var GenericResponse = /** @class */ (function () {
    function GenericResponse(code, body, headers, request) {
        this.code = code;
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
    return GenericResponse;
}());
exports.GenericResponse = GenericResponse;
/**
 * Success
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Success;
}(GenericResponse));
exports.Success = Success;
/**
 * Ok response.
 */
var Ok = /** @class */ (function (_super) {
    __extends(Ok, _super);
    function Ok(body, headers, request) {
        var _this = _super.call(this, status.OK, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Ok;
}(Success));
exports.Ok = Ok;
/**
 * Accepted response.
 */
var Accepted = /** @class */ (function (_super) {
    __extends(Accepted, _super);
    function Accepted(body, headers, request) {
        var _this = _super.call(this, status.ACCEPTED, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Accepted;
}(Success));
exports.Accepted = Accepted;
/**
 * NoContent response.
 *
 * NOTE: In practice, the body here should always be undefined.
 */
var NoContent = /** @class */ (function (_super) {
    __extends(NoContent, _super);
    function NoContent(body, headers, request) {
        var _this = _super.call(this, status.NO_CONTENT, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return NoContent;
}(Success));
exports.NoContent = NoContent;
/**
 * Created response.
 */
var Created = /** @class */ (function (_super) {
    __extends(Created, _super);
    function Created(body, headers, request) {
        var _this = _super.call(this, status.CREATED, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Created;
}(Success));
exports.Created = Created;
/**
 * ClientError
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClientError;
}(GenericResponse));
exports.ClientError = ClientError;
/**
 * BadRequest response.
 */
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(body, headers, request) {
        var _this = _super.call(this, status.BAD_REQUEST, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return BadRequest;
}(ClientError));
exports.BadRequest = BadRequest;
/**
 * Unauthorized response.
 */
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(body, headers, request) {
        var _this = _super.call(this, status.UNAUTHORIZED, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Unauthorized;
}(ClientError));
exports.Unauthorized = Unauthorized;
/**
 * Forbidden response.
 */
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(body, headers, request) {
        var _this = _super.call(this, status.FORBIDDEN, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Forbidden;
}(ClientError));
exports.Forbidden = Forbidden;
/**
 * NotFound response.
 */
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(body, headers, request) {
        var _this = _super.call(this, status.NOT_FOUND, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return NotFound;
}(ClientError));
exports.NotFound = NotFound;
/**
 * Conflict response.
 */
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(body, headers, request) {
        var _this = _super.call(this, status.CONFLICT, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        return _this;
    }
    return Conflict;
}(ClientError));
exports.Conflict = Conflict;
/**
 * ServerError
 */
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerError;
}(GenericResponse));
exports.ServerError = ServerError;
/**
 * InternalServerError response.
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(body, headers, request) {
        var _this = _super.call(this, status.INTERNAL_SERVER_ERROR, body, headers, request) || this;
        _this.body = body;
        _this.headers = headers;
        _this.request = request;
        _this.status = status.INTERNAL_SERVER_ERROR;
        return _this;
    }
    return InternalServerError;
}(ServerError));
exports.InternalServerError = InternalServerError;
/**
 * createResponse creates a new typed Response or a GenericResponse if
 * unsupported.
 */
var createResponse = function (code, body, headers, request) {
    switch (code) {
        case status.OK:
            return new Ok(body, headers, request);
        case status.ACCEPTED:
            return new Accepted(body, headers, request);
        case status.NO_CONTENT:
            return new NoContent(body, headers, request);
        case status.CREATED:
            return new Created(body, headers, request);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, request);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, request);
        case status.UNAUTHORIZED:
            return new Unauthorized(body, headers, request);
        case status.FORBIDDEN:
            return new Forbidden(body, headers, request);
        case status.NOT_FOUND:
            return new NotFound(body, headers, request);
        case status.CONFLICT:
            return new Conflict(body, headers, request);
        case status.INTERNAL_SERVER_ERROR:
            return new InternalServerError(body, headers, request);
        default:
            if ((code >= 400) && (code <= 499))
                return new ClientError(code, body, headers, request);
            else if (code >= 500)
                return new ServerError(code, body, headers, request);
            else
                return new GenericResponse(code, body, headers, request);
    }
};
exports.createResponse = createResponse;
//# sourceMappingURL=response.js.map