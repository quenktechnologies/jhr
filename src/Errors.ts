
export class JHRError extends Error {

    __proto__: object

    constructor(message: string = '') {

        super(message);

        (Object.setPrototypeOf) ?
            Object.setPrototypeOf(this, JHRError.prototype) :
            this.__proto__ = JHRError.prototype;

        this.message = message;
        this.stack = (new Error(message)).stack;

        if (Error.hasOwnProperty('captureStackTrace'))
            (<any>Error).captureStackTrace(this, this.constructor);


    }

}

JHRError.prototype = Object.create(Error.prototype);
JHRError.prototype.constructor = JHRError;

export class AbortError extends JHRError { }

export class TransportError extends JHRError { }

export class HTTPError extends JHRError {

    constructor(public status: number, public text: string, public body?: any, public rawResponse?: string) {

        super(text);

        (<any>this).__proto__ = HTTPError.prototype;

    }

}

export class ClientError extends HTTPError { }

export class BadRequest extends ClientError { }

export class Unauthorized extends ClientError { }

export class Forbidden extends ClientError { }

export class NotFound extends ClientError { }

export class Conflict extends ClientError { }

export class ServerError extends HTTPError { }

export class InternalServerError extends ServerError { }

export interface ErrorMap {

    [key: number]: any; //Using ClientError here is currently a nightmare.

}

const MAP: ErrorMap = {

    400: BadRequest,
    401: Unauthorized,
    403: Forbidden,
    404: NotFound,
    409: Conflict,
    500: InternalServerError
}

/**
 * create is a helper function for creating the correct error from a
 * response.
 */
export function create(status: number, text: string, body: any, rawResponse: string) {

    if (MAP.hasOwnProperty(status)) {
        let C = MAP[status];
        return new C(status, text, body, rawResponse);
    }
    if (status >= 500)
        return new ServerError(status, text, body, rawResponse);

    return new ClientError(status, text, body, rawResponse);

}

