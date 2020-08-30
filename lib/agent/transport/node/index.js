"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeHTTPTransport = exports.AbortedError = void 0;
var http = require("http");
var https = require("https");
var record_1 = require("@quenk/noni/lib/data/record");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var response_1 = require("../../../response");
var headers_1 = require("../../../headers");
var cookie_1 = require("../../../cookie");
var method_1 = require("../../../request/method");
/**
 * AbortedError
 */
var AbortedError = /** @class */ (function () {
    function AbortedError() {
        this.message = 'aborted';
    }
    return AbortedError;
}());
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
var NodeHTTPTransport = /** @class */ (function () {
    function NodeHTTPTransport(transform, parser, agent, options) {
        if (options === void 0) { options = {}; }
        this.transform = transform;
        this.parser = parser;
        this.agent = agent;
        this.options = options;
    }
    NodeHTTPTransport.prototype.send = function (ctx) {
        var _a = this, parser = _a.parser, transform = _a.transform, agent = _a.agent;
        var host = ctx.host, port = ctx.port, path = ctx.path, method = ctx.method, body = ctx.body, headers = ctx.headers, cookies = ctx.cookies, options = ctx.options;
        var head = record_1.merge({}, headers);
        var cookieHeader = cookie_1.toCookieHeader(cookies.getCookies());
        if ((method === method_1.Method.Get) || (method === method_1.Method.Head))
            head[headers_1.ACCEPTS] = parser.accepts;
        else if (transform.type !== 'multipart/form-data')
            head[headers_1.CONTENT_TYPE] = transform.type;
        if (cookieHeader !== '')
            head['Cookie'] = cookieHeader;
        var opts = record_1.merge(this.options, {
            agent: agent,
            headers: head,
            host: host,
            port: port,
            method: method,
            path: path
        });
        var request = (this.agent instanceof https.Agent) ?
            https.request : http.request;
        return new future_1.Run(function (s) {
            var req = request(opts, function (res) {
                var data = [];
                res.on('data', function (chunk) { return data.push(chunk); });
                res.on('end', function () {
                    if (!req.aborted) {
                        var exceptParsed = parser.apply(data);
                        if (exceptParsed.isLeft()) {
                            s.onError(new Error(exceptParsed.takeLeft().message));
                        }
                        else {
                            if (Array.isArray(res.headers['set-cookie']))
                                cookies.setCookies(res.headers['set-cookie']);
                            s.onSuccess(response_1.createResponse(res.statusCode, exceptParsed.takeRight(), res.headers, options));
                        }
                    }
                });
            });
            req.on('error', function (e) { return (!req.aborted) ? s.onError(e) : undefined; });
            req.on('timeout', function () { return req.abort(); });
            req.on('abort', function () { return s.onError(new Error('Request Aborted!')); });
            if (options.ttl)
                req.setTimeout(options.ttl);
            if (body != null) {
                var exceptBody = transform.apply(body);
                if (exceptBody.isLeft()) {
                    s.onError(new Error(exceptBody.takeLeft().message));
                    return function () { };
                }
                else {
                    req.write(exceptBody.takeRight());
                }
            }
            req.end();
            return function () { return req.abort(); };
        });
    };
    return NodeHTTPTransport;
}());
exports.NodeHTTPTransport = NodeHTTPTransport;
//# sourceMappingURL=index.js.map