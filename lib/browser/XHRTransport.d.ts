import * as Promise from 'bluebird';
import { Response } from '../response';
import { Envelope, Transport } from '../agent';
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
export declare class XHRTransport<O, I> implements Transport<O, I> {
    responseType: XMLHttpRequestResponseType;
    constructor(responseType?: XMLHttpRequestResponseType);
    send<R>({url, method, body, options, headers, agent}: Envelope<O, I>): Promise<Response<R>>;
}
