import * as Headers from './Headers';
import * as Status from './Status';

/**
 * Response
 */
export class Response<B> {

    status: number;

    constructor(public body: B, public headers: Headers.Map) { }

}

export class UnTyped<B> extends Response<B> {

    constructor(public status: number, public body: B, public headers: Headers.Map) {

        super(body, headers);

    }

}

export class Ok<B> extends Response<B> { status = Status.OK; }

export class Accepted<B> extends Response<B> { status = Status.ACCEPTED; }

export class NoContent extends Response<undefined> { status = Status.NO_CONTENT; }

export class Created<B> extends Response<B> { status = Status.CREATED; }

export class BadRequest<B> extends Response<B> { status = Status.BAD_REQUEST; }

export class Unauthorized<B> extends Response<B> { status = Status.UNAUTHORIZED; }

export class Forbidden<B> extends Response<B> { status = Status.FORBIDDEN; }

export class NotFound<B> extends Response<B> { status = Status.NOT_FOUND; }

export class Conflict<B> extends Response<B> { status = Status.CONFLICT; }

export class InternalServerError<B> extends Response<B> {

    status = Status.INTERNAL_SERVER_ERROR;

}

const statuses = {

    [Status.OK]: Ok,
    [Status.ACCEPTED]: Accepted,
    [Status.NO_CONTENT]: NoContent,
    [Status.CREATED]: Created,
    [Status.BAD_REQUEST]: BadRequest,
    [Status.UNAUTHORIZED]: Unauthorized,
    [Status.FORBIDDEN]: Forbidden,
    [Status.NOT_FOUND]: NotFound,
    [Status.CONFLICT]: Conflict,
    [Status.INTERNAL_SERVER_ERROR]: InternalServerError

}

/**
 * create a new HTTPResponse
 */
export const create = <B>(xhr: XMLHttpRequest, body: B) => {

    let headers = Headers.parse(xhr.getAllResponseHeaders());

    if (statuses.hasOwnProperty(xhr.status)) {

        let R: new (...args: any[]) => Response<B> = statuses[xhr.status];
        return new R(body, headers);

    }

    return new UnTyped(xhr.status, body, headers);

}





