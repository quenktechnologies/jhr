import { Future } from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../request/context';
import { Transport, TransportResponse } from './';
/**
 * RequestBody
 */
export declare type RequestBody = BodyInit;
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
export declare class XHRTransport<ResParsed> implements Transport<RequestBody, RequestBody, ResParsed> {
    responseType: XMLHttpRequestResponseType;
    constructor(responseType?: XMLHttpRequestResponseType);
    send(ctx: Context<RequestBody, RequestBody, ResParsed>): Future<TransportResponse<ResParsed>>;
}
