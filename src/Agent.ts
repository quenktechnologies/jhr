import * as Promise from 'bluebird';
import * as Status from './Status';
import * as Headers from './Headers';
import * as Methods from './Methods';
import * as Errors from './Errors';
import * as Utils from './Utils';
import { Cookies } from './Cookies';


export { Status, Headers, Methods, Errors };
export { ResponseFilter } from './ResponseFilter';

export const HEADERS = new Headers.Headers();

export interface Adapter {

    beforeRequest<P>(req: Request<P>, xhr: XMLHttpRequest, agent: Agent<P>): void;
}

/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 * @param {string} cookieName - The name of the cookie to read the token from.
 * @param {string} headerName - The name of the header to set.
 */
export class CSRFAdapter implements Adapter {

    constructor(public cookieName = 'xsrf-token', public headerName = 'x-xsrf-token') { }

    beforeRequest<P>(_req: Request<P>, xhr: XMLHttpRequest, _agent: Agent<P>) {

        xhr.setRequestHeader(this.headerName, Cookies.get(this.cookieName));

    }

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
export class JSONTransform<P> {

    responseType: XMLHttpRequestResponseType = '';

    accepts = 'application/json';

    contentType = 'application/json;charset=utf-8';

    constructor(public prefix = /^\)\]\}',?\n/) { }

    parseRequestBody(body: P): string {

        return (Utils.isObject(body) &&
            !Utils.isFile(body) &&
            !Utils.isBlob(body) &&
            !Utils.isFormData(body)) ?
            JSON.stringify(body) : (<string><any>body);

    }

    parseResponseBody<O>(body: any): O {

        if (typeof body === 'string') {

            body = body.replace(this.prefix, '').trim();

            if (body) {

                try {

                    body = JSON.parse(body);

                } catch (e) {
                    console.warn(`Could not parse server data as json : '${body}'`);
                    //originally null set to undefined for ES2015 default values
                    body = undefined;

                }

            }

        }

        return body;

    }

}

/**
 * NoTransform lets the browser do everything.
 */
export class NoTransform {

    responseType = '';
    accepts = '';
    contentType = '';

    parseRequestBody<A>(body: A): A {

        return body;

    }

    parseResponseBody<A>(body: A): A {

        return body;

    }

}

export interface OutGoingHeaders {

    [key: string]: string

}

/**
 * Request
 */
export class Request<P> {

    constructor(public url: string, public method: Methods.Method<P>, public agent: Agent<P>) { }

    execute<O>(): Promise<Response<O>> {

        let xhr = new XMLHttpRequest();
        let { method, params, headers, ttl } = this.method;
        let { url, agent } = this;

        let read: boolean = (method.toUpperCase() === Methods.GET) ||
            (method.toUpperCase() === Methods.HEAD);

        return new Promise((resolve: (r: Response<O>) => void, reject) => {

            xhr.open(method, Utils.urlFromString(url,
                read ? agent.transform.parseRequestBody(params) : null), true);

            xhr.onload = () => {

                if (xhr.status >= 400)
                    return reject(Errors.create(xhr.status,
                        xhr.responseText, agent.transform.parseResponseBody(xhr.response), xhr.response));

                if ((xhr.response != null) && xhr.response !== '')
                    resolve(Response.create<O>(xhr,
                        agent.transform.parseResponseBody<O>(xhr.response)));

            };

            if (ttl > 0)
                xhr.timeout = ttl;

            HEADERS.set(xhr, agent.headers, read ?
                { [Headers.ACCEPTS]: agent.transform.accepts } :
                { [Headers.CONTENT_TYPE]: agent.transform.contentType }, headers);

            xhr.responseType = agent.transform.responseType;

            agent.adapters.forEach(a => a.beforeRequest(this, xhr, agent));

            xhr.onerror = () => reject(new Errors.TransportError(''));
            xhr.onabort = () => reject(new Errors.TransportError(''));
            xhr.send(params);

        });

    }

}

/**
 * Response
 */
export class Response<B> {

    constructor(public status: number, public body: B, public headers: Headers.Map) { }

    /**
     * create a new HTTPResponse
     */
    static create<B>(xhr: XMLHttpRequest, body: B): Response<B> {

        return new Response(xhr.status, body,
            HEADERS.parse(xhr.getAllResponseHeaders()));

    }

}

/**
 * @param {Transform} [transform]
 */
export class Agent<P> {

    headers: Headers.Map = {};
    adapters: Adapter[] = [];

    constructor(public transform: Transform<P> = new JSONTransform<P>()) { }

    /**
     * create a new Agent with the specified transform
     */
    static create<P>(transform?: Transform<P>): Agent<P> {

        return new Agent(transform);

    }

    /**
     * send a request
     */
    static send<P, O>(url: string, r: Methods.Method<P>): Promise<Response<O>> {

        return Agent.create().send<O>(url, r);

    }

    /**
     * add an Adapter to this Agent.
     */
    add(a: Adapter): Agent<P> {

        this.adapters.push(a);
        return this;

    }

    head(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<never>> {

        return this.send<never>(url, new Methods.Head(params, headers));

    }

    get<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<O>> {

        return this.send<O>(url, new Methods.Get(params, headers));

    }

    post<O>(url: string, params: P, headers?: OutGoingHeaders): Promise<Response<O>> {

        return this.send<O>(url, new Methods.Post(params, headers));

    }

    put<O>(url: string, params: P, headers: OutGoingHeaders): Promise<Response<O>> {

        return this.send<O>(url, new Methods.Put(params, headers));

    }

    delete<O>(url: string, params?: P, headers?: OutGoingHeaders): Promise<Response<O>> {

        return this.send<O>(url, new Methods.Delete(params, headers));

    }

    send<O>(url: string, req: Methods.Method<P>): Promise<Response<O>> {

        return this.newRequest(url, req).execute<O>();
    }

    /**
     * newRequest creates a new Request from an object descriptor.
     * 
     */
    newRequest(url: string, req: Methods.Method<P>): Request<P> {

        return new Request(url, req, this);

    }

}
