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
    body: R;
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
export declare class GeneralResponse<R> implements Response<R> {
    status: number;
    body: R;
    headers: IncommingHeaders;
    options: Options;
    constructor(status: number, body: R, headers: IncommingHeaders, options: Options);
}
/**
 * Ok response.
 */
export declare class Ok<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * Accepted response.
 */
export declare class Accepted<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * NoContent response.
 */
export declare class NoContent implements Response<undefined> {
    body: undefined;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: undefined, headers: IncommingHeaders, options: Options);
}
/**
 * Created response.
 */
export declare class Created<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * BadRequest response.
 */
export declare class BadRequest<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * Unauthorized response.
 */
export declare class Unauthorized<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * Forbidden response.
 */
export declare class Forbidden<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * NotFound response.
 */
export declare class NotFound<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * Conflict response.
 */
export declare class Conflict<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * InternalServerError response.
 */
export declare class InternalServerError<R> implements Response<R> {
    body: R;
    headers: IncommingHeaders;
    options: Options;
    status: number;
    constructor(body: R, headers: IncommingHeaders, options: Options);
}
/**
 * createResponse creates a new typed Response or a GeneralResponse if unsupported.
 * @param <R> - The type of the body.
 */
export declare const createResponse: <R>(status: number, body: R, headers: IncommingHeaders, options?: Options) => Response<R>;
