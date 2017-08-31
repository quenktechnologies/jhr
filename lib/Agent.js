"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var Status = require("./Status");
exports.Status = Status;
var Headers = require("./Headers");
exports.Headers = Headers;
var Methods = require("./Methods");
exports.Methods = Methods;
var Errors = require("./Errors");
exports.Errors = Errors;
var Utils = require("./Utils");
var Response = require("./Response");
exports.Response = Response;
var Cookies_1 = require("./Cookies");
var ResponseFilter_1 = require("./ResponseFilter");
exports.ResponseFilter = ResponseFilter_1.ResponseFilter;
/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 */
var CSRFAdapter = (function () {
    function CSRFAdapter(cookieName, headerName) {
        if (cookieName === void 0) { cookieName = 'xsrf-token'; }
        if (headerName === void 0) { headerName = 'x-xsrf-token'; }
        this.cookieName = cookieName;
        this.headerName = headerName;
    }
    CSRFAdapter.prototype.beforeRequest = function (_req, xhr, _agent) {
        xhr.setRequestHeader(this.headerName, Cookies_1.Cookies.get(this.cookieName));
    };
    return CSRFAdapter;
}());
exports.CSRFAdapter = CSRFAdapter;
/**
 * JSONTransform
 */
var JSONTransform = (function () {
    function JSONTransform(prefix) {
        if (prefix === void 0) { prefix = /^\)\]\}',?\n/; }
        this.prefix = prefix;
        this.responseType = '';
        this.accepts = 'application/json';
        this.contentType = 'application/json;charset=utf-8';
    }
    JSONTransform.prototype.parseRequestBody = function (body) {
        return (Utils.isObject(body) &&
            !Utils.isFile(body) &&
            !Utils.isBlob(body) &&
            !Utils.isFormData(body)) ?
            JSON.stringify(body) : body;
    };
    JSONTransform.prototype.parseResponseBody = function (body) {
        if (body === void 0) { body = {}; }
        if (typeof body === 'string') {
            body = body.replace(this.prefix, '').trim();
            if (body) {
                try {
                    body = JSON.parse(body);
                }
                catch (e) {
                    console.warn("Could not parse server data as json : '" + body + "'");
                    body = {};
                }
            }
        }
        return body;
    };
    return JSONTransform;
}());
exports.JSONTransform = JSONTransform;
/**
 * NoTransform lets the browser do everything.
 */
var NoTransform = (function () {
    function NoTransform() {
        this.responseType = '';
        this.accepts = '';
        this.contentType = '';
    }
    NoTransform.prototype.parseRequestBody = function (body) {
        return body;
    };
    NoTransform.prototype.parseResponseBody = function (body) {
        return body;
    };
    return NoTransform;
}());
exports.NoTransform = NoTransform;
/**
 * Request
 */
var Request = (function () {
    function Request(url, method, agent) {
        this.url = url;
        this.method = method;
        this.agent = agent;
    }
    Request.prototype.execute = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        var _a = this.method, method = _a.method, params = _a.params, headers = _a.headers, ttl = _a.ttl;
        var _b = this, url = _b.url, agent = _b.agent;
        var read = (method.toUpperCase() === Methods.GET) ||
            (method.toUpperCase() === Methods.HEAD);
        return new Promise(function (resolve, reject) {
            var payload = params ? agent.transform.parseRequestBody(params) : null;
            xhr.open(method, Utils.urlFromString(url, read ? payload : null), true);
            xhr.onload = function () {
                return resolve(Response.create(xhr, agent.transform.parseResponseBody(xhr.response)));
            };
            if (ttl > 0)
                xhr.timeout = ttl;
            Headers.set(xhr, agent.headers, read ? (_a = {}, _a[Headers.ACCEPTS] = agent.transform.accepts, _a) : (_b = {}, _b[Headers.CONTENT_TYPE] = agent.transform.contentType, _b), headers);
            xhr.responseType = agent.transform.responseType;
            agent.adapters.forEach(function (a) { return a.beforeRequest(_this, xhr, agent); });
            xhr.onerror = function () { return reject(new Errors.TransportError('')); };
            xhr.onabort = function () { return reject(new Errors.TransportError('')); };
            xhr.send(read ? null : payload);
            var _a, _b;
        });
    };
    return Request;
}());
exports.Request = Request;
/**
 * @param {Transform} [transform]
 */
var Agent = (function () {
    function Agent(transform) {
        if (transform === void 0) { transform = new JSONTransform(); }
        this.transform = transform;
        this.headers = {};
        this.adapters = [];
    }
    /**
     * create a new Agent with the specified transform
     */
    Agent.create = function (transform) {
        return new Agent(transform);
    };
    /**
     * send a request
     */
    Agent.send = function (url, r) {
        return Agent.create().send(url, r);
    };
    /**
     * add an Adapter to this Agent.
     */
    Agent.prototype.add = function (a) {
        this.adapters.push(a);
        return this;
    };
    Agent.prototype.head = function (url, params, headers) {
        return this.send(url, new Methods.Head(params, headers));
    };
    Agent.prototype.get = function (url, params, headers) {
        return this.send(url, new Methods.Get(params, headers));
    };
    Agent.prototype.post = function (url, params, headers) {
        return this.send(url, new Methods.Post(params, headers));
    };
    Agent.prototype.put = function (url, params, headers) {
        return this.send(url, new Methods.Put(params, headers));
    };
    Agent.prototype.delete = function (url, params, headers) {
        return this.send(url, new Methods.Delete(params, headers));
    };
    Agent.prototype.send = function (url, req) {
        return this.newRequest(url, req).execute();
    };
    /**
     * newRequest creates a new Request from an object descriptor.
     *
     */
    Agent.prototype.newRequest = function (url, req) {
        return new Request(url, req, this);
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map