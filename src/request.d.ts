import * as json from '@quenk/json';
import { OutgoingHeaders } from './header';
/**
 * defaultOptions used in requests.
 */
export declare const defaultOptions: Options;
/**
 * QueryParameters is any object whose keys can be used to generate
 * parameters for a URL's query string.
 */
export declare type QueryParameters = json.Object;
/**
 * Tags for keeping track of request responses.
 */
export interface Tags {
    [key: string]: string;
}
/**
 * OutgoingHeaders included in requests.
 */
export interface OutgoingHeaders {
    [key: string]: string;
}
/**
 * Context is an interface used for expanding uri templates.
 */
export interface Context {
    [key: string]: string;
}
/**
 * Options for a request method.
 */
export interface Options {
    tags?: Tags;
    ttl?: number;
    context?: Context;
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
    method: string;
    /**
     * body of the request.
     *
     * What this is is determined by the transform applied to it.
     * For GET and HEAD requests this can only
     * be a QueryParameters implementor if specified.
     */
    body: B;
    /**
     * params used in HEAD and GET requests.
     */
    params?: QueryParameters;
    /**
     * headers to include in the request.
     */
    headers: OutgoingHeaders;
    /**
     * options for the request.
     */
    options: Options;
}
/**
 * Head request.
 */
export declare class Head<P extends QueryParameters> implements Request<undefined> {
    params: P;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    body: undefined;
    constructor(params: P, headers?: OutgoingHeaders, options?: Options);
}
/**
 * Get request.
 */
export declare class Get<P extends QueryParameters> implements Request<undefined> {
    params: P;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    body: undefined;
    constructor(params: P, headers?: OutgoingHeaders, options?: Options);
}
/**
 * Post request.
 */
export declare class Post<B> implements Request<B> {
    body: B;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    constructor(body: B, headers?: OutgoingHeaders, options?: Options);
}
/**
 * Put request.
 */
export declare class Put<B> implements Request<B> {
    body: B;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    constructor(body: B, headers?: OutgoingHeaders, options?: Options);
}
/**
 * Patch request.
 */
export declare class Patch<B> implements Request<B> {
    body: B;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    constructor(body: B, headers?: OutgoingHeaders, options?: Options);
}
/**
 * Delete request.
 */
export declare class Delete<B> implements Request<B> {
    body: B;
    headers: OutgoingHeaders;
    options: Options;
    method: string;
    constructor(body: B, headers?: OutgoingHeaders, options?: Options);
}
