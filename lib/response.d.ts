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
 * GeneralResponse response refers to response codes we don't have
 * an explicit type for.
 */
export declare class GeneralResponse<B> implements Response<B> {
    status: number;
    body: B;
    headers: IncommingHeaders;
    options: Options;
    constructor(status: number, body: B, headers: IncommingHeaders, options: Options);
}
/**
 * Success
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export declare class Success<B> extends GeneralResponse<B> {
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
 */
export declare class NoContent extends Success<undefined> {
    body: undefined;
    headers: IncommingHeaders;
    options: Options;
    constructor(body: undefined, headers: IncommingHeaders, options: Options);
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
export declare class ClientError<B> extends GeneralResponse<B> {
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
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
export declare class ServerError<B> extends GeneralResponse<B> {
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
 * createResponse creates a new typed Response or a GeneralResponse if unsupported.
 * @param <B> - The type of the body.
 */
export declare const createResponse: <B>(status: number, body: B, headers: IncommingHeaders, options?: Options) => Response<B>;
