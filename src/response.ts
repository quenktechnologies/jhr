import * as status from './status';
import { IncommingHeaders } from './header';
import { Options } from './request';

/**
 * Response respresents the response from an HTTP requrest.
 *
 * @param <R> The body part of the response.
 */
export interface Response<R> {

    /**
     * body of the Response.
     */
    body: R,

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
export class GeneralResponse<R> implements Response<R> {

    constructor(
        public status: number,
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Ok response.
 */
export class Ok<R> implements Response<R> {

    status = status.OK;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Accepted response.
 */
export class Accepted<R> implements Response<R> {

    status = status.ACCEPTED;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * NoContent response.
 */
export class NoContent implements Response<undefined> {

    status = status.NO_CONTENT;

    constructor(
        public body: undefined,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Created response.
 */
export class Created<R> implements Response<R> {

    status = status.CREATED;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * BadRequest response.
 */
export class BadRequest<R> implements Response<R> {

    status = status.BAD_REQUEST;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Unauthorized response.
 */
export class Unauthorized<R> implements Response<R> {

    status = status.UNAUTHORIZED;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Forbidden response.
 */
export class Forbidden<R> implements Response<R> {

    status = status.FORBIDDEN;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * NotFound response.
 */
export class NotFound<R> implements Response<R> {

    status = status.NOT_FOUND;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * Conflict response.
 */
export class Conflict<R> implements Response<R> {

    status = status.CONFLICT;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

}

/**
 * InternalServerError response.
 */
export class InternalServerError<R> implements Response<R> {

    status = status.INTERNAL_SERVER_ERROR;

    constructor(
        public body: R,
        public headers: IncommingHeaders,
        public options: Options) { }

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
 * @param <R> - The type of the body.
 */
export const createResponse = <R>(
    status: number,
    body: R,
    headers: IncommingHeaders,
    options: Options = {}): Response<R> => {

    if (statuses.hasOwnProperty(status)) {

        let R = statuses[status];
        return new R(body, headers, options);

    }

    return new GeneralResponse(status, body, headers, options);

}
