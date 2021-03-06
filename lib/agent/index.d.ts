import { Future } from '@quenk/noni/lib/control/monad/future';
import { OutgoingHeaders } from '../header';
import { Request } from '../request';
import { Container } from '../cookie/container';
import { Host } from '../request/host';
import { Path } from '../request/path';
import { Parameters } from '../request/parameters';
import { Options as RequestOptions } from '../request/options';
import { Response } from '../response';
import { Transport } from './transport';
import { Plugin } from './plugin';
/**
 * defaultOptions
 */
export declare const defaultOptions: {
    ttl: number;
    tags: {};
    context: {};
};
/**
 * Options for configuring the agent.
 */
export interface Options extends RequestOptions {
    /**
     * port requests will be made one.
     */
    port: number;
}
/**
 * HTTPAgent is the API Agents provide.
 */
export interface HTTPAgent<ReqRaw, ResParsed> {
    /**
     * head request shorthand.
     */
    head(path: Path, params: Parameters, headers: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * get request shorthand.
     */
    get(path: Path, params: Parameters, headers: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * post request shorthand.
     */
    post(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * put request shorthand.
     */
    put(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * patch request shorthand.
     */
    patch(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * delete request shorthand.
     */
    delete(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * send a network request.
     */
    send(req: Request<ReqRaw>): Future<Response<ResParsed>>;
}
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
export declare class Agent<ReqRaw, ResParsed> implements HTTPAgent<ReqRaw, ResParsed> {
    host: Host;
    headers: OutgoingHeaders;
    cookies: Container;
    options: Partial<Options>;
    transport: Transport<ReqRaw, ResParsed>;
    plugins: Plugin<ReqRaw, ResParsed>[];
    constructor(host: Host, headers: OutgoingHeaders, cookies: Container, options: Partial<Options>, transport: Transport<ReqRaw, ResParsed>, plugins: Plugin<ReqRaw, ResParsed>[]);
    /**
     * setTransport allows the transport to be changed (possibly to process
     * a different type of response).
     *
     * A new Agent instance is created with NO plugins installed.
     */
    setTransport<Req, Res>(transport: Transport<Req, Res>, plugins?: Plugin<Req, Res>[]): Agent<Req, Res>;
    head(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    get(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    post(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    put(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    patch(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    delete(path: Path, body?: ReqRaw, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    send(req: Request<ReqRaw>): Future<Response<ResParsed>>;
}
