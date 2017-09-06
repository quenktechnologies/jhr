import { OutGoingHeaders } from './Agent';
export declare const HEAD = "HEAD";
export declare const GET = "GET";
export declare const PUT = "PUT";
export declare const POST = "POST";
export declare const DELETE = "DELETE";
export declare const PATCH = "PATCH";
/**
 * Options for a request method.
 */
export interface Options {
    tags?: Tags;
    ttl?: number;
    headers?: OutGoingHeaders;
    context?: Context;
}
/**
 * Tags for keeping track of requests
 */
export interface Tags {
    [key: string]: string;
}
/**
 * Context is an interface used for expanding uri templates.
 */
export interface Context {
    [key: string]: string;
}
export declare const defaultOptions: {
    tags: {};
    ttl: number;
    context: {};
    headers: {};
};
export declare class Method<P> {
    params: P;
    options: Options;
    method: string;
    constructor(params?: P, options?: Options);
}
export declare class Get<P> extends Method<P> {
    method: string;
}
export declare class Head<P> extends Method<P> {
    method: string;
}
export declare class Post<P> extends Method<P> {
    method: string;
}
export declare class Put<P> extends Method<P> {
    method: string;
}
export declare class Patch<P> extends Method<P> {
    method: string;
}
export declare class Delete<P> extends Method<P> {
    method: string;
}
