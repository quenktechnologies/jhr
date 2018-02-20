import * as Headers from './Headers';
import { Options } from './Methods';
/**
 * Response
 */
export declare class Response<B> {
    body: B;
    headers: Headers.Map;
    options: Options;
    status: number;
    constructor(body: B, headers: Headers.Map, options: Options);
}
export declare class UnTyped<B> extends Response<B> {
    status: number;
    body: B;
    headers: Headers.Map;
    options: Options;
    constructor(status: number, body: B, headers: Headers.Map, options: Options);
}
export declare class Ok<B> extends Response<B> {
    status: number;
}
export declare class Accepted<B> extends Response<B> {
    status: number;
}
export declare class NoContent extends Response<undefined> {
    status: number;
}
export declare class Created<B> extends Response<B> {
    status: number;
}
export declare class BadRequest<B> extends Response<B> {
    status: number;
}
export declare class Unauthorized<B> extends Response<B> {
    status: number;
}
export declare class Forbidden<B> extends Response<B> {
    status: number;
}
export declare class NotFound<B> extends Response<B> {
    status: number;
}
export declare class Conflict<B> extends Response<B> {
    status: number;
}
export declare class InternalServerError<B> extends Response<B> {
    status: number;
}
/**
 * create a new HTTPResponse
 */
export declare const create: <B>(xhr: XMLHttpRequest, body: B, options: Options) => Response<B>;
