import { Future } from '@quenk/noni/lib/control/monad/future';
import { OutgoingHeaders } from '../header';
import { Request } from '../request';
import { Container } from '../cookie/container';
import { Host } from '../request/host';
import { Path } from '../request/path';
import { Parameters } from '../request/parameters';
import { Options } from '../request/options';
import { Response } from '../response';
import { Transform } from './transform';
import { Parser } from './parser';
import { Transport } from './transport';
import { Plugin } from './plugin';
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
export declare class Agent<ReqRaw, ReqTrans, ResRaw, ResParsed> {
    host: Host;
    headers: OutgoingHeaders;
    cookies: Container;
    options: Options;
    transform: Transform<ReqRaw, ReqTrans>;
    parser: Parser<ResRaw, ResParsed>;
    transport: Transport<ReqTrans, ResRaw, ResParsed>;
    plugins: Plugin<ReqTrans, ResRaw, ResParsed>[];
    constructor(host: Host, headers: OutgoingHeaders, cookies: Container, options: Options, transform: Transform<ReqRaw, ReqTrans>, parser: Parser<ResRaw, ResParsed>, transport: Transport<ReqTrans, ResRaw, ResParsed>, plugins: Plugin<ReqTrans, ResRaw, ResParsed>[]);
    /**
     * head request shorthand.
     */
    head(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
    /**
     * get request shorthand.
     */
    get(path: Path, params?: Parameters, headers?: OutgoingHeaders): Future<Response<ResParsed>>;
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
     * send a Request to the server.
     */
    send(req: Request<ReqRaw>): Future<Response<ResParsed>>;
}
