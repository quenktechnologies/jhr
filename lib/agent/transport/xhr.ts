import {
    Future,
    Run,
    fromExcept
} from '@quenk/noni/lib/control/monad/future';
import { fromString } from '../../header';
import { createResponse } from '../../response';
import { Context } from '../../request/context';
import { Method } from '../../request/method';
import { ACCEPTS } from '../../headers';
import { Parser } from '../parser';
import { Transport, TransportResponse } from './';
/**
 * RequestBody
 */
export type RequestBody = BodyInit;

/**
 * ResponseBody
 */
export type ResponseBody
    = string
    | Document
    | ArrayBuffer
    | Blob
    ;

/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
export class XHRTransport<B>    implements Transport<RequestBody, B> {

    constructor(
        public responseType: XMLHttpRequestResponseType = '',
        public parser: Parser<ResponseBody, B>) { }

    send(ctx: Context<RequestBody>): Future<TransportResponse<B>> {

        let { parser } = this;
        let { host, path, method, body, headers, options, cookies } = ctx;
        let xhr = new XMLHttpRequest();
        let url = `${host}${path[0] === '/' ? '' : '/'}${path}`;

        return new Run(s => {

            xhr.open(method, url, true);

            xhr.onload = () =>
                cookies
                    .update(document.cookie)
                    .chain(() => fromExcept(parser.apply(xhr.response)))
                    .fork(
                        e => { s.onError(e); },
                        res => {

                            let r = createResponse(xhr.status, res,
                                fromString(xhr.getAllResponseHeaders()), options);

                            s.onSuccess(r);

                        })

            xhr.timeout = options.ttl;
            xhr.responseType = this.responseType;
            xhr.onerror = () => s.onError(new Error('TransportError'));
            xhr.onabort = () => s.onError(new Error('AbortError'));

            Object
                .keys(headers)
                .forEach(k => { xhr.setRequestHeader(k, headers[k]); });

            if (method === Method.Get)
                xhr.setRequestHeader(ACCEPTS, this.parser.accepts);

            xhr.send(body);

            return () => xhr.abort();

        });

    }

}
