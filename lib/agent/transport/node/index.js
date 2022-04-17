"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeHTTPTransport = exports.AbortedError = void 0;
const http = require("http");
const https = require("https");
const record_1 = require("@quenk/noni/lib/data/record");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const response_1 = require("../../../response");
const headers_1 = require("../../../headers");
const cookie_1 = require("../../../cookie");
const method_1 = require("../../../request/method");
/**
 * AbortedError
 */
class AbortedError {
    constructor() {
        this.message = 'aborted';
    }
}
exports.AbortedError = AbortedError;
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
class NodeHTTPTransport {
    constructor(transform, parser, agent, options = {}) {
        this.transform = transform;
        this.parser = parser;
        this.agent = agent;
        this.options = options;
    }
    send(ctx) {
        let { parser, transform, agent } = this;
        let { host, port, path, method, body, headers, cookies, options } = ctx;
        let head = (0, record_1.merge)({}, headers);
        let cookieHeader = (0, cookie_1.toCookieHeader)(cookies.getCookies());
        if ((method === method_1.Method.Get) || (method === method_1.Method.Head))
            head[headers_1.ACCEPTS] = parser.accepts;
        else if (transform.type !== 'multipart/form-data')
            head[headers_1.CONTENT_TYPE] = transform.type;
        if (cookieHeader !== '')
            head['Cookie'] = cookieHeader;
        let opts = (0, record_1.merge)(this.options, {
            agent,
            headers: head,
            host,
            port,
            method,
            path
        });
        let request = (this.agent instanceof https.Agent) ?
            https.request : http.request;
        return new future_1.Run((onError, onSuccess) => {
            let req = request(opts, res => {
                let data = [];
                res.on('data', chunk => data.push(chunk));
                res.on('end', () => {
                    if (!req.aborted) {
                        let exceptParsed = parser.apply(data);
                        if (exceptParsed.isLeft()) {
                            onError(new Error(exceptParsed.takeLeft().message));
                        }
                        else {
                            if (Array.isArray(res.headers['set-cookie']))
                                cookies.setCookies(res.headers['set-cookie']);
                            onSuccess((0, response_1.createResponse)(res.statusCode, exceptParsed.takeRight(), res.headers, ctx));
                        }
                    }
                });
            });
            req.on('error', e => (!req.aborted) ? onError(e) : undefined);
            req.on('timeout', () => req.abort());
            req.on('abort', () => onError(new Error('Request Aborted!')));
            if (options.ttl)
                req.setTimeout(options.ttl);
            if (body != null) {
                let exceptBody = transform.apply(body);
                if (exceptBody.isLeft()) {
                    onError(new Error(exceptBody.takeLeft().message));
                    return () => { };
                }
                else {
                    req.write(exceptBody.takeRight());
                }
            }
            req.end();
            return () => req.abort();
        });
    }
}
exports.NodeHTTPTransport = NodeHTTPTransport;
//# sourceMappingURL=index.js.map