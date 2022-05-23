"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = exports.InternalServerError = exports.ServerError = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.ClientError = exports.Created = exports.NoContent = exports.Accepted = exports.Ok = exports.Success = exports.GenericResponse = void 0;
const status = require("./status");
/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
class GenericResponse {
    constructor(code, body, headers, request) {
        this.code = code;
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.GenericResponse = GenericResponse;
/**
 * Success
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
class Success extends GenericResponse {
}
exports.Success = Success;
/**
 * Ok response.
 */
class Ok extends Success {
    constructor(body, headers, request) {
        super(status.OK, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Ok = Ok;
/**
 * Accepted response.
 */
class Accepted extends Success {
    constructor(body, headers, request) {
        super(status.ACCEPTED, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Accepted = Accepted;
/**
 * NoContent response.
 *
 * NOTE: In practice, the body here should always be undefined.
 */
class NoContent extends Success {
    constructor(body, headers, request) {
        super(status.NO_CONTENT, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.NoContent = NoContent;
/**
 * Created response.
 */
class Created extends Success {
    constructor(body, headers, request) {
        super(status.CREATED, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Created = Created;
/**
 * ClientError
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
class ClientError extends GenericResponse {
}
exports.ClientError = ClientError;
/**
 * BadRequest response.
 */
class BadRequest extends ClientError {
    constructor(body, headers, request) {
        super(status.BAD_REQUEST, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.BadRequest = BadRequest;
/**
 * Unauthorized response.
 */
class Unauthorized extends ClientError {
    constructor(body, headers, request) {
        super(status.UNAUTHORIZED, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Unauthorized = Unauthorized;
/**
 * Forbidden response.
 */
class Forbidden extends ClientError {
    constructor(body, headers, request) {
        super(status.FORBIDDEN, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Forbidden = Forbidden;
/**
 * NotFound response.
 */
class NotFound extends ClientError {
    constructor(body, headers, request) {
        super(status.NOT_FOUND, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.NotFound = NotFound;
/**
 * Conflict response.
 */
class Conflict extends ClientError {
    constructor(body, headers, request) {
        super(status.CONFLICT, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
    }
}
exports.Conflict = Conflict;
/**
 * ServerError
 */
class ServerError extends GenericResponse {
}
exports.ServerError = ServerError;
/**
 * InternalServerError response.
 */
class InternalServerError extends ServerError {
    constructor(body, headers, request) {
        super(status.INTERNAL_SERVER_ERROR, body, headers, request);
        this.body = body;
        this.headers = headers;
        this.request = request;
        this.status = status.INTERNAL_SERVER_ERROR;
    }
}
exports.InternalServerError = InternalServerError;
/**
 * createResponse creates a new typed Response or a GenericResponse if
 * unsupported.
 */
const createResponse = (code, body, headers, request) => {
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