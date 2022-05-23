import * as util from '../util';
import { rmerge3 } from '@quenk/noni/lib/data/record';
import {
    Future,
    doFuture,
    reduce
} from '@quenk/noni/lib/control/monad/future';
import { interpolate } from '@quenk/noni/lib/data/string';

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
import { Options as RequestOptions, Tags } from '../request/options';
import { Context } from '../request/context';
import { OutgoingHeaders } from '../header';
import { Response } from '../response';
import { Transport } from './transport';
import { Plugin } from './plugin';

/**
 * defaultOptions
 */
export const defaultOptions = { ttl: 0, tags: {}, context: {} };

/**
 * Options for configuring the agent.
 */
export interface Options extends RequestOptions {

    /**
     * port requests will be made one.
     */
    port: number

}

/**
 * HTTPAgent is the API Agents provide.
 */
export interface HTTPAgent<ReqRaw, ResParsed> {

    /**
     * head request shorthand.
     */
    head(
        path: Path,
        params: Parameters,
        options?: Partial<Options>): Future<Response<ResParsed>>


    /**
     * get request shorthand.
     */
    get(
        path: Path,
        params: Parameters,
        options?: Partial<Options>): Future<Response<ResParsed>>

    /**
     * post request shorthand.
     */
    post(
        path: Path,
        body?: ReqRaw,
        options?: Partial<Options>): Future<Response<ResParsed>>

    /**
     * put request shorthand.
     */
    put(
        path: Path,
        body?: ReqRaw,
        options?: Partial<Options>): Future<Response<ResParsed>>

    /**
     * patch request shorthand.
     */
    patch(
        path: Path,
        body?: ReqRaw,
        options?: Partial<Options>): Future<Response<ResParsed>>

    /**
     * delete request shorthand.
     */
    delete(
        path: Path,
        body?: ReqRaw,
        options?: Partial<Options>): Future<Response<ResParsed>>

    /**
     * send a network request.
     */
    send(req: Request<ReqRaw>): Future<Response<ResParsed>>

}

/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
export class Agent<ReqRaw, ResParsed> implements HTTPAgent<ReqRaw, ResParsed> {

    constructor(
        public host: Host,
        public cookies: Container,
        public options: Partial<Options>,
        public transport: Transport<ReqRaw, ResParsed>,
        public plugins: Plugin<ReqRaw, ResParsed>[]) { }

    /**
     * setTransport allows the transport to be changed (possibly to process
     * a different type of response).
     *
     * A new Agent instance is created with NO plugins installed.
     */
    setTransport<Req, Res>(
        transport: Transport<Req, Res>,
        plugins: Plugin<Req, Res>[] = []): Agent<Req, Res> {

        let { host, cookies, options } = this;

        return new Agent(host, cookies, options, transport, plugins);

    }

    head(
        path: Path,
        params: Parameters = {},
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Head(path, params, options));

    }

    get(
        path: Path,
        params: Parameters = {},
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Get(path, params, options));

    }

    post(
        path: Path,
        body?: ReqRaw,
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Post(path, body, options));

    }

    put(
        path: Path,
        body?: ReqRaw,
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Put(path, body, options));

    }

    patch(
        path: Path,
        body?: ReqRaw,
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Patch(path, body, options));

    }

    delete(
        path: Path,
        body?: ReqRaw,
        options: Partial<Options> = {}): Future<Response<ResParsed>> {

        return this.send(new Delete(path, body, options));

    }

    send(req: Request<ReqRaw>): Future<Response<ResParsed>> {

        let that = this;

        return doFuture(function*() {

            let { host, cookies, options, transport, plugins } = that;

            options = <Options>rmerge3(defaultOptions, options, req.options);

            let port = <number>options.port;

            let { method, params, body } = req;

            let { tags, context = {}, ttl, headers=  { } } = options;

            let path = util.urlFromString(interpolate(req.path, context), params);

            let ctx: Context<ReqRaw> = {
                host,
                port,
                method,
                path,
                body,
                cookies,
                options: {
                    headers: <OutgoingHeaders>headers,
                    ttl: <number>ttl,
                    tags: <Tags>tags,
                    context
                }
            };

            ctx = yield reduce(plugins, ctx, (ctx, plg) =>
                plg.beforeRequest(ctx));

            let res: Response<ResParsed> = yield transport.send(ctx);

            return reduce(plugins, res, (res, plg) => plg.afterResponse(res));

        });

    }

}
