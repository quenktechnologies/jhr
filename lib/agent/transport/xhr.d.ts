import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { Parser } from '../parser';
import { Transport, TransportResponse } from './';
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
export declare class XHRTransport<B> implements Transport<RequestBody, B> {
    responseType: XMLHttpRequestResponseType;
    parser: Parser<ResponseBody, B>;
    constructor(responseType: XMLHttpRequestResponseType, parser: Parser<ResponseBody, B>);
    send(ctx: Context<RequestBody>): Future<TransportResponse<B>>;
}
