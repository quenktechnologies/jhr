import * as Promise from 'bluebird';
import * as util from '../util';
import { ACCEPTS, CONTENT_TYPE } from '../headers';
import { merge } from 'afpl/lib/util';
import { polate } from '@quenk/polate';
import { OutgoingHeaders } from '../header';
import { GET, HEAD } from '../method';
import {
    Request,
    QueryParameters,
    Head,
    Get,
    Post,
    Put,
    Patch,
    Delete
} from '../request';
import { Response } from '../response';
import { Jar } from '../cookie';
import { Transport, Transform, Adapter, Envelope } from '.';

const readMethods = [GET, HEAD];

const isRead = (m: string) => (readMethods.indexOf(m.toUpperCase()) > -1);

const adapters = <O, I>(f: Adapter<O, I>[], env: Envelope<O, I>) =>
    f.reduce((p, c) => p.then(c), Promise.resolve(env));

/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 * @param <O> - The type the request body is transformed to before sending.
 * @param <I> - The type of the incomming response body before transformation.
 */
export class Agent<O, I> {

    constructor(
        public headers: OutgoingHeaders,
        public cookies: Jar,
        public transform: Transform<O, I>,
        public adapters: Adapter<O, I>[],
        public transport: Transport<O, I>) { }

    head<P extends QueryParameters, R>(
        url: string,
        params?: P,
        headers?: OutgoingHeaders): Promise<Response<R>> {

        return this.send<undefined, R>(url, new Head(params, headers));

    }

    get<B extends QueryParameters, R>(
        url: string,
        body?: B,
        headers?: OutgoingHeaders): Promise<Response<R>> {

        return this.send<undefined, R>(url, new Get(body, headers));

    }

    post<B, R>(
        url: string,
        body: B,
        headers?: OutgoingHeaders): Promise<Response<R>> {

        return this.send<B, R>(url, new Post(body, headers));

    }

    put<B, R>(
        url: string,
        body: B,
        headers: OutgoingHeaders): Promise<Response<R>> {

        return this.send<B, R>(url, new Put(body, headers));

    }

    patch<B, R>(
        url: string,
        body: B,
        headers: OutgoingHeaders): Promise<Response<R>> {

        return this.send<B, R>(url, new Patch(body, headers));

    }

    delete<B, R>(
        url: string,
        body?: B,
        headers?: OutgoingHeaders): Promise<Response<R>> {

        return this.send<B, R>(url, new Delete(body, headers));

    }

    /**
     * send a Request to a specified url.
     */
    send<B, R>(url: string, { method, body, headers, params, options }: Request<B>): Promise<Response<R>> {

        return this
            .transform
            .transformRequestBody<B>(body)
            .then(body => adapters(this.adapters, {

                url: util.urlFromString(polate(url, options.context || {}), params),
                method,
                body,
                headers: merge<OutgoingHeaders, OutgoingHeaders>(
                    this.headers,
                    headers,
                    isRead(method) ?
                        { [ACCEPTS]: this.transform.accepts } :
                        { [CONTENT_TYPE]: this.transform.contentType }),
                options,
                agent: this

            }))
            .then(env => this.transport.send<R>(env));

    }

}
