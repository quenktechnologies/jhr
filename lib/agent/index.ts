import * as util from '../util';
import { merge, merge3 } from '@quenk/noni/lib/data/record';
import { Future, fromExcept, pure } from '@quenk/noni/lib/control/monad/future';
import { polate } from '@quenk/polate';
import { ACCEPTS, CONTENT_TYPE } from '../headers';
import { OutgoingHeaders } from '../header';
import { Method } from '../request/method';
import {
    Request,
    Head,
    Get,
    Post,
    Put,
    Patch,
    Delete
} from '../request';
import { Container } from '../cookie/container';
import { Host } from '../request/host';
import { Path } from '../request/path';
import { Parameters } from '../request/parameters';
import { Options } from '../request/options';
import { Context } from '../request/context';
import { Response } from '../response';
import { Transform } from './transform';
import { Parser } from './parser';
import { Transport, TransportResponse } from './transport';
import { Plugin } from './plugin';

const readMethods = <string[]>[Method.Get, Method.Head];

const isRead = (m: string) => (readMethods.indexOf(m.toUpperCase()) > -1);

/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
export class Agent<ReqRaw, ReqTrans, ResRaw, ResParsed> {

    constructor(
        public host: Host,
        public headers: OutgoingHeaders,
        public cookies: Container,
        public options: Options,
        public transform: Transform<ReqRaw, ReqTrans>,
        public parser: Parser<ResRaw, ResParsed>,
        public transport: Transport<ReqTrans, ResRaw, ResParsed>,
        public plugins: Plugin<ReqTrans, ResRaw, ResParsed>[]) { }

    /**
     * head request shorthand.
     */
    head(
        path: Path,
        params: Parameters = {},
        headers: OutgoingHeaders = {}): Future<Response<ResParsed>> {

        return this.send(new Head(path, params, headers));

    }

    /**
     * get request shorthand.
     */
    get(
        path: Path,
        params: Parameters = {},
        headers: OutgoingHeaders = {}): Future<Response<ResParsed>> {

        return this.send(new Get(path, params, headers));

    }

    /**
     * post request shorthand.
     */
    post(
        path: Path,
        body?: ReqRaw,
        headers: OutgoingHeaders = {}): Future<Response<ResParsed>> {

        return this.send(new Post(path, body, headers));

    }

    /**
     * put request shorthand.
     */
    put(
        path: Path,
        body?: ReqRaw,
        headers: OutgoingHeaders = {}): Future<Response<ResParsed>> {

        return this.send(new Put(path, body, headers));

    }

    /**
     * patch request shorthand.
     */
    patch(
        path: Path,
        body?: ReqRaw,
        headers: OutgoingHeaders = {}): Future<Response<ResParsed>> {

        return this.send(new Patch(path, body, headers));

    }

    /**
     * delete request shorthand.
     */
    delete(
        path: Path,
        body?: ReqRaw,
        headers?: OutgoingHeaders): Future<Response<ResParsed>> {

        return this.send(new Delete(path, body, headers));

    }

    /**
     * send a Request to the server.
     */
    send(req: Request<ReqRaw>): Future<Response<ResParsed>> {

        let { host, cookies, headers, options, transform,
            transport, parser, plugins } = this;

        let { method, params } = req;
        let tags = options.tags.concat(req.options.tags);
        let context = merge(options.context, req.options.context);
        let ttl = req.options.ttl;
        let path = util.urlFromString(polate(req.path, context), params);

        let ft = (isRead(req.method) || (req.body == null)) ?
            pure(undefined) : fromExcept(transform.apply(req.body));

        headers = merge3(headers, req.headers,
            isRead(req.method) ?
                { [ACCEPTS]: this.parser.accepts } :
                { [CONTENT_TYPE]: this.transform.type });

        return (<any>ft)
            .chain((body: ReqTrans | undefined) => {

                let ctx = {
                    host,
                    method,
                    path,
                    body,
                    headers,
                    cookies,
                    options: { ttl, tags, context },
                    parser
                };

                return plugins.reduce((f, p) =>
                    f.chain(c => p.beforeRequest(c)), pure(ctx));

            })
            .chain((ctx: Context<ReqTrans, ResRaw, ResParsed>) =>
                transport.send(ctx))
            .chain((r: TransportResponse<ResParsed>) =>
                plugins.reduce((f, p) =>
                    f.chain(res => p.afterResponse(res)), pure(r)))

    }

}
