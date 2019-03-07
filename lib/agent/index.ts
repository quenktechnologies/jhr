import * as util from '../util';
import { merge } from '@quenk/noni/lib/data/record';
import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { interpolate } from '@quenk/noni/lib/data/string';
import { OutgoingHeaders } from '../header';
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
import { Transport } from './transport';
import { Plugin } from './plugin';

/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
export class Agent<ReqRaw, ResParsed> {

    constructor(
        public host: Host,
        public headers: OutgoingHeaders,
        public cookies: Container,
        public options: Options,
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
    plugins:Plugin<Req, Res>[]=[])    : Agent<Req, Res> {

        let {            host, headers, cookies, options         } = this;

        return new Agent(host, headers, cookies, options, transport, plugins);

    }

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

        let { host, cookies, headers, options, transport, plugins } = this;

        let { method, params, body } = req;
        let tags = options.tags.concat(req.options.tags);
        let context = merge(options.context, req.options.context);
        let ttl = req.options.ttl;
        let path = util.urlFromString(interpolate(req.path, context), params);

        let ctx = {
            host,
            method,
            path,
            body,
            headers,
            cookies,
            options: { ttl, tags, context }
        };

        let ft = plugins.reduce((f, p) =>
            f.chain(c => p.beforeRequest(c)), pure(ctx));

        return ft.chain((ctx: Context<ReqRaw>) => transport.send(ctx))
            .chain((r: Response<ResParsed>) =>
                plugins.reduce((f, p) =>
                    f.chain(res => p.afterResponse(res)), pure(r)))

    }

}
