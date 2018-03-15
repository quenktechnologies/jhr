import * as Promise from 'bluebird';
import { OutgoingHeaders } from '../header';
import { Request, QueryParameters } from '../request';
import { Response } from '../response';
import { Jar } from '../cookie';
import { Transport, Transform, Adapter } from '.';
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 * @param <O> - The type the request body is transformed to before sending.
 * @param <I> - The type of the incomming response body before transformation.
 */
export declare class Agent<O, I> {
    headers: OutgoingHeaders;
    cookies: Jar;
    transform: Transform<O, I>;
    adapters: Adapter<O, I>[];
    transport: Transport<O, I>;
    constructor(headers: OutgoingHeaders, cookies: Jar, transform: Transform<O, I>, adapters: Adapter<O, I>[], transport: Transport<O, I>);
    head<P extends QueryParameters, R>(url: string, params?: P, headers?: OutgoingHeaders): Promise<Response<R>>;
    get<B extends QueryParameters, R>(url: string, body?: B, headers?: OutgoingHeaders): Promise<Response<R>>;
    post<B, R>(url: string, body: B, headers?: OutgoingHeaders): Promise<Response<R>>;
    put<B, R>(url: string, body: B, headers: OutgoingHeaders): Promise<Response<R>>;
    patch<B, R>(url: string, body: B, headers: OutgoingHeaders): Promise<Response<R>>;
    delete<B, R>(url: string, body?: B, headers?: OutgoingHeaders): Promise<Response<R>>;
    /**
     * send a Request to a specified url.
     */
    send<B, R>(url: string, {method, body, headers, params, options}: Request<B>): Promise<Response<R>>;
}
