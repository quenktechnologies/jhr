import {
    Future,
    Run
} from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';
import { fromString } from '../../header';
import { createResponse } from '../../response';
import { Context } from '../../request/context';
import { Method } from '../../request/method';
import { Response } from '../../response';
import { ACCEPTS, CONTENT_TYPE } from '../../headers';
import { Transform } from '../transform';
import { Parser } from '../parser';
import { Transport } from './';

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
export class XHRTransport<Raw, Res> implements Transport<Raw, Res> {

    constructor(
        public responseType: XMLHttpRequestResponseType = '',
        public transform: Transform<Raw, RequestBody>,
        public parser: Parser<ResponseBody, Res>) { }

    send(ctx: Context<Raw>): Future<Response<Res>> {

        let { parser, transform } = this;
        let { host, port, path, method, body, options, cookies } = ctx;
        let xhr = new XMLHttpRequest();
        let portNumer = (port && (port !== 80) && (port !== 443)) ? `:${port}` : '';
        let url = `${host}${portNumer}${path[0] === '/' ? '' : '/'}${path}`;

        return new Run(() => new Promise((onSuccess, onError) => {

            let transBody = undefined;

            if (body != null) {

                let exceptBody = transform.apply(body);

                if (exceptBody.isLeft()) {

                    onError(new Error(exceptBody.takeLeft().message));
                    return () => { };

                } else {

                    transBody = exceptBody.takeRight();

                }

            }

            xhr.open(method, url, true);

            xhr.onload = () => {

                cookies.setCookies(document.cookie.split(';'));

                // 204 should have no body.
                if (xhr.status === 204) {
                    onSuccess(createResponse(xhr.status, <Type>undefined,
                        fromString(xhr.getAllResponseHeaders()), ctx));
                } else {

                    let exceptRes = parser.apply(xhr.response);

                    if (exceptRes.isLeft()) {

                        onError(new Error(exceptRes.takeLeft().message));

                    } else {

                        let r = createResponse(xhr.status, exceptRes.takeRight(),
                            fromString(xhr.getAllResponseHeaders()), ctx);

                        onSuccess(r);

                    }

                }

            }

            xhr.timeout = options.ttl;
            xhr.responseType = this.responseType;
            xhr.onerror = () => onError(new Error('TransportError'));
            xhr.onabort = () => onError(new Error('AbortError'));

            Object
                .keys(options.headers)
                .forEach(k => { xhr.setRequestHeader(k, options.headers[k]); });

            if ((method === Method.Get) || (method === Method.Head))
                xhr.setRequestHeader(ACCEPTS, parser.accepts);
            else if (transform.type !== 'multipart/form-data')
                xhr.setRequestHeader(CONTENT_TYPE, transform.type);
            //^ multipart forms set a custom content type

            xhr.send(<Type>transBody);

            return () => xhr.abort();

        }));

    }

}
