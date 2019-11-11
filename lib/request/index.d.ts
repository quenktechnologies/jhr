import { OutgoingHeaders } from '../header';
import { Path } from './path';
import { Method } from './method';
import { Parameters } from './parameters';
import { Options } from './options';
/**
 * URIContext is an interface used for expanding uri templates.
 */
export interface URIContext {
    [key: string]: string;
}
/**
 * Request represents an HTTP request.
 *
 * The URL part is separate from the Request information to
 * allow re-use among different endpoints.
 */
export interface Request<B> {
    /**
     * path being requested.
     */
    path: Path;
    /**
     * method of the request.
     */
    method: Method;
    /**
     * body of the request.
     *
     * Valid only for write requests.
     */
    body?: B;
    /**
     * params of the request.
     *
     * Valid only for read requests.
     */
    params?: Parameters;
    /**
     * headers to include in the request.
     */
    headers: OutgoingHeaders;
    /**
     * options for the Request
     */
    options: Partial<Options>;
}
/**
 * Head request.
 */
export declare class Head implements Request<undefined> {
    path: Path;
    params: Parameters;
    headers: OutgoingHeaders;
    options: Partial<Options>;
    method: Method;
    constructor(path: Path, params: Parameters, headers?: OutgoingHeaders, options?: Partial<Options>);
}
/**
 * Get request.
 */
export declare class Get extends Head {
    method: Method;
}
/**
 * Post request.
 */
export declare class Post<B> implements Request<B> {
    path: Path;
    body: B;
    headers: OutgoingHeaders;
    options: Partial<Options>;
    method: Method;
    constructor(path: Path, body: B, headers?: OutgoingHeaders, options?: Partial<Options>);
}
/**
 * Put request.
 */
export declare class Put<B> extends Post<B> {
    method: Method;
}
/**
 * Patch request.
 */
export declare class Patch<B> extends Post<B> {
    method: Method;
}
/**
 * Delete request.
 */
export declare class Delete<B> extends Post<B> {
    method: Method;
}
