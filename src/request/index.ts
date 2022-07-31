import { Path } from './path';
import { Method } from './method';
import { Parameters } from './parameters';
import { Options } from './options';

/**
 * URIContext is an interface used for expanding uri templates.
 */
export interface URIContext {

    [key: string]: string

}

/**
 * RequestInfo holds details about a Request, except for the request body
 * itself.
 */
export interface RequestInfo {

    /**
     * path being requested.
     */
    path: Path,

    /**
     * method of the request.
     */
    method: Method,

    /**
     * params of the request.
     *
     * Valid only for read requests.
     */
    params?: Parameters,

    /**
     * options for the Request
     */
    options: Partial<Options>

}

/**
 * Request represents an HTTP request.
 *
 * The URL part is separate from the Request information to 
 * allow re-use among different endpoints.
 */
export interface Request<B> extends RequestInfo {

    /**
     * body of the request.
     * 
     * Valid only for write requests.
     */
    body?: B,

}

const defaultOptions = { ttl: 0, tags: {}, context: {}, headers: {} };

/**
 * Head request.
 */
export class Head implements Request<undefined> {

    method = Method.Head;

    constructor(
        public path: Path,
        public params: Parameters = {},
        public options: Partial<Options> = defaultOptions) { }

}

/**
 * Get request.
 */
export class Get extends Head {

    method = Method.Get

}

/**
 * Post request.
 */
export class Post<B> implements Request<B> {

    method = Method.Post

    constructor(
        public path: Path,
        public body: B,
        public options: Partial<Options> = defaultOptions) { }

}

/**
 * Put request.
 */
export class Put<B> extends Post<B> {

    method = Method.Put;

}

/**
 * Patch request.
 */
export class Patch<B> extends Post<B> {

    method = Method.Patch;

}

/**
 * Delete request.
 */
export class Delete<B> extends Post<B> {

    method = Method.Delete;

}
