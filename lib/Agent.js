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
var Cookies_1 = require("./Cookies");
var ResponseFilter_1 = require("./ResponseFilter");
exports.ResponseFilter = ResponseFilter_1.ResponseFilter;
exports.headers = new Headers.Headers();
/**
 * CSRFAdapter sets the CSRF prevention header on write requests.
 * @param {string} cookieName - The name of the cookie to read the token from.
 * @param {string} headerName - The name of the header to set.
 */
var CSRFAdapter = /** @class */ (function () {
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
var JSONTransform = /** @class */ (function () {
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
        if (typeof body === 'string') {
            body = body.replace(this.prefix, '').trim();
            if (body) {
                try {
                    body = JSON.parse(body);
                }
                catch (e) {
                    console.warn("Could not parse server data as json : '" + body + "'");
                    //originally null set to undefined for ES2015 default values
                    body = undefined;
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
var NoTransform = /** @class */ (function () {
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
var Request = /** @class */ (function () {
    function Request(method, url, params, headers, ttl, agent) {
        if (headers === void 0) { headers = {}; }
        if (ttl === void 0) { ttl = 0; }
        this.method = method;
        this.url = url;
        this.params = params;
        this.headers = headers;
        this.ttl = ttl;
        this.agent = agent;
    }
    Request.prototype.execute = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            xhr.open(_this.method, Utils.urlFromString(_this.url, [Methods.GET, Methods.HEAD].indexOf(_this.method.toUpperCase()) > -1 ?
                _this.params : null), true);
            xhr.onload = function () {
                if (xhr.status >= 400)
                    return reject(Errors.create(xhr.status, xhr.responseText, _this.agent.transform.parseResponseBody(xhr.response), xhr.response));
                if ((xhr.response != null) && xhr.response !== '')
                    resolve(Response.create(xhr, _this.agent.transform.parseResponseBody(xhr.response)));
            };
            if (_this.ttl > 0)
                xhr.timeout = _this.ttl;
            exports.headers.set(xhr, _this.agent.headers, _this.headers);
            xhr.responseType = _this.agent.transform.responseType;
            _this.agent.adapters.forEach(function (a) { return a.beforeRequest(_this, xhr, _this.agent); });
            xhr.onerror = function () { return reject(new Errors.TransportError('')); };
            xhr.onabort = function () { return reject(new Errors.TransportError('')); };
            xhr.send(_this.params);
        });
    };
    return Request;
}());
exports.Request = Request;
/**
 * Response
 */
var Response = /** @class */ (function () {
    function Response(status, body, headers) {
        this.status = status;
        this.body = body;
        this.headers = headers;
    }
    /**
     * create a new HTTPResponse
     */
    Response.create = function (xhr, body) {
        return new Response(xhr.status, body, exports.headers.parse(xhr.getAllResponseHeaders()));
    };
    return Response;
}());
exports.Response = Response;
/**
 * @param {Transform} [transform]
 */
var Agent = /** @class */ (function () {
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
    Agent.send = function (request) {
        return Agent.create().send(request);
    };
    /**
     * add an Adapter to this Agent.
     */
    Agent.prototype.add = function (a) {
        this.adapters.push(a);
        return this;
    };
    Agent.prototype.head = function (url, params, headers) {
        return this.send(new Methods.Head(url, params, headers));
    };
    Agent.prototype.get = function (url, params, headers) {
        return this.send(new Methods.Get(url, params, headers));
    };
    Agent.prototype.post = function (url, params, headers) {
        return this.send(new Methods.Post(url, params, headers));
    };
    Agent.prototype.put = function (url, params, headers) {
        return this.send(new Methods.Put(url, params, headers));
    };
    Agent.prototype.delete = function (url, params, headers) {
        return this.send(new Methods.Delete(url, params, headers));
    };
    Agent.prototype.send = function (req) {
        return this.newRequest(req).execute();
    };
    /**
     * newRequest creates a new Request from an object descriptor.
     *
     */
    Agent.prototype.newRequest = function (req) {
        var read = (req.method === Methods.GET) || (req.method === Methods.HEAD);
        var ret = new Request(req.method, req.url, read ? req.params : this.transform.parseRequestBody(req.params), read ? Object.assign({}, req.headers, (_a = {}, _a[Headers.ACCEPTS] = this.transform.accepts, _a)) :
            Object.assign({}, req.headers, (_b = {}, _b[Headers.CONTENT_TYPE] = this.transform.contentType, _b)), req.ttl, this);
        return ret;
        var _a, _b;
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map