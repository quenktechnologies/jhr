"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
var record_1 = require("@quenk/noni/lib/data/record");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var request_1 = require("../request");
var defaultOptions = { ttl: 0, tags: {}, context: {} };
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
var Agent = /** @class */ (function () {
    function Agent(host, headers, cookies, options, transport, plugins) {
        this.host = host;
        this.headers = headers;
        this.cookies = cookies;
        this.options = options;
        this.transport = transport;
        this.plugins = plugins;
    }
    /**
     * setTransport allows the transport to be changed (possibly to process
     * a different type of response).
     *
     * A new Agent instance is created with NO plugins installed.
     */
    Agent.prototype.setTransport = function (transport, plugins) {
        if (plugins === void 0) { plugins = []; }
        var _a = this, host = _a.host, headers = _a.headers, cookies = _a.cookies, options = _a.options;
        return new Agent(host, headers, cookies, options, transport, plugins);
    };
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
        var _a = this, host = _a.host, cookies = _a.cookies, headers = _a.headers, transport = _a.transport, plugins = _a.plugins;
        var options = record_1.rmerge3(defaultOptions, this.options, req.options);
        var method = req.method, params = req.params, body = req.body;
        var tags = options.tags, context = options.context, ttl = options.ttl;
        var path = util.urlFromString(string_1.interpolate(req.path, context), params);
        var ctx = {
            host: host,
            method: method,
            path: path,
            body: body,
            headers: headers,
            cookies: cookies,
            options: { ttl: ttl, tags: tags, context: context }
        };
        var ft = plugins.reduce(function (f, p) {
            return f.chain(function (c) { return p.beforeRequest(c); });
        }, future_1.pure(ctx));
        return ft.chain(function (ctx) { return transport.send(ctx); })
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