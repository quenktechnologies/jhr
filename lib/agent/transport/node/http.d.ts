/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../../request/context';
import { Response } from '../../../response';
import { Transform } from '../../transform';
import { Parser } from '../../parser';
import { Transport } from '../';
/**
 * RequestBody
 */
export declare type RequestBody = string | Buffer;
/**
 * ResponseBody
 */
export declare type ResponseBody = string | Buffer;
/**
 * NodeAgent
 */
export declare type NodeAgent = http.Agent | https.Agent;
/**
 * NodeOptions
 */
export declare type NodeOptions = http.RequestOptions | https.RequestOptions;
/**
 * AbortedError
 */
export declare class AbortedError {
    message: string;
}
/**
 * NodeHTTPTransport uses the native http and https modules to
 * provide an http transport for server side use.
 *
 * This transport abstracts the streaming nature of the http and https
 * modules support streaming. Instead in queues up 'data' events
 * into an array that is passed to its parser.
 *
 * Parsers for this transport must be able to handle Buffer[].
 * There is an adapter parser for converting those to strings
 * in the parser submodule.
 */
export declare class NodeHTTPTransport<Raw, Res> implements Transport<Raw, Res> {
    transform: Transform<Raw, RequestBody>;
    parser: Parser<Buffer[], Res>;
    agent: NodeAgent;
    options: NodeOptions;
    constructor(transform: Transform<Raw, RequestBody>, parser: Parser<Buffer[], Res>, agent: NodeAgent, options?: NodeOptions);
    send(ctx: Context<Raw>): Future<Response<Res>>;
}
