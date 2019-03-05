import * as status from './status';
import { IncommingHeaders } from './header';
import { Options } from './request/options';

/**
 * Response respresents the response from an HTTP requrest.
 *
 * @param <B> The body part of the response.
 */
export interface Response<B> {

    /**
     * status code of a Response.
     */
    status: status.Code,

    /**
     * body of the Response.
     */
    body: B,

    /**
     * headers received with the response.
     */
    headers: IncommingHeaders,

    /**
     * options the Response's original Request were sent with.
     */
    options: Options

}

/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
export class GenericResponse<B> implements Response<B> {

    constructor(
        public status: number,
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) { }

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
        public options: Options) { super(status.OK, body, headers, options); }

}

/**
 * Accepted response.
 */
export class Accepted<B> extends Success<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) { super(status.ACCEPTED, body, headers, options); }

}

/**
 * NoContent response.
 */
export class NoContent extends Success<undefined> {

    body = undefined;

    constructor(
        public headers: IncommingHeaders,
        public options: Options) {

        super(status.NO_CONTENT, undefined, headers, options);

    }

}

/**
 * Created response.
 */
export class Created<B> extends Success<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) { super(status.CREATED, body, headers, options); }

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
        public options: Options) {
        super(status.BAD_REQUEST, body, headers, options);
    }

}

/**
 * Unauthorized response.
 */
export class Unauthorized<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) {
        super(status.UNAUTHORIZED, body, headers, options);
    }

}

/**
 * Forbidden response.
 */
export class Forbidden<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) {
        super(status.FORBIDDEN, body, headers, options);
    }

}

/**
 * NotFound response.
 */
export class NotFound<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) {
        super(status.NOT_FOUND, body, headers, options);
    }

}

/**
 * Conflict response.
 */
export class Conflict<B> extends ClientError<B> {

    constructor(
        public body: B,
        public headers: IncommingHeaders,
        public options: Options) {
        super(status.CONFLICT, body, headers, options);
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
        public options: Options) {
        super(status.INTERNAL_SERVER_ERROR, body, headers, options);

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
    options: Options): Response<B> | Response<undefined> => {

    switch (code) {
        case status.OK:
            return new Ok(body, headers, options);
        case status.ACCEPTED:
            return new Accepted(body, headers, options);
        case status.NO_CONTENT:
            return new NoContent(headers, options);
        case status.CREATED:
            return new Created(body, headers, options);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, options);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, options);
        case status.UNAUTHORIZED:
            return new Unauthorized(body, headers, options);
        case status.FORBIDDEN:
            return new Forbidden(body, headers, options);
        case status.NOT_FOUND:
            return new NotFound(body, headers, options);
        case status.CONFLICT:
            return new Conflict(body, headers, options);
        case status.INTERNAL_SERVER_ERROR:
            return new InternalServerError(body, headers, options);
        default:

            if ((code >= 400) && (code <= 499))
                return new ClientError(code, body, headers, options);
            else if (code >= 500)
                return new ServerError(code, body, headers, options);
            else
                return new GenericResponse(code, body, headers, options);

    }

}
