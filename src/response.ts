import * as status from './status';
import { IncommingHeaders } from './header';
import { Options } from './request';

/**
 * Response respresents the response from an HTTP requrest.
 *
 * @param <B> The body part of the response.
 */
export interface Response<B> {

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
 * GeneralResponse response refers to response codes we don't have
 * an explicit type for.
 */
export class GeneralResponse<B> implements Response<B> {

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
export class Success<B> extends GeneralResponse<B> { }

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

    constructor(
        public body: undefined,
        public headers: IncommingHeaders,
        public options: Options) { super(status.NO_CONTENT, body, headers, options); }

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
export class ClientError<B> extends GeneralResponse<B> { }

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
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export class ServerError<B> extends GeneralResponse<B> { }

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

const statuses: { [key: string]: typeof Ok } = {

    [status.OK]: Ok,
    [status.ACCEPTED]: Accepted,
    [status.NO_CONTENT]: NoContent,
    [status.CREATED]: Created,
    [status.BAD_REQUEST]: BadRequest,
    [status.UNAUTHORIZED]: Unauthorized,
    [status.FORBIDDEN]: Forbidden,
    [status.NOT_FOUND]: NotFound,
    [status.CONFLICT]: Conflict,
    [status.INTERNAL_SERVER_ERROR]: InternalServerError

}

/**
 * createResponse creates a new typed Response or a GeneralResponse if unsupported.
 * @param <B> - The type of the body.
 */
export const createResponse = <B>(
    status: number,
    body: B,
    headers: IncommingHeaders,
    options: Options = {}): Response<B> => statuses.hasOwnProperty(status) ?
        new statuses[status](body, headers, options) :
        ((status >= 200) && (status <= 299)) ?
            new Success(status, body, headers, options) :
            ((status >= 400) && (status <= 499)) ?
                new ClientError(status, body, headers, options) :
                (status >= 500) ?
                    new ServerError(status, body, headers, options) :
                    new GeneralResponse(status, body, headers, options);

