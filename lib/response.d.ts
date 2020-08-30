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
     * code code of a Response.
     */
    code: status.Code;
    /**
     * body of the Response.
     */
    body: B;
    /**
     * headers received with the response.
     */
    headers: IncommingHeaders;
    /**
     * options the Response's original Request were sent with.
     */
    options: Options;
}
/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
export declare class GenericResponse<B> implements Response<B> {
    code: number;
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(code: number, body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Success
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export declare class Success<B> extends GenericResponse<B> {
}
/**
 * Ok response.
 */
export declare class Ok<B> extends Success<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Accepted response.
 */
export declare class Accepted<B> extends Success<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * NoContent response.
 *
 * NOTE: In practice, the body here should always be undefined.
 */
export declare class NoContent<B> extends Success<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Created response.
 */
export declare class Created<B> extends Success<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * ClientError
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export declare class ClientError<B> extends GenericResponse<B> {
}
/**
 * BadRequest response.
 */
export declare class BadRequest<B> extends ClientError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Unauthorized response.
 */
export declare class Unauthorized<B> extends ClientError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Forbidden response.
 */
export declare class Forbidden<B> extends ClientError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * NotFound response.
 */
export declare class NotFound<B> extends ClientError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Conflict response.
 */
export declare class Conflict<B> extends ClientError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * ServerError
 */
export declare class ServerError<B> extends GenericResponse<B> {
}
/**
 * InternalServerError response.
 */
export declare class InternalServerError<B> extends ServerError<B> {
    body: B;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: B, headers: IncommingHeaders, options: Options);
}
/**
 * createResponse creates a new typed Response or a GenericResponse if
 * unsupported.
 */
export declare const createResponse: <B>(code: status.Code, body: B, headers: IncommingHeaders, options: Options) => Response<B>;
