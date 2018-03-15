"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status = require("./status");
/**
 * GeneralResponse response refers to response codes we don't have
 * an explicit type for.
 */
var GeneralResponse = /** @class */ (function () {
    function GeneralResponse(status, body, headers, options) {
        this.status = status;
        this.body = body;
        this.headers = headers;
        this.options = options;
    }
    return GeneralResponse;
}());
exports.GeneralResponse = GeneralResponse;
/**
 * Ok response.
 */
var Ok = /** @class */ (function () {
    function Ok(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.OK;
    }
    return Ok;
}());
exports.Ok = Ok;
/**
 * Accepted response.
 */
var Accepted = /** @class */ (function () {
    function Accepted(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.ACCEPTED;
    }
    return Accepted;
}());
exports.Accepted = Accepted;
/**
 * NoContent response.
 */
var NoContent = /** @class */ (function () {
    function NoContent(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.NO_CONTENT;
    }
    return NoContent;
}());
exports.NoContent = NoContent;
/**
 * Created response.
 */
var Created = /** @class */ (function () {
    function Created(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.CREATED;
    }
    return Created;
}());
exports.Created = Created;
/**
 * BadRequest response.
 */
var BadRequest = /** @class */ (function () {
    function BadRequest(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.BAD_REQUEST;
    }
    return BadRequest;
}());
exports.BadRequest = BadRequest;
/**
 * Unauthorized response.
 */
var Unauthorized = /** @class */ (function () {
    function Unauthorized(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.UNAUTHORIZED;
    }
    return Unauthorized;
}());
exports.Unauthorized = Unauthorized;
/**
 * Forbidden response.
 */
var Forbidden = /** @class */ (function () {
    function Forbidden(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.FORBIDDEN;
    }
    return Forbidden;
}());
exports.Forbidden = Forbidden;
/**
 * NotFound response.
 */
var NotFound = /** @class */ (function () {
    function NotFound(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.NOT_FOUND;
    }
    return NotFound;
}());
exports.NotFound = NotFound;
/**
 * Conflict response.
 */
var Conflict = /** @class */ (function () {
    function Conflict(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.CONFLICT;
    }
    return Conflict;
}());
exports.Conflict = Conflict;
/**
 * InternalServerError response.
 */
var InternalServerError = /** @class */ (function () {
    function InternalServerError(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.status = status.INTERNAL_SERVER_ERROR;
    }
    return InternalServerError;
}());
exports.InternalServerError = InternalServerError;
var statuses = (_a = {},
    _a[status.OK] = Ok,
    _a[status.ACCEPTED] = Accepted,
    _a[status.NO_CONTENT] = NoContent,
    _a[status.CREATED] = Created,
    _a[status.BAD_REQUEST] = BadRequest,
    _a[status.UNAUTHORIZED] = Unauthorized,
    _a[status.FORBIDDEN] = Forbidden,
    _a[status.NOT_FOUND] = NotFound,
    _a[status.CONFLICT] = Conflict,
    _a[status.INTERNAL_SERVER_ERROR] = InternalServerError,
    _a);
/**
 * createResponse creates a new typed Response or a GeneralResponse if unsupported.
 * @param <R> - The type of the body.
 */
exports.createResponse = function (status, body, headers, options) {
    if (options === void 0) { options = {}; }
    if (statuses.hasOwnProperty(status)) {
        var R = statuses[status];
        return new R(body, headers, options);
    }
    return new GeneralResponse(status, body, headers, options);
};
var _a;
//# sourceMappingURL=response.js.map