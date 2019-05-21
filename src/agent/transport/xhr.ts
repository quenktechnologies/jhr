import {
    Future,
    Run,
    fromExcept
} from '@quenk/noni/lib/control/monad/future';
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
        let { host, path, method, body, headers, options, cookies } = ctx;
        let xhr = new XMLHttpRequest();
        let url = `${host}${path[0] === '/' ? '' : '/'}${path}`;

        return new Run(s => {

            let transBody = undefined;

            if (body != null) {

                let exceptBody = transform.apply(body);

                if (exceptBody.isLeft()) {

                    s.onError(new Error(exceptBody.takeLeft().message));
                    return () => { };

                } else {

                    transBody = exceptBody.takeRight();

                }

            }

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

            if ((method === Method.Get) || (method === Method.Head))
                xhr.setRequestHeader(ACCEPTS, parser.accepts);
            else if (transform.type !== 'multipart/form-data')
                xhr.setRequestHeader(CONTENT_TYPE, transform.type);
            //^ multipart forms set a custom content type

            xhr.send(transBody);

            return () => xhr.abort();

        });

    }

}
