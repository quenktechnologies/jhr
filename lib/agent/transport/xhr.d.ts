import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { Response } from '../../response';
import { Transform } from '../transform';
import { Parser } from '../parser';
import { Transport } from './';
/**
 * RequestBody
 */
export declare type RequestBody = BodyInit;
/**
 * ResponseBody
 */
export declare type ResponseBody = string | Document | ArrayBuffer | Blob;
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
export declare class XHRTransport<Raw, Res> implements Transport<Raw, Res> {
    responseType: XMLHttpRequestResponseType;
    transform: Transform<Raw, RequestBody>;
    parser: Parser<ResponseBody, Res>;
    constructor(responseType: XMLHttpRequestResponseType, transform: Transform<Raw, RequestBody>, parser: Parser<ResponseBody, Res>);
    send(ctx: Context<Raw>): Future<Response<Res>>;
}
