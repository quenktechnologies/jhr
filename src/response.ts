import * as status from './status';

import { IncommingHeaders } from './header';
import { RequestInfo } from './request';

/**
 * Response respresents the response from an HTTP requrest.
 *
 * @param <B> The body part of the response.
 */
export interface Response<B> {

    /**
     * code code of a Response.
     */
    code: status.Code,

    /**
     * body of the Response.
     */
    body: B,

    /**
     * headers received with the response.
     */
    headers: IncommingHeaders,

    /**
     * request holds info about the Request used to receive the Response
     * except for the body.
     */
    request: RequestInfo

}

/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
export class GenericResponse<B> implements Response<B> {

    constructor(
        public code: number,
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) { }

}

/**
 * Success 
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export class Success<B> extends GenericResponse<B> { }

/**
 * Ok response.
 */
export class Ok<B> extends Success<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) { super(status.OK, body, headers, request); }

}

/**
 * Accepted response.
 */
export class Accepted<B> extends Success<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) { super(status.ACCEPTED, body, headers, request); }

}

/**
 * NoContent response.
 *
 * NOTE: In practice, the body here should always be undefined.
 */
export class NoContent<B> extends Success<B> {


    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {

        super(status.NO_CONTENT, body, headers, request);

    }

}

/**
 * Created response.
 */
export class Created<B> extends Success<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) { super(status.CREATED, body, headers, request); }

}

/**
 * ClientError
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export class ClientError<B> extends GenericResponse<B> { }

/**
 * BadRequest response.
 */
export class BadRequest<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.BAD_REQUEST, body, headers, request);
    }

}

/**
 * Unauthorized response.
 */
export class Unauthorized<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.UNAUTHORIZED, body, headers, request);
    }

}

/**
 * Forbidden response.
 */
export class Forbidden<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.FORBIDDEN, body, headers, request);
    }

}

/**
 * NotFound response.
 */
export class NotFound<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.NOT_FOUND, body, headers, request);
    }

}

/**
 * Conflict response.
 */
export class Conflict<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.CONFLICT, body, headers, request);
    }

}

/**
 * ServerError
 */
export class ServerError<B> extends GenericResponse<B> { }

/**
 * InternalServerError response.
 */
export class InternalServerError<B> extends ServerError<B> {

    status = status.INTERNAL_SERVER_ERROR;

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public request: RequestInfo) {
        super(status.INTERNAL_SERVER_ERROR, body, headers, request);

    }

}

/**
 * createResponse creates a new typed Response or a GenericResponse if
 * unsupported.
 */
export const createResponse = <B>(
    code: status.Code,
    body: B,
    headers: IncommingHeaders,
    request: RequestInfo): Response<B> => {

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

}
