import { OutgoingHeaders } from '../header';
import { Path } from './path';
import { Method } from './method';
import { Parameters } from './parameters';
import { Options } from './options';

/**
 * OutgoingHeaders included in requests.
 */
export interface OutgoingHeaders {

    [key: string]: string

}

/**
 * URIContext is an interface used for expanding uri templates.
 */
export interface URIContext {

    [key: string]: string

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
    path: Path,

    /**
     * method of the request.
     */
    method: Method,

    /**
     * body of the request.
     * 
     * Valid only for write requests.
     */
    body?: B,

    /**
     * params of the request.
     *
     * Valid only for read requests.
     */
    params?: Parameters,

    /**
     * headers to include in the request.
     */
    headers: OutgoingHeaders,

    /**
     * options for the Request
     */
    options: Options

}

/**
 * Head request.
 */
export class Head implements Request<undefined> {

    method = Method.Head;

    constructor(
        public path: Path,
        public params: Parameters,
        public headers: OutgoingHeaders = {},
      public options: Options = { ttl: 0, tags: {}, context: {} }) { }

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
        public headers: OutgoingHeaders = {},
      public options: Options = { ttl: 0, tags: {}, context: {} }) { }

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
