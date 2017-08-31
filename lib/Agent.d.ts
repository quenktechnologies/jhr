import * as Promise from 'bluebird';
import * as Status from './Status';
import * as Headers from './Headers';
import * as Methods from './Methods';
import * as Errors from './Errors';
import * as Response from './Response';
export { Status, Headers, Methods, Errors };
export { ResponseFilter } from './ResponseFilter';
export { Response };
export interface Adapter {
    beforeRequest<P>(req: Request<P>, xhr: XMLHttpRequest, agent: Agent<P>): void;
}
/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
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
    parseResponseBody<O>(body?: any): O;
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
    execute<O>(): Promise<Response.Response<O>>;
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
    static send<P, O>(url: string, r: Methods.Method<P>): Promise<Response.Response<O>>;
    /**
     * add an Adapter to this Agent.
     */
    add(a: Adapter): Agent<P>;
    head(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response.Response<never>>;
    get<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response.Response<O>>;
    post<O>(url: string, params: P, headers?: OutGoingHeaders): Promise<Response.Response<O>>;
    put<O>(url: string, params: P, headers: OutGoingHeaders): Promise<Response.Response<O>>;
    delete<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response.Response<O>>;
    send<O>(url: string, req: Methods.Method<P>): Promise<Response.Response<O>>;
    /**
     * newRequest creates a new Request from an object descriptor.
     *
     */
    newRequest(url: string, req: Methods.Method<P>): Request<P>;
}
