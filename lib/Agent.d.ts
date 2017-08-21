import * as Promise from 'bluebird';
import * as Status from './Status';
import * as Headers from './Headers';
import * as Methods from './Methods';
import * as Errors from './Errors';
export { Status, Headers, Methods, Errors };
export { ResponseFilter } from './ResponseFilter';
export declare const HEADERS: Headers.Headers;
export interface Adapter {
    beforeRequest<P>(req: Request<P>, xhr: XMLHttpRequest, agent: Agent<P>): void;
}
/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 * @param {string} cookieName - The name of the cookie to read the token from.
 * @param {string} headerName - The name of the header to set.
 */
export declare class CSRFAdapter implements Adapter {
    cookieName: string;
    headerName: string;
    constructor(cookieName?: string, headerName?: string);
    beforeRequest<P>(_req: Request<P>, xhr: XMLHttpRequest, _agent: Agent<P>): void;
}
/**
 * Transform
 */
export interface Transform<P> {
    accepts: string;
    contentType: string;
    responseType: XMLHttpRequestResponseType;
    parseRequestBody(body: P): any;
    parseResponseBody<O>(body: any): O;
}
/**
 * JSONTransform
 */
export declare class JSONTransform<P> {
    prefix: RegExp;
    responseType: XMLHttpRequestResponseType;
    accepts: string;
    contentType: string;
    constructor(prefix?: RegExp);
    parseRequestBody(body: P): string;
    parseResponseBody<O>(body: any): O;
}
/**
 * NoTransform lets the browser do everything.
 */
export declare class NoTransform {
    responseType: string;
    accepts: string;
    contentType: string;
    parseRequestBody<A>(body: A): A;
    parseResponseBody<A>(body: A): A;
}
export interface OutGoingHeaders {
    [key: string]: string;
}
/**
 * Request
 */
export declare class Request<P> {
    url: string;
    method: Methods.Method<P>;
    agent: Agent<P>;
    constructor(url: string, method: Methods.Method<P>, agent: Agent<P>);
    execute<O>(): Promise<Response<O>>;
}
/**
 * Response
 */
export declare class Response<B> {
    status: number;
    body: B;
    headers: Headers.Map;
    constructor(status: number, body: B, headers: Headers.Map);
    /**
     * create a new HTTPResponse
     */
    static create<B>(xhr: XMLHttpRequest, body: B): Response<B>;
}
/**
 * @param {Transform} [transform]
 */
export declare class Agent<P> {
    transform: Transform<P>;
    headers: Headers.Map;
    adapters: Adapter[];
    constructor(transform?: Transform<P>);
    /**
     * create a new Agent with the specified transform
     */
    static create<P>(transform?: Transform<P>): Agent<P>;
    /**
     * send a request
     */
    static send<P, O>(url: string, r: Methods.Method<P>): Promise<Response<O>>;
    /**
     * add an Adapter to this Agent.
     */
    add(a: Adapter): Agent<P>;
    head(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<never>>;
    get<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<O>>;
    post<O>(url: string, params: P, headers?: OutGoingHeaders): Promise<Response<O>>;
    put<O>(url: string, params: P, headers: OutGoingHeaders): Promise<Response<O>>;
    delete<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<O>>;
    send<O>(url: string, req: Methods.Method<P>): Promise<Response<O>>;
    /**
     * newRequest creates a new Request from an object descriptor.
     *
     */
    newRequest(url: string, req: Methods.Method<P>): Request<P>;
}
