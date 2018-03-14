import * as methods from './method';
import * as json from '@quenk/json';
import { OutgoingHeaders } from './header';

/**
 * defaultOptions used in requests.
 */
export const defaultOptions: Options = {

    tags: {},
    ttl: 0,
    context: {}

}

/**
 * QueryParameters is any object whose keys can be used to generate 
 * parameters for a URL's query string.
 */
export type QueryParameters = json.Object;

/**
 * Tags for keeping track of request responses.
 */
export interface Tags {

    [key: string]: string

}

/**
 * OutgoingHeaders included in requests.
 */
export interface OutgoingHeaders {

    [key: string]: string

}

/**
 * Context is an interface used for expanding uri templates.
 */
export interface Context {

    [key: string]: string

}

/**
 * Options for a request method.
 */
export interface Options {

    tags?: Tags,
    ttl?: number,
    context?: Context

}

/**
 * Request represents an HTTP request.
 *
 * The URL part is separate from the Request information to 
 * allow re-use among different endpoints.
 */
export interface Request<B> {

    /**
     * method of the request.
     */
    method: string,

    /**
     * body of the request.
     *
     * What this is is determined by the transform applied to it.
     * For GET and HEAD requests this can only 
     * be a QueryParameters implementor if specified.
     */
    body: B,

    /**
     * params used in HEAD and GET requests.
     */
    params?: QueryParameters,

    /**
     * headers to include in the request.
     */
    headers: OutgoingHeaders,

    /**
     * options for the request.
     */
    options: Options

}

/**
 * Head request.
 */
export class Head<P extends QueryParameters> implements Request<undefined> {

    method = methods.HEAD;

    body: undefined;

    constructor(
        public params: P,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}

/**
 * Get request.
 */
export class Get<P extends QueryParameters> implements Request<undefined> {

    method = methods.GET;

    body: undefined;

    constructor(
        public params: P,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}

/**
 * Post request.
 */
export class Post<B> implements Request<B> {

    method = methods.POST;

    constructor(
        public body: B,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}

/**
 * Put request.
 */
export class Put<B> implements Request<B> {

    method = methods.PUT;

    constructor(
        public body: B,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}

/**
 * Patch request.
 */
export class Patch<B> implements Request<B> {

    method = methods.PATCH;

    constructor(
        public body: B,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}

/**
 * Delete request.
 */
export class Delete<B> implements Request<B> {

    method = methods.DELETE;

    constructor(
        public body: B,
        public headers: OutgoingHeaders = {},
        public options: Options = defaultOptions) { }

}
