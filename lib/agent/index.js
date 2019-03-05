"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
var record_1 = require("@quenk/noni/lib/data/record");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var polate_1 = require("@quenk/polate");
var headers_1 = require("../headers");
var method_1 = require("../request/method");
var request_1 = require("../request");
var readMethods = [method_1.Method.Get, method_1.Method.Head];
var isRead = function (m) { return (readMethods.indexOf(m.toUpperCase()) > -1); };
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
var Agent = /** @class */ (function () {
    function Agent(host, headers, cookies, options, transform, parser, transport, plugins) {
        this.host = host;
        this.headers = headers;
        this.cookies = cookies;
        this.options = options;
        this.transform = transform;
        this.parser = parser;
        this.transport = transport;
        this.plugins = plugins;
    }
    /**
     * head request shorthand.
     */
    Agent.prototype.head = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Head(path, params, headers));
    };
    /**
     * get request shorthand.
     */
    Agent.prototype.get = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Get(path, params, headers));
    };
    /**
     * post request shorthand.
     */
    Agent.prototype.post = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Post(path, body, headers));
    };
    /**
     * put request shorthand.
     */
    Agent.prototype.put = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Put(path, body, headers));
    };
    /**
     * patch request shorthand.
     */
    Agent.prototype.patch = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Patch(path, body, headers));
    };
    /**
     * delete request shorthand.
     */
    Agent.prototype.delete = function (path, body, headers) {
        return this.send(new request_1.Delete(path, body, headers));
    };
    /**
     * send a Request to the server.
     */
    Agent.prototype.send = function (req) {
        var _a, _b;
        var _c = this, host = _c.host, cookies = _c.cookies, headers = _c.headers, options = _c.options, transform = _c.transform, transport = _c.transport, parser = _c.parser, plugins = _c.plugins;
        var method = req.method, params = req.params;
        var tags = options.tags.concat(req.options.tags);
        var context = record_1.merge(options.context, req.options.context);
        var ttl = req.options.ttl;
        var path = util.urlFromString(polate_1.polate(req.path, context), params);
        var ft = (isRead(req.method) || (req.body == null)) ?
            future_1.pure(undefined) : future_1.fromExcept(transform.apply(req.body));
        headers = record_1.merge3(headers, req.headers, isRead(req.method) ? (_a = {}, _a[headers_1.ACCEPTS] = this.parser.accepts, _a) : (_b = {}, _b[headers_1.CONTENT_TYPE] = this.transform.type, _b));
        return ft
            .chain(function (body) {
            var ctx = {
                host: host,
                method: method,
                path: path,
                body: body,
                headers: headers,
                cookies: cookies,
                options: { ttl: ttl, tags: tags, context: context },
                parser: parser
            };
            return plugins.reduce(function (f, p) {
                return f.chain(function (c) { return p.beforeRequest(c); });
            }, future_1.pure(ctx));
        })
            .chain(function (ctx) {
            return transport.send(ctx);
        })
            .chain(function (r) {
            return plugins.reduce(function (f, p) {
                return f.chain(function (res) { return p.afterResponse(res); });
            }, future_1.pure(r));
        });
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=index.js.map