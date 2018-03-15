"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var util = require("../util");
var headers_1 = require("../headers");
var util_1 = require("afpl/lib/util");
var polate_1 = require("@quenk/polate");
var method_1 = require("../method");
var request_1 = require("../request");
var readMethods = [method_1.GET, method_1.HEAD];
var isRead = function (m) { return (readMethods.indexOf(m.toUpperCase()) > -1); };
var adapters = function (f, env) {
    return f.reduce(function (p, c) { return p.then(c); }, Promise.resolve(env));
};
/**
 * Agent acts as an HTTP client.
 *
 * An Agent instance uses its transport to send HTTP requests
 * and receive responses.
 * @param <O> - The type the request body is transformed to before sending.
 * @param <I> - The type of the incomming response body before transformation.
 */
var Agent = /** @class */ (function () {
    function Agent(headers, cookies, transform, adapters, transport) {
        this.headers = headers;
        this.cookies = cookies;
        this.transform = transform;
        this.adapters = adapters;
        this.transport = transport;
    }
    Agent.prototype.head = function (url, params, headers) {
        return this.send(url, new request_1.Head(params, headers));
    };
    Agent.prototype.get = function (url, body, headers) {
        return this.send(url, new request_1.Get(body, headers));
    };
    Agent.prototype.post = function (url, body, headers) {
        return this.send(url, new request_1.Post(body, headers));
    };
    Agent.prototype.put = function (url, body, headers) {
        return this.send(url, new request_1.Put(body, headers));
    };
    Agent.prototype.patch = function (url, body, headers) {
        return this.send(url, new request_1.Patch(body, headers));
    };
    Agent.prototype.delete = function (url, body, headers) {
        return this.send(url, new request_1.Delete(body, headers));
    };
    /**
     * send a Request to a specified url.
     */
    Agent.prototype.send = function (url, _a) {
        var _this = this;
        var method = _a.method, body = _a.body, headers = _a.headers, params = _a.params, options = _a.options;
        return this
            .transform
            .transformRequestBody(body)
            .then(function (body) {
            return adapters(_this.adapters, {
                url: util.urlFromString(polate_1.polate(url, options.context || {}), params),
                method: method,
                body: body,
                headers: util_1.merge(_this.headers, headers, isRead(method) ? (_a = {}, _a[headers_1.ACCEPTS] = _this.transform.accepts, _a) : (_b = {}, _b[headers_1.CONTENT_TYPE] = _this.transform.contentType, _b)),
                options: options,
                agent: _this
            });
            var _a, _b;
        })
            .then(function (env) { return _this.transport.send(env); });
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map