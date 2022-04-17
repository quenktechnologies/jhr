import * as http from 'http';
import * as https from 'https';
import { merge } from '@quenk/noni/lib/data/record';
import {
    Future,
    Run,
} from '@quenk/noni/lib/control/monad/future';
import { Context } from '../../../request/context';
import { Response, createResponse } from '../../../response';
import { Transform } from '../../transform';
import { ACCEPTS, CONTENT_TYPE } from '../../../headers';
import { toCookieHeader } from '../../../cookie';
import { Method } from '../../../request/method';
import { Parser } from '../../parser';
import { Transport } from '../';

/**
 * RequestBody
 */
export type RequestBody
    = string
    | Buffer
    ;

/**
 * ResponseBody
 */
export type ResponseBody
    = string
    | Buffer
    ;

/**
 * NodeAgent
 */
export type NodeAgent = http.Agent | https.Agent;

/**
 * NodeOptions
 */
export type NodeOptions = http.RequestOptions | https.RequestOptions;

/**
 * AbortedError
 */
export class AbortedError { message = 'aborted'; }

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
export class NodeHTTPTransport<Raw, Res> implements Transport<Raw, Res> {

    constructor(
        public transform: Transform<Raw, RequestBody>,
        public parser: Parser<Buffer[], Res>,
        public agent: NodeAgent,
        public options: NodeOptions = {}) { }

    send(ctx: Context<Raw>): Future<Response<Res>> {

        let { parser, transform, agent } = this;
        let { host, port, path, method, body, headers, cookies, options } = ctx;
        let head = merge({}, headers);
        let cookieHeader = toCookieHeader(cookies.getCookies());

        if ((method === Method.Get) || (method === Method.Head))
            head[ACCEPTS] = parser.accepts;
        else if (transform.type !== 'multipart/form-data')
            head[CONTENT_TYPE] = transform.type;

        if (cookieHeader !== '')
            head['Cookie'] = cookieHeader;

        let opts = merge(this.options, {

            agent,
            headers: head,
            host,
            port,
            method,
            path

        });

        let request = (this.agent instanceof https.Agent) ?
            https.request : http.request;

        return new Run((onError,onSuccess) => {

            let req = request(opts, res => {

                let data: Buffer[] = [];

                res.on('data', chunk => data.push(chunk));

                res.on('end', () => {

                    if (!req.aborted) {

                        let exceptParsed = parser.apply(data);

                        if (exceptParsed.isLeft()) {

                            onError(new Error(exceptParsed.takeLeft().message));

                        } else {

                            if (Array.isArray(res.headers['set-cookie']))
                                cookies.setCookies(res.headers['set-cookie']);

                            onSuccess(createResponse(
                                <number>res.statusCode,
                                exceptParsed.takeRight(),
                                <{ [key: string]: string }>res.headers,
                                ctx
                            ));

                        }

                    }

                });

            });

            req.on('error', e => (!req.aborted) ? onError(e) : undefined);

            req.on('timeout', () => req.abort());

            req.on('abort', () => onError(new Error('Request Aborted!')));

            if (options.ttl) req.setTimeout(options.ttl);

            if (body != null) {

                let exceptBody = transform.apply(body);

                if (exceptBody.isLeft()) {

                    onError(new Error(exceptBody.takeLeft().message));
                    return () => { };

                } else {

                    req.write(exceptBody.takeRight());

                }

            }

            req.end();

            return () => req.abort();

        });

    }

}
