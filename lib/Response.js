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
var Headers = require("./Headers");
var Status = require("./Status");
/**
 * Response
 */
var Response = (function () {
    function Response(body, headers, options) {
        this.body = body;
        this.headers = headers;
        this.options = options;
    }
    return Response;
}());
exports.Response = Response;
var UnTyped = (function (_super) {
    __extends(UnTyped, _super);
    function UnTyped(status, body, headers, options) {
        var _this = _super.call(this, body, headers, options) || this;
        _this.status = status;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return UnTyped;
}(Response));
exports.UnTyped = UnTyped;
var Ok = (function (_super) {
    __extends(Ok, _super);
    function Ok() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.OK;
        return _this;
    }
    return Ok;
}(Response));
exports.Ok = Ok;
var Accepted = (function (_super) {
    __extends(Accepted, _super);
    function Accepted() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.ACCEPTED;
        return _this;
    }
    return Accepted;
}(Response));
exports.Accepted = Accepted;
var NoContent = (function (_super) {
    __extends(NoContent, _super);
    function NoContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.NO_CONTENT;
        return _this;
    }
    return NoContent;
}(Response));
exports.NoContent = NoContent;
var Created = (function (_super) {
    __extends(Created, _super);
    function Created() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.CREATED;
        return _this;
    }
    return Created;
}(Response));
exports.Created = Created;
var BadRequest = (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.BAD_REQUEST;
        return _this;
    }
    return BadRequest;
}(Response));
exports.BadRequest = BadRequest;
var Unauthorized = (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.UNAUTHORIZED;
        return _this;
    }
    return Unauthorized;
}(Response));
exports.Unauthorized = Unauthorized;
var Forbidden = (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.FORBIDDEN;
        return _this;
    }
    return Forbidden;
}(Response));
exports.Forbidden = Forbidden;
var NotFound = (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.NOT_FOUND;
        return _this;
    }
    return NotFound;
}(Response));
exports.NotFound = NotFound;
var Conflict = (function (_super) {
    __extends(Conflict, _super);
    function Conflict() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.CONFLICT;
        return _this;
    }
    return Conflict;
}(Response));
exports.Conflict = Conflict;
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = Status.INTERNAL_SERVER_ERROR;
        return _this;
    }
    return InternalServerError;
}(Response));
exports.InternalServerError = InternalServerError;
var statuses = (_a = {},
    _a[Status.OK] = Ok,
    _a[Status.ACCEPTED] = Accepted,
    _a[Status.NO_CONTENT] = NoContent,
    _a[Status.CREATED] = Created,
    _a[Status.BAD_REQUEST] = BadRequest,
    _a[Status.UNAUTHORIZED] = Unauthorized,
    _a[Status.FORBIDDEN] = Forbidden,
    _a[Status.NOT_FOUND] = NotFound,
    _a[Status.CONFLICT] = Conflict,
    _a[Status.INTERNAL_SERVER_ERROR] = InternalServerError,
    _a);
/**
 * create a new HTTPResponse
 */
exports.create = function (xhr, body, options) {
    var headers = Headers.parse(xhr.getAllResponseHeaders());
    if (statuses.hasOwnProperty(xhr.status)) {
        var R = statuses[xhr.status];
        return new R(body, headers);
    }
    return new UnTyped(xhr.status, body, headers, options);
};
var _a;
//# sourceMappingURL=Response.js.map