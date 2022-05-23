"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.defaultOptions = void 0;
const util = require("../util");
const record_1 = require("@quenk/noni/lib/data/record");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const string_1 = require("@quenk/noni/lib/data/string");
const request_1 = require("../request");
/**
 * defaultOptions
 */
exports.defaultOptions = { ttl: 0, tags: {}, context: {} };
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 */
class Agent {
    constructor(host, cookies, options, transport, plugins) {
        this.host = host;
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
    setTransport(transport, plugins = []) {
        let { host, cookies, options } = this;
        return new Agent(host, cookies, options, transport, plugins);
    }
    head(path, params = {}, options = {}) {
        return this.send(new request_1.Head(path, params, options));
    }
    get(path, params = {}, options = {}) {
        return this.send(new request_1.Get(path, params, options));
    }
    post(path, body, options = {}) {
        return this.send(new request_1.Post(path, body, options));
    }
    put(path, body, options = {}) {
        return this.send(new request_1.Put(path, body, options));
    }
    patch(path, body, options = {}) {
        return this.send(new request_1.Patch(path, body, options));
    }
    delete(path, body, options = {}) {
        return this.send(new request_1.Delete(path, body, options));
    }
    send(req) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let { host, cookies, options, transport, plugins } = that;
            options = (0, record_1.rmerge3)(exports.defaultOptions, options, req.options);
            let port = options.port;
            let { method, params, body } = req;
            let { tags, context = {}, ttl, headers = {} } = options;
            let path = util.urlFromString((0, string_1.interpolate)(req.path, context), params);
            let ctx = {
                host,
                port,
                method,
                path,
                body,
                cookies,
                options: {
                    headers: headers,
                    ttl: ttl,
                    tags: tags,
                    context
                }
            };
            ctx = yield (0, future_1.reduce)(plugins, ctx, (ctx, plg) => plg.beforeRequest(ctx));
            let res = yield transport.send(ctx);
            return (0, future_1.reduce)(plugins, res, (res, plg) => plg.afterResponse(res));
        });
    }
}
exports.Agent = Agent;
//# sourceMappingURL=index.js.map