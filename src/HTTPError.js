import JHRError from './JHRError';

export default class HTTPError extends JHRError {

    constructor(status, text, body, rawResponse) {

        super(text);
        this.status = status;
        this.body = body;
        this.rawResponse = rawResponse;

    }

}

/* @todo expand list of supported errors */
export class ClientError extends HTTPError {}
export class BadRequest extends ClientError {}
export class Unauthorized extends ClientError {}
export class Forbidden extends ClientError {}
export class NotFound extends ClientError {}
export class Conflict extends ClientError {}
export class ServerError extends HTTPError {}
export class InternalServerError extends ServerError {}

const MAP = {

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
 * @param {number} status
 * @param {string} text
 * @param {object} [body]
 * @param {string} [rawResponse]
 */
export function create(status, text, body, rawResponse) {

    if (MAP.hasOwnProperty(status))
        return new MAP[status](status, text, body, rawResponse);

    if (status >= 500)
        return new ServerError(status, text, body, rawResponse);

    return new ClientError(status, text, body, rawResponse);

}
