import * as Promise from 'bluebird';
import { fromString } from '../header';
import { Response, createResponse } from '../response';
import { Envelope, Transport } from '../agent';

/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
export class XHRTransport<O, I> implements Transport<O, I> {

    constructor(public responseType: XMLHttpRequestResponseType = '') { }

    send<R>({ url, method, body, options, headers, agent }: Envelope<O, I>): Promise<Response<R>> {

        let xhr = new XMLHttpRequest();
        let { ttl = 0 } = options;

        return new Promise((resolve: (r: Response<R>) => void, reject) => {

            xhr.open(method, url, true);

            xhr.onload = () =>
                agent
                    .cookies
                    .update(document.cookie)
                    .then(() =>
                        agent
                            .transform
                            .transformResponseBody<R>(xhr.response)
                            .then(body =>
                                resolve(createResponse<R>(
                                    xhr.status,
                                    body,
                                    fromString(xhr.getAllResponseHeaders()),
                                    options))));

            xhr.timeout = ttl;
            xhr.responseType = this.responseType;
            xhr.onerror = () => reject(new Error('TransportError'));
            xhr.onabort = () => reject(new Error('TransportError'));

            Object
                .keys(headers)
                .forEach(k => { xhr.setRequestHeader(k, headers[k]); });

            //agent.adapters.forEach(a => a.beforeRequest(this, xhr, agent));

            xhr.send(body);

        });

    }

}
