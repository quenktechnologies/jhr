(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
var record_1 = require("@quenk/noni/lib/data/record");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var request_1 = require("../request");
/**
 * defaultOptions
 */
exports.defaultOptions = { ttl: 0, tags: {}, context: {}, port: 80 };
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
        var options = record_1.rmerge3(exports.defaultOptions, this.options, req.options);
        var port = options.port;
        var method = req.method, params = req.params, body = req.body;
        var tags = options.tags, context = options.context, ttl = options.ttl;
        var path = util.urlFromString(string_1.interpolate(req.path, context), params);
        var ctx = {
            host: host,
            port: port,
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

},{"../request":10,"../util":14,"@quenk/noni/lib/control/monad/future":16,"@quenk/noni/lib/data/record":22,"@quenk/noni/lib/data/string":24}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("@quenk/noni/lib/control/error");
/**
 * JSONParser
 */
var JSONParser = /** @class */ (function () {
    function JSONParser(prefix) {
        if (prefix === void 0) { prefix = /^\)\]\}',?\n/; }
        this.prefix = prefix;
        this.responseType = '';
        this.accepts = 'application/json';
    }
    JSONParser.prototype.apply = function (body) {
        var _this = this;
        return error_1.attempt(function () {
            if ((body == null) || (body.trim() == ''))
                return {};
            return JSON.parse(body.replace(_this.prefix, ''));
        });
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;

},{"@quenk/noni/lib/control/error":15}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util");
var error_1 = require("@quenk/noni/lib/control/error");
/**
 * JSONTransform
 */
var JSONTransform = /** @class */ (function () {
    function JSONTransform() {
        this.type = 'application/json;charset=utf-8';
    }
    JSONTransform.prototype.apply = function (body) {
        return error_1.attempt(function () {
            return (util.isObject(body) &&
                !util.isFile(body) &&
                !util.isBlob(body) &&
                !util.isFormData(body)) ?
                JSON.stringify(body) : ('' + body);
        });
    };
    return JSONTransform;
}());
exports.JSONTransform = JSONTransform;

},{"../../util":14,"@quenk/noni/lib/control/error":15}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * MultipartTransform
 */
var MultipartTransform = /** @class */ (function () {
    function MultipartTransform() {
        this.type = 'multipart/form-data';
    }
    MultipartTransform.prototype.apply = function (body) {
        return either_1.right(body);
    };
    return MultipartTransform;
}());
exports.MultipartTransform = MultipartTransform;

},{"@quenk/noni/lib/data/either":19}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var future_1 = require("@quenk/noni/lib/control/monad/future");
var header_1 = require("../../header");
var response_1 = require("../../response");
var method_1 = require("../../request/method");
var headers_1 = require("../../headers");
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
var XHRTransport = /** @class */ (function () {
    function XHRTransport(responseType, transform, parser) {
        if (responseType === void 0) { responseType = ''; }
        this.responseType = responseType;
        this.transform = transform;
        this.parser = parser;
    }
    XHRTransport.prototype.send = function (ctx) {
        var _this = this;
        var _a = this, parser = _a.parser, transform = _a.transform;
        var host = ctx.host, path = ctx.path, method = ctx.method, body = ctx.body, headers = ctx.headers, options = ctx.options, cookies = ctx.cookies;
        var xhr = new XMLHttpRequest();
        var url = "" + host + (path[0] === '/' ? '' : '/') + path;
        return new future_1.Run(function (s) {
            var transBody = undefined;
            if (body != null) {
                var exceptBody = transform.apply(body);
                if (exceptBody.isLeft()) {
                    s.onError(new Error(exceptBody.takeLeft().message));
                    return function () { };
                }
                else {
                    transBody = exceptBody.takeRight();
                }
            }
            xhr.open(method, url, true);
            xhr.onload = function () {
                cookies.update(document.cookie);
                var exceptRes = parser.apply(xhr.response);
                if (exceptRes.isLeft()) {
                    s.onError(new Error(exceptRes.takeLeft().message));
                }
                else {
                    var r = response_1.createResponse(xhr.status, exceptRes.takeRight(), header_1.fromString(xhr.getAllResponseHeaders()), options);
                    s.onSuccess(r);
                }
            };
            xhr.timeout = options.ttl;
            xhr.responseType = _this.responseType;
            xhr.onerror = function () { return s.onError(new Error('TransportError')); };
            xhr.onabort = function () { return s.onError(new Error('AbortError')); };
            Object
                .keys(headers)
                .forEach(function (k) { xhr.setRequestHeader(k, headers[k]); });
            if ((method === method_1.Method.Get) || (method === method_1.Method.Head))
                xhr.setRequestHeader(headers_1.ACCEPTS, parser.accepts);
            else if (transform.type !== 'multipart/form-data')
                xhr.setRequestHeader(headers_1.CONTENT_TYPE, transform.type);
            //^ multipart forms set a custom content type
            xhr.send(transBody);
            return function () { return xhr.abort(); };
        });
    };
    return XHRTransport;
}());
exports.XHRTransport = XHRTransport;

},{"../../header":8,"../../headers":9,"../../request/method":11,"../../response":12,"@quenk/noni/lib/control/monad/future":16}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memory_1 = require("./cookie/container/memory");
var json_1 = require("./agent/transform/json");
var json_2 = require("./agent/parser/json");
var xhr_1 = require("./agent/transport/xhr");
var request_1 = require("./request");
var agent_1 = require("./agent");
var HTTP = 'http://';
var HTTPS = 'https://';
/**
 * @private
 */
exports.splitUrl = function (url) {
    var split = url.split(HTTP).join('').split(HTTPS).join('').split('/');
    if ((split.length === 1) || ((split.length === 2) && (split[1] === '')))
        return [split[0], '/'];
    return [split[0], '/' + split.slice(1).join('/')];
};
/**
 * createAgent produces a new default Agent for use in the browser.
 */
exports.createAgent = function (host, port) {
    if (port === void 0) { port = 80; }
    return new agent_1.Agent(host, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: {}, context: {}, port: port }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []);
};
/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
exports.get = function (url, params, headers) {
    if (params === void 0) { params = {}; }
    if (headers === void 0) { headers = {}; }
    var _a = exports.splitUrl(url), host = _a[0], path = _a[1];
    return exports.createAgent(host).send(new request_1.Get(path, params, headers));
};

},{"./agent":1,"./agent/parser/json":2,"./agent/transform/json":3,"./agent/transport/xhr":5,"./cookie/container/memory":7,"./request":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _defaults = {
    expires: 365, domain: '', path: '/', secure: true, httpOnly: false
};
//NOTE: This is originally based on code from another project, unfortunately
// we lost the source.
//
// If you recognize anything here from another project please send an email
// to info@quenk.com so we can update the LICENSE file.
/**
 * MemoryContainer stores cookie values in memory.
 */
var MemoryContainer = /** @class */ (function () {
    function MemoryContainer(cookies, defaults) {
        if (cookies === void 0) { cookies = ''; }
        if (defaults === void 0) { defaults = _defaults; }
        this.cookies = cookies;
        this.defaults = defaults;
    }
    MemoryContainer.prototype.set = function (name, value, opts) {
        if (opts === void 0) { opts = {}; }
        var defaults = this.defaults;
        // Apply default value for unspecified options
        var expires = opts.expires || defaults.expires;
        var domain = opts.domain || defaults.domain;
        var path = opts.path !== undefined ?
            opts.path : (defaults.path !== undefined ? defaults.path : '/');
        var secure = opts.secure !== undefined ? opts.secure : defaults.secure;
        var httpOnly = opts.httpOnly !== undefined ?
            opts.httpOnly : defaults.httpOnly;
        // Determine cookie expiration date
        // If succesful the result will be a valid Date, 
        // otherwise it will be an invalid Date or false(ish)
        var expDate = new Date(new Date().getTime() + (expires * 864e5));
        // Set cookie
        this.cookies = name.replace(/[^+#$&^`|]/g, encodeURIComponent)
            .replace('(', '%28')
            .replace(')', '%29') +
            '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +
            (expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') +
            (domain ? ';domain=' + domain : '') +
            (path ? ';path=' + path : '') +
            (secure ? ';secure' : '') +
            (httpOnly ? ';httponly' : '');
        return this;
    };
    /**
     * update the internal cookie string representation.
     */
    MemoryContainer.prototype.update = function (cookies) {
        this.cookies = cookies;
        return this;
    };
    MemoryContainer.prototype.get = function (name) {
        return (this.getCookie(name));
    };
    MemoryContainer.prototype.getCookie = function (name) {
        var cookies = this.cookies.split(';');
        // Iterate all cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var cookieLength = cookie.length;
            // Determine separator index ("name=value")
            var separatorIndex = cookie.indexOf('=');
            // IE<11 emits the equal sign when the cookie value is empty
            separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;
            // Decode the cookie name and remove any leading/trailing spaces, 
            // then compare to the requested cookie name
            if (decodeURIComponent(cookie.substring(0, separatorIndex)
                .replace(/^\s+|\s+$/g, '')) === name) {
                return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
            }
        }
        return '';
    };
    /**
     * getAll the cookies as a map.
     */
    MemoryContainer.prototype.getAll = function () {
        var _this = this;
        var o = {};
        this
            .cookies
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
            .split(/\s*(?:\=[^;]*)?;\s*/)
            .forEach(function (k) { o[k] = _this.getCookie(k); });
        return (o);
    };
    MemoryContainer.prototype.getString = function () {
        return this.cookies;
    };
    return MemoryContainer;
}());
exports.MemoryContainer = MemoryContainer;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * fromString a string of headers into an object.
 */
exports.fromString = function (headers) {
    /*
     *
     *  Copyright (c) 2014 David Björklund
     *
     *  This software is released under the MIT license:
     *
     *  Permission is hereby granted, free of charge, to any person obtaining a copy
     *  of this software and associated documentation files (the "Software"), to deal
     *  in the Software without restriction, including without limitation the rights
     *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     *  copies of the Software, and to permit persons to whom the Software is
     *  furnished to do so, subject to the following conditions:
     *
     *  The above copyright notice and this permission notice shall be included in
     *  all copies or substantial portions of the Software.
     *
     *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     *  THE SOFTWARE.
     *
     */
    if (!headers)
        return {};
    var result = {};
    headers.trim().split('\n').forEach(function (row) {
        var index = row.indexOf(':');
        var key = row.slice(0, index).toLowerCase().trim();
        var value = row.slice(index + 1).trim();
        if (typeof (result[key]) === 'undefined') {
            result[key] = value;
        }
        else if (Array.isArray(result[key])) {
            result[key].push(value);
        }
        else {
            result[key] = [result[key], value];
        }
    });
    return result;
};
/**
 * set headers on an XMLHttpRequest object.
 */
exports.set = function (xhr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = args.length;
    if (args.length > 0)
        while (i--)
            if (i !== 0)
                Object
                    .keys(args[i]).forEach(function (k) {
                    if (args[i][k] != null)
                        xhr.setRequestHeader(k, args[i][k]);
                });
};

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Common HTTP header constants.
 */
exports.CONTENT_TYPE = 'Content-Type';
exports.ACCEPTS = 'Accept';

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var method_1 = require("./method");
/**
 * Head request.
 */
var Head = /** @class */ (function () {
    function Head(path, params, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = { ttl: 0, tags: {}, context: {} }; }
        this.path = path;
        this.params = params;
        this.headers = headers;
        this.options = options;
        this.method = method_1.Method.Head;
    }
    return Head;
}());
exports.Head = Head;
/**
 * Get request.
 */
var Get = /** @class */ (function (_super) {
    __extends(Get, _super);
    function Get() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Get;
        return _this;
    }
    return Get;
}(Head));
exports.Get = Get;
/**
 * Post request.
 */
var Post = /** @class */ (function () {
    function Post(path, body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = { ttl: 0, tags: {}, context: {} }; }
        this.path = path;
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = method_1.Method.Post;
    }
    return Post;
}());
exports.Post = Post;
/**
 * Put request.
 */
var Put = /** @class */ (function (_super) {
    __extends(Put, _super);
    function Put() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Put;
        return _this;
    }
    return Put;
}(Post));
exports.Put = Put;
/**
 * Patch request.
 */
var Patch = /** @class */ (function (_super) {
    __extends(Patch, _super);
    function Patch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Patch;
        return _this;
    }
    return Patch;
}(Post));
exports.Patch = Patch;
/**
 * Delete request.
 */
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Delete;
        return _this;
    }
    return Delete;
}(Post));
exports.Delete = Delete;

},{"./method":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method types.
 */
var Method;
(function (Method) {
    Method["Head"] = "HEAD";
    Method["Get"] = "GET";
    Method["Put"] = "PUT";
    Method["Post"] = "POST";
    Method["Delete"] = "DELETE";
    Method["Patch"] = "PATCH";
})(Method = exports.Method || (exports.Method = {}));

},{}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var status = require("./status");
/**
 * GenericResponse response refers to response codes we don't have
 * an explicit type for.
 */
var GenericResponse = /** @class */ (function () {
    function GenericResponse(code, body, headers, options) {
        this.code = code;
        this.body = body;
        this.headers = headers;
        this.options = options;
    }
    return GenericResponse;
}());
exports.GenericResponse = GenericResponse;
/**
 * Success
 *
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Success;
}(GenericResponse));
exports.Success = Success;
/**
 * Ok response.
 */
var Ok = /** @class */ (function (_super) {
    __extends(Ok, _super);
    function Ok(body, headers, options) {
        var _this = _super.call(this, status.OK, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Ok;
}(Success));
exports.Ok = Ok;
/**
 * Accepted response.
 */
var Accepted = /** @class */ (function (_super) {
    __extends(Accepted, _super);
    function Accepted(body, headers, options) {
        var _this = _super.call(this, status.ACCEPTED, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Accepted;
}(Success));
exports.Accepted = Accepted;
/**
 * NoContent response.
 *
 * NOTE: In practice, the body here should always be undefined.
 */
var NoContent = /** @class */ (function (_super) {
    __extends(NoContent, _super);
    function NoContent(body, headers, options) {
        var _this = _super.call(this, status.NO_CONTENT, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return NoContent;
}(Success));
exports.NoContent = NoContent;
/**
 * Created response.
 */
var Created = /** @class */ (function (_super) {
    __extends(Created, _super);
    function Created(body, headers, options) {
        var _this = _super.call(this, status.CREATED, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Created;
}(Success));
exports.Created = Created;
/**
 * ClientError
 * See (here)[http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml].
 */
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClientError;
}(GenericResponse));
exports.ClientError = ClientError;
/**
 * BadRequest response.
 */
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(body, headers, options) {
        var _this = _super.call(this, status.BAD_REQUEST, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return BadRequest;
}(ClientError));
exports.BadRequest = BadRequest;
/**
 * Unauthorized response.
 */
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(body, headers, options) {
        var _this = _super.call(this, status.UNAUTHORIZED, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Unauthorized;
}(ClientError));
exports.Unauthorized = Unauthorized;
/**
 * Forbidden response.
 */
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(body, headers, options) {
        var _this = _super.call(this, status.FORBIDDEN, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Forbidden;
}(ClientError));
exports.Forbidden = Forbidden;
/**
 * NotFound response.
 */
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(body, headers, options) {
        var _this = _super.call(this, status.NOT_FOUND, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return NotFound;
}(ClientError));
exports.NotFound = NotFound;
/**
 * Conflict response.
 */
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(body, headers, options) {
        var _this = _super.call(this, status.CONFLICT, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        return _this;
    }
    return Conflict;
}(ClientError));
exports.Conflict = Conflict;
/**
 * ServerError
 */
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerError;
}(GenericResponse));
exports.ServerError = ServerError;
/**
 * InternalServerError response.
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(body, headers, options) {
        var _this = _super.call(this, status.INTERNAL_SERVER_ERROR, body, headers, options) || this;
        _this.body = body;
        _this.headers = headers;
        _this.options = options;
        _this.status = status.INTERNAL_SERVER_ERROR;
        return _this;
    }
    return InternalServerError;
}(ServerError));
exports.InternalServerError = InternalServerError;
/**
 * createResponse creates a new typed Response or a GenericResponse if
 * unsupported.
 */
exports.createResponse = function (code, body, headers, options) {
    switch (code) {
        case status.OK:
            return new Ok(body, headers, options);
        case status.ACCEPTED:
            return new Accepted(body, headers, options);
        case status.NO_CONTENT:
            return new NoContent(body, headers, options);
        case status.CREATED:
            return new Created(body, headers, options);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, options);
        case status.BAD_REQUEST:
            return new BadRequest(body, headers, options);
        case status.UNAUTHORIZED:
            return new Unauthorized(body, headers, options);
        case status.FORBIDDEN:
            return new Forbidden(body, headers, options);
        case status.NOT_FOUND:
            return new NotFound(body, headers, options);
        case status.CONFLICT:
            return new Conflict(body, headers, options);
        case status.INTERNAL_SERVER_ERROR:
            return new InternalServerError(body, headers, options);
        default:
            if ((code >= 400) && (code <= 499))
                return new ClientError(code, body, headers, options);
            else if (code >= 500)
                return new ServerError(code, body, headers, options);
            else
                return new GenericResponse(code, body, headers, options);
    }
};

},{"./status":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTINUE = 100;
exports.SWITCHING_PROTOCOLS = 101;
exports.PROCESSING = 102;
exports.OK = 200;
exports.CREATED = 201;
exports.ACCEPTED = 202;
exports.NON_AUTHORITATIV_INFO = 203;
exports.NO_CONTENT = 204;
exports.RESET_CONTENT = 205;
exports.PARTIAL_CONTENT = 206;
exports.MULTI_STATUS = 207;
exports.ALREADY_REPORTED = 208;
exports.IM_USED = 226;
exports.MULTIPLE_CHOICES = 300;
exports.MOVED_PERMANENTLY = 301;
exports.FOUND = 302;
exports.SEE_OTHER = 303;
exports.NOT_MODIFIED = 304;
exports.USE_PROXY = 305;
exports.TEMPORARY_REDIRECT = 307;
exports.PERMANENT_REDIRECT = 308;
exports.BAD_REQUEST = 400;
exports.UNAUTHORIZED = 401;
exports.PAYMENT_REQUIRED = 402;
exports.FORBIDDEN = 403;
exports.NOT_FOUND = 404;
exports.METHOD_NOT_ALLOWED = 405;
exports.NOT_ACCEPTABLE = 406;
exports.PROXY_AUTH_REQUIRED = 407;
exports.REQUEST_TIMEOUT = 408;
exports.CONFLICT = 409;
exports.GONE = 410;
exports.LENGTH_REQUIRED = 411;
exports.PRECONDITION_FAILED = 412;
exports.REQUEST_ENTITY_TOO_LARGE = 413;
exports.REQUEST_URI_TOO_LONG = 414;
exports.UNSUPPORTED_MEDIA_TYPE = 415;
exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416;
exports.EXPECTATION_FAILED = 417;
exports.TEAPOT = 418;
exports.UNPROCESSABLE_ENTITY = 422;
exports.LOCKED = 423;
exports.FAILED_DEPENDENCY = 424;
exports.UPGRADE_REQUIRED = 426;
exports.PRECONDITION_REQUIRED = 428;
exports.TOO_MANY_REQUESTS = 429;
exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
exports.UNAVAILABLE_FOR_LEGAL_RREASONS = 451;
exports.INTERNAL_SERVER_ERROR = 500;
exports.NOT_IMPLEMENTED = 501;
exports.BAD_GATEWAY = 502;
exports.SERVICE_UNAVAILABLE = 503;
exports.GATEWAY_TIMEOUT = 504;
exports.HTTP_VERSION_NOT_SUPPORTED = 505;
exports.VARIANT_ALSO_NEGOTIATES = 506;
exports.INSUFFICIENT_STORAGE = 507;
exports.LOOP_DETECTED = 508;
exports.NOT_EXTENDED = 510;
exports.NETWORK_AUTHENTICATION_REQUIRED = 511;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
/**
 * isObject test.
 */
exports.isObject = function (obj) {
    return typeof obj === 'object';
};
/**
 * isFile test.
 */
exports.isFile = function (obj) {
    return toString.call(obj) === '[object File]';
};
/**
 * isFormData test.
 */
exports.isFormData = function (obj) {
    return toString.call(obj) === '[object FormData]';
};
/**
 * isBlob test.
 */
exports.isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
};
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
exports.urlFromString = function (url, params) {
    if (params === void 0) { params = {}; }
    return url + "?" + qs.stringify(params);
};

},{"qs":33}],15:[function(require,module,exports){
"use strict";
/**
 * This module provides functions and types to make dealing with ES errors
 * easier.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** imports */
var either_1 = require("../data/either");
/**
 * convert an Err to an Error.
 */
exports.convert = function (e) {
    return (e instanceof Error) ? e : new Error(e.message);
};
/**
 * raise the supplied Error.
 *
 * This function exists to maintain a functional style in situations where
 * you may actually want to throw an error.
 */
exports.raise = function (e) {
    if (e instanceof Error) {
        throw e;
    }
    else {
        throw new Error(e.message);
    }
};
/**
 * attempt a synchronous computation that may throw an exception.
 */
exports.attempt = function (f) {
    try {
        return either_1.right(f());
    }
    catch (e) {
        return either_1.left(e);
    }
};

},{"../data/either":19}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = require("../timer");
var function_1 = require("../../data/function");
var error_1 = require("../error");
var Future = /** @class */ (function () {
    function Future() {
    }
    Future.prototype.of = function (a) {
        return new Pure(a);
    };
    Future.prototype.map = function (f) {
        return new Bind(this, function (value) { return new Pure(f(value)); });
    };
    Future.prototype.ap = function (ft) {
        return new Bind(this, function (value) { return ft.map(function (f) { return f(value); }); });
    };
    Future.prototype.chain = function (f) {
        return new Bind(this, f);
    };
    Future.prototype.catch = function (f) {
        return new Catch(this, f);
    };
    Future.prototype.finally = function (f) {
        return new Finally(this, f);
    };
    Future.prototype.fork = function (onError, onSuccess) {
        return (new Compute(undefined, onError, onSuccess, [this])).run();
    };
    /**
     * __trap
     * @private
     */
    Future.prototype.__trap = function (_, __) {
        return false;
    };
    return Future;
}());
exports.Future = Future;
/**
 * Pure constructor.
 */
var Pure = /** @class */ (function (_super) {
    __extends(Pure, _super);
    function Pure(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Pure.prototype.map = function (f) {
        return new Pure(f(this.value));
    };
    Pure.prototype.ap = function (ft) {
        var _this = this;
        return ft.map(function (f) { return f(_this.value); });
    };
    Pure.prototype.__exec = function (c) {
        c.value = this.value;
        timer_1.tick(function () { return c.run(); });
        return false;
    };
    return Pure;
}(Future));
exports.Pure = Pure;
/**
 * Bind constructor.
 * @private
 */
var Bind = /** @class */ (function (_super) {
    __extends(Bind, _super);
    function Bind(future, func) {
        var _this = _super.call(this) || this;
        _this.future = future;
        _this.func = func;
        return _this;
    }
    Bind.prototype.__exec = function (c) {
        //XXX: find a way to do this without any someday.
        c.stack.push(new Step(this.func));
        c.stack.push(this.future);
        return true;
    };
    return Bind;
}(Future));
exports.Bind = Bind;
/**
 * Step constructor.
 * @private
 */
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Step.prototype.__exec = function (c) {
        c.stack.push(this.value(c.value));
        return true;
    };
    return Step;
}(Future));
exports.Step = Step;
/**
 * Catch constructor.
 * @private
 */
var Catch = /** @class */ (function (_super) {
    __extends(Catch, _super);
    function Catch(future, func) {
        var _this = _super.call(this) || this;
        _this.future = future;
        _this.func = func;
        return _this;
    }
    Catch.prototype.__exec = function (c) {
        c.stack.push(new Trap(this.func));
        c.stack.push(this.future);
        return true;
    };
    return Catch;
}(Future));
exports.Catch = Catch;
/**
 * Finally constructor.
 * @private
 */
var Finally = /** @class */ (function (_super) {
    __extends(Finally, _super);
    function Finally(future, func) {
        var _this = _super.call(this) || this;
        _this.future = future;
        _this.func = func;
        return _this;
    }
    Finally.prototype.__exec = function (c) {
        c.stack.push(new Trap(this.func));
        c.stack.push(new Step(this.func));
        c.stack.push(this.future);
        return true;
    };
    return Finally;
}(Future));
exports.Finally = Finally;
/**
 * Trap constructor.
 * @private
 */
var Trap = /** @class */ (function (_super) {
    __extends(Trap, _super);
    function Trap(func) {
        var _this = _super.call(this) || this;
        _this.func = func;
        return _this;
    }
    Trap.prototype.__exec = function (_) {
        return true;
    };
    Trap.prototype.__trap = function (e, c) {
        c.stack.push(this.func(e));
        return true;
    };
    return Trap;
}(Future));
exports.Trap = Trap;
/**
 * Raise constructor.
 */
var Raise = /** @class */ (function (_super) {
    __extends(Raise, _super);
    function Raise(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Raise.prototype.map = function (_) {
        return new Raise(this.value);
    };
    Raise.prototype.ap = function (_) {
        return new Raise(this.value);
    };
    Raise.prototype.chain = function (_) {
        return new Raise(this.value);
    };
    Raise.prototype.__exec = function (c) {
        var finished = false;
        var e = error_1.convert(this.value);
        while (!finished) {
            if (c.stack.length === 0) {
                c.exitError(e);
                return false;
            }
            else {
                finished = c.stack.pop().__trap(e, c);
            }
        }
        return finished;
    };
    return Raise;
}(Future));
exports.Raise = Raise;
/**
 * Run constructor.
 * @private
 */
var Run = /** @class */ (function (_super) {
    __extends(Run, _super);
    function Run(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Run.prototype.__exec = function (c) {
        c.running = true;
        c.canceller = this.value(c);
        return false;
    };
    return Run;
}(Future));
exports.Run = Run;
/**
 * Compute represents the workload of a forked Future.
 *
 * Results are computed sequentially and ends with either a value,
 * error or prematurely via the abort method.
 */
var Compute = /** @class */ (function () {
    function Compute(value, exitError, exitSuccess, stack) {
        this.value = value;
        this.exitError = exitError;
        this.exitSuccess = exitSuccess;
        this.stack = stack;
        this.canceller = function_1.noop;
        this.running = false;
    }
    /**
     * onError handler.
     *
     * This method will a 'Raise' instruction at the top of the stack
     * and continue execution.
     */
    Compute.prototype.onError = function (e) {
        if (this.running === false)
            return;
        this.stack.push(new Raise(e));
        this.running = false;
        this.run();
    };
    /**
     * onSuccess handler.
     *
     * Stores the resulting value and continues the execution.
     */
    Compute.prototype.onSuccess = function (value) {
        if (this.running === false)
            return;
        this.value = value;
        this.running = false;
        this.run();
    };
    /**
     * abort this Compute.
     *
     * Aborting a Compute will immediately clear its stack
     * and invoke the canceller for the currently executing Future.
     */
    Compute.prototype.abort = function () {
        this.stack = [];
        this.exitError = function_1.noop;
        this.exitSuccess = function_1.noop;
        this.running = false;
        this.canceller();
        this.canceller = function_1.noop;
    };
    Compute.prototype.run = function () {
        while (this.stack.length > 0) {
            var next = this.stack.pop();
            if (!next.__exec(this))
                return this; // short-circuit
        }
        this.running = false;
        this.exitSuccess(this.value);
        return this;
    };
    return Compute;
}());
exports.Compute = Compute;
/**
 * pure wraps a synchronous value in a Future.
 */
exports.pure = function (a) { return new Pure(a); };
/**
 * raise wraps an Error in a Future.
 *
 * This future will be considered a failure.
 */
exports.raise = function (e) { return new Raise(e); };
/**
 * attempt a syncronous task, trapping any thrown errors in the Future.
 */
exports.attempt = function (f) { return new Run(function (s) {
    timer_1.tick(function () { try {
        s.onSuccess(f());
    }
    catch (e) {
        s.onError(e);
    } });
    return function_1.noop;
}); };
/**
 * delay a task by running it in the "next tick" without attempting
 * to trap any thrown errors.
 */
exports.delay = function (f) { return new Run(function (s) {
    timer_1.tick(function () { return s.onSuccess(f()); });
    return function_1.noop;
}); };
/**
 * fromAbortable takes an Aborter and a node style async function and
 * produces a Future.
 *
 * Note: The function used here is not called in the "next tick".
 */
exports.fromAbortable = function (abort) { return function (f) { return new Run(function (s) {
    f(function (err, a) { return (err != null) ? s.onError(err) : s.onSuccess(a); });
    return abort;
}); }; };
/**
 * fromCallback produces a Future from a node style async function.
 *
 * Note: The function used here is not called in the "next tick".
 */
exports.fromCallback = function (f) { return exports.fromAbortable(function_1.noop)(f); };
var Tag = /** @class */ (function () {
    function Tag(index, value) {
        this.index = index;
        this.value = value;
    }
    return Tag;
}());
/**
 * batch runs a list of batched Futures one batch at a time.
 */
exports.batch = function (list) {
    return exports.sequential(list.map(function (w) { return exports.parallel(w); }));
};
/**
 * parallel runs a list of Futures in parallel failing if any
 * fail and succeeding with a list of successful values.
 */
exports.parallel = function (list) { return new Run(function (s) {
    var done = [];
    var failed = false;
    var comps = [];
    var reconcile = function () { return done.sort(indexCmp).map(function (t) { return t.value; }); };
    var indexCmp = function (a, b) { return a.index - b.index; };
    var onErr = function (e) {
        abortAll();
        s.onError(e);
    };
    var onSucc = function (t) {
        if (!failed) {
            done.push(t);
            if (done.length === list.length)
                s.onSuccess(reconcile());
        }
    };
    var abortAll = function () {
        comps.map(function (c) { return c.abort(); });
        failed = true;
    };
    comps.push.apply(comps, list.map(function (f, i) {
        return f.map(function (value) { return new Tag(i, value); }).fork(onErr, onSucc);
    }));
    if (comps.length === 0)
        s.onSuccess([]);
    return function () { return abortAll(); };
}); };
/**
 * sequential execution of a list of futures.
 *
 * This function succeeds with a list of all results or fails on the first
 * error.
 */
exports.sequential = function (list) { return new Run(function (s) {
    var i = 0;
    var r = [];
    var onErr = function (e) { return s.onError(e); };
    var onSuccess = function (a) { r.push(a); next(); };
    var abort;
    var next = function () {
        if (i < list.length)
            abort = list[i].fork(onErr, onSuccess);
        else
            s.onSuccess(r);
        i++;
    };
    next();
    return function () { if (abort)
        abort.abort(); };
}); };
/**
 * reduce a list of futures into a single value.
 *
 * Starts with an initial value passing the result of
 * each future to the next.
 */
exports.reduce = function (list, init, f) { return new Run(function (s) {
    var i = 0;
    var onErr = function (e) { return s.onError(e); };
    var onSuccess = function (a) {
        init = f(init, a, i);
        next(init);
    };
    var abort;
    var next = function (value) {
        if (i < list.length)
            abort = list[i].fork(onErr, onSuccess);
        else
            s.onSuccess(value);
        i++;
    };
    next(init);
    return function () { if (abort)
        abort.abort(); };
}); };
/**
 * race given a list of Futures, will return a Future that is settled by
 * the first error or success to occur.
 */
exports.race = function (list) { return new Run(function (s) {
    var comps = [];
    var finished = false;
    var abortAll = function () {
        finished = true;
        comps.map(function (c) { return c.abort(); });
    };
    var onErr = function (e) {
        abortAll();
        s.onError(e);
    };
    var onSucc = function (t) {
        if (!finished) {
            finished = true;
            comps.map(function (c, i) { return (i !== t.index) ? c.abort() : undefined; });
            s.onSuccess(t.value);
        }
    };
    comps.push.apply(comps, list.map(function (f, i) {
        return f.map(function (value) { return new Tag(i, value); }).fork(onErr, onSucc);
    }));
    if (comps.length === 0)
        s.onError(new Error("race(): Cannot race an empty list!"));
    return function () { return abortAll(); };
}); };
/**
 * toPromise transforms a Future into a Promise.
 *
 * This function depends on the global promise constructor and
 * will fail if the enviornment does not provide one.
 */
exports.toPromise = function (ft) { return new Promise(function (yes, no) {
    return ft.fork(no, yes);
}); };
/**
 * fromExcept converts an Except to a Future.
 */
exports.fromExcept = function (e) {
    return e.fold(function (e) { return exports.raise(e); }, function (a) { return exports.pure(a); });
};
/**
 * liftP turns a function that produces a Promise into a Future.
 */
exports.liftP = function (f) { return new Run(function (s) {
    f()
        .then(function (a) { return s.onSuccess(a); })
        .catch(function (e) { return s.onError(e); });
    return function_1.noop;
}); };

},{"../../data/function":20,"../error":15,"../timer":17}],17:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * tick runs a function in the "next tick" using process.nextTick in node
 * or setTimeout(f, 0) elsewhere.
 */
exports.tick = function (f) { return (typeof window == 'undefined') ?
    setTimeout(f, 0) :
    process.nextTick(f); };

}).call(this,require('_process'))
},{"_process":31}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The array module provides helper functions
 * for working with JS arrays.
 */
var record_1 = require("./record");
var math_1 = require("../math");
/**
 * head returns the item at index 0 of an array
 */
exports.head = function (list) { return list[0]; };
/**
 * tail returns the last item in an array
 */
exports.tail = function (list) { return list[list.length - 1]; };
/**
 * empty indicates whether an array is empty or not.
 */
exports.empty = function (list) { return (list.length === 0); };
/**
 * contains indicates whether an element exists in an array.
 */
exports.contains = function (list) { return function (a) { return (list.indexOf(a) > -1); }; };
/**
 * map is a curried version of the Array#map method.
 */
exports.map = function (list) { return function (f) { return list.map(f); }; };
/**
 * concat concatenates an element to an array without destructuring
 * the element if itself is an array.
 */
exports.concat = function (list, a) { return list.concat([a]); };
/**
 * partition an array into two using a partitioning function.
 *
 * The first array contains values that return true and the second false.
 */
exports.partition = function (list) { return function (f) { return exports.empty(list) ?
    [[], []] :
    list.reduce(function (_a, c, i) {
        var yes = _a[0], no = _a[1];
        return (f(c, i, list) ?
            [exports.concat(yes, c), no] :
            [yes, exports.concat(no, c)]);
    }, [[], []]); }; };
/**
 * group the properties of a Record into another Record using a grouping
 * function.
 */
exports.group = function (list) { return function (f) {
    return list.reduce(function (p, c, i) {
        var _a;
        var g = f(c, i, list);
        return record_1.merge(p, (_a = {},
            _a[g] = Array.isArray(p[g]) ?
                exports.concat(p[g], c) : [c],
            _a));
    }, {});
}; };
/**
 * distribute breaks an array into an array of equally (approximate) sized
 * smaller arrays.
 */
exports.distribute = function (list, size) {
    var r = list.reduce(function (p, c, i) {
        return math_1.isMultipleOf(size, i + 1) ?
            [exports.concat(p[0], exports.concat(p[1], c)), []] :
            [p[0], exports.concat(p[1], c)];
    }, [[], []]);
    return (r[1].length === 0) ? r[0] : exports.concat(r[0], r[1]);
};
/**
 * dedupe an array by filtering out elements
 * that appear twice.
 */
exports.dedupe = function (list) {
    return list.filter(function (e, i, l) { return l.indexOf(e) === i; });
};

},{"../math":25,"./record":22}],19:[function(require,module,exports){
"use strict";
/**
 * Either represents a value that may be one of two types.
 *
 * An Either is either a Left or Right. Mapping and related functions over the
 * Left side returns the value unchanged. When the value is Right
 * functions are applied as normal.
 *
 * The Either concept is often used to accomodate error handling but there
 * are other places it may come in handy.
 *
 * An important point to note when using this type is that the left side
 * remains the same while chaining. That means, the types Either<number, string>
 * and Either<boolean, string> are two different types that can not be sequenced
 * together via map,chain etc.
 *
 * This turns up compiler errors in unexpected places and is sometimes rectified
 * by extracting the values out of the Either type completley and constructing
 * a fresh one.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("./maybe");
/**
 * The abstract Either class.
 *
 * This is the type that will be used in signatures.
 */
var Either = /** @class */ (function () {
    function Either() {
    }
    Either.prototype.of = function (value) {
        return new Right(value);
    };
    return Either;
}());
exports.Either = Either;
/**
 * Left side of the Either implementation.
 */
var Left = /** @class */ (function (_super) {
    __extends(Left, _super);
    function Left(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Left.prototype.map = function (_) {
        return new Left(this.value);
    };
    Left.prototype.lmap = function (f) {
        return new Left(f(this.value));
    };
    Left.prototype.bimap = function (f, _) {
        return new Left(f(this.value));
    };
    Left.prototype.alt = function (a) {
        return a;
    };
    Left.prototype.chain = function (_) {
        return new Left(this.value);
    };
    Left.prototype.ap = function (_) {
        return new Left(this.value);
    };
    Left.prototype.extend = function (_) {
        return new Left(this.value);
    };
    Left.prototype.fold = function (f, _) {
        return f(this.value);
    };
    Left.prototype.eq = function (m) {
        return ((m instanceof Left) && (m.value === this.value));
    };
    Left.prototype.orElse = function (f) {
        return f(this.value);
    };
    Left.prototype.orRight = function (f) {
        return new Right(f(this.value));
    };
    Left.prototype.isLeft = function () {
        return true;
    };
    Left.prototype.isRight = function () {
        return false;
    };
    Left.prototype.takeLeft = function () {
        return this.value;
    };
    Left.prototype.takeRight = function () {
        throw new TypeError("Not right!");
    };
    Left.prototype.toMaybe = function () {
        return maybe_1.nothing();
    };
    return Left;
}(Either));
exports.Left = Left;
/**
 * Right side implementation.
 */
var Right = /** @class */ (function (_super) {
    __extends(Right, _super);
    function Right(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.value));
    };
    Right.prototype.lmap = function (_) {
        return new Right(this.value);
    };
    Right.prototype.bimap = function (_, g) {
        return new Right(g(this.value));
    };
    Right.prototype.alt = function (_) {
        return this;
    };
    Right.prototype.chain = function (f) {
        return f(this.value);
    };
    Right.prototype.ap = function (e) {
        var _this = this;
        return e.map(function (f) { return f(_this.value); });
    };
    Right.prototype.extend = function (f) {
        return new Right(f(this));
    };
    Right.prototype.eq = function (m) {
        return ((m instanceof Right) && (m.value === this.value));
    };
    Right.prototype.fold = function (_, g) {
        return g(this.value);
    };
    Right.prototype.orElse = function (_) {
        return this;
    };
    Right.prototype.orRight = function (_) {
        return this;
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.takeLeft = function () {
        throw new TypeError("Not left!");
    };
    Right.prototype.takeRight = function () {
        return this.value;
    };
    Right.prototype.toMaybe = function () {
        return maybe_1.just(this.value);
    };
    return Right;
}(Either));
exports.Right = Right;
/**
 * left constructor helper.
 */
exports.left = function (a) { return new Left(a); };
/**
 * right constructor helper.
 */
exports.right = function (b) { return new Right(b); };
/**
 * fromBoolean constructs an Either using a boolean value.
 */
exports.fromBoolean = function (b) {
    return b ? exports.right(true) : exports.left(false);
};
/**
 * either given two functions, first for Left, second for Right, will return
 * the result of applying the appropriate function to an Either's internal value.
 */
exports.either = function (f) { return function (g) { return function (e) {
    return (e instanceof Right) ? g(e.takeRight()) : f(e.takeLeft());
}; }; };

},{"./maybe":21}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * compose two functions into one.
 */
exports.compose = function (f, g) { return function (a) { return g(f(a)); }; };
/**
 * compose3 functions into one.
 */
exports.compose3 = function (f, g, h) { return function (a) { return h(g(f(a))); }; };
/**
 * compose4 functions into one.
 */
exports.compose4 = function (f, g, h, i) {
    return function (a) { return i(h(g(f(a)))); };
};
/**
 * compose5 functions into one.
 */
exports.compose5 = function (f, g, h, i, j) { return function (a) { return j(i(h(g(f(a))))); }; };
/**
 * cons given two values, ignore the second and always return the first.
 */
exports.cons = function (a) { return function (_) { return a; }; };
/**
 * flip the order of arguments to a curried function that takes 2 arguments.
 */
exports.flip = function (f) { return function (b) { return function (a) { return (f(a)(b)); }; }; };
/**
 * identity function.
 */
exports.identity = function (a) { return a; };
exports.id = exports.identity;
/**
 * curry an ES function that accepts 2 parameters.
 */
exports.curry = function (f) { return function (a) { return function (b) { return f(a, b); }; }; };
/**
 * curry3 curries an ES function that accepts 3 parameters.
 */
exports.curry3 = function (f) { return function (a) { return function (b) { return function (c) { return f(a, b, c); }; }; }; };
/**
 * curry4 curries an ES function that accepts 4 parameters.
 */
exports.curry4 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return f(a, b, c, d); }; }; }; };
};
/**
 * curry5 curries an ES function that accepts 5 parameters.
 */
exports.curry5 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return f(a, b, c, d, e); }; }; }; }; };
};
/**
 * noop function
 */
exports.noop = function () { };

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Nothing represents the absence of a usable value.
 */
var Nothing = /** @class */ (function () {
    function Nothing() {
    }
    /**
     * map simply returns a Nothing<A>
     */
    Nothing.prototype.map = function (_) {
        return new Nothing();
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Nothing.prototype.ap = function (_) {
        return new Nothing();
    };
    /**
     * of wraps a value in a Just.
     */
    Nothing.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain simply returns a Nothing<A>.
     */
    Nothing.prototype.chain = function (_) {
        return new Nothing();
    };
    /**
     * alt will prefer whatever Maybe instance provided.
     */
    Nothing.prototype.alt = function (a) {
        return a;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Nothing.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend returns a Nothing<A>.
     */
    Nothing.prototype.extend = function (_) {
        return new Nothing();
    };
    /**
     * eq returns true if compared to another Nothing instance.
     */
    Nothing.prototype.eq = function (m) {
        return m instanceof Nothing;
    };
    /**
     * orJust converts a Nothing<A> to a Just
     * using the value from the provided function.
     */
    Nothing.prototype.orJust = function (f) {
        return new Just(f());
    };
    /**
     * orElse allows an alternative Maybe value
     * to be provided since this one is Nothing<A>.
     */
    Nothing.prototype.orElse = function (f) {
        return f();
    };
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.isJust = function () {
        return false;
    };
    /**
     * get throws an error because there
     * is nothing here to get.
     */
    Nothing.prototype.get = function () {
        throw new TypeError('Cannot get a value from Nothing!');
    };
    return Nothing;
}());
exports.Nothing = Nothing;
/**
 * Just represents the presence of a usable value.
 */
var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    /**
     * map over the value present in the Just.
     */
    Just.prototype.map = function (f) {
        return new Just(f(this.value));
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Just.prototype.ap = function (mb) {
        var _this = this;
        return mb.map(function (f) { return f(_this.value); });
    };
    /**
     * of wraps a value in a Just.
     */
    Just.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain allows the sequencing of functions that return a Maybe.
     */
    Just.prototype.chain = function (f) {
        return f(this.value);
    };
    /**
     * alt will prefer the first Just encountered (this).
     */
    Just.prototype.alt = function (_) {
        return this;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Just.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend allows sequencing of Maybes with
     * functions that unwrap into non Maybe types.
     */
    Just.prototype.extend = function (f) {
        return new Just(f(this));
    };
    /**
     * eq tests the value of two Justs.
     */
    Just.prototype.eq = function (m) {
        return ((m instanceof Just) && (m.value === this.value));
    };
    /**
     * orJust returns this Just.
     */
    Just.prototype.orJust = function (_) {
        return this;
    };
    /**
     * orElse returns this Just
     */
    Just.prototype.orElse = function (_) {
        return this;
    };
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.isJust = function () {
        return true;
    };
    /**
     * get the value of this Just.
     */
    Just.prototype.get = function () {
        return this.value;
    };
    return Just;
}());
exports.Just = Just;
/**
 * of
 */
exports.of = function (a) { return new Just(a); };
/**
 * nothing convenience constructor
 */
exports.nothing = function () { return new Nothing(); };
/**
 * just convenience constructor
 */
exports.just = function (a) { return new Just(a); };
/**
 * fromNullable constructs a Maybe from a value that may be null.
 */
exports.fromNullable = function (a) { return a == null ?
    new Nothing() : new Just(a); };
/**
 * fromArray checks an array to see if it's empty
 *
 * Returns [[Nothing]] if it is, [[Just]] otherwise.
 */
exports.fromArray = function (a) {
    return (a.length === 0) ? new Nothing() : new Just(a);
};
/**
 * fromObject uses Object.keys to turn see if an object
 * has any own properties.
 */
exports.fromObject = function (o) {
    return Object.keys(o).length === 0 ? new Nothing() : new Just(o);
};
/**
 * fromString constructs Nothing<A> if the string is empty or Just<A> otherwise.
 */
exports.fromString = function (s) {
    return (s === '') ? new Nothing() : new Just(s);
};
/**
 * fromBoolean constructs Nothing if b is false, Just<A> otherwise
 */
exports.fromBoolean = function (b) {
    return (b === false) ? new Nothing() : new Just(b);
};
/**
 * fromNumber constructs Nothing if n is 0 Just<A> otherwise.
 */
exports.fromNumber = function (n) {
    return (n === 0) ? new Nothing() : new Just(n);
};
/**
 * fromNaN constructs Nothing if a value is not a number or
 * Just<A> otherwise.
 */
exports.fromNaN = function (n) {
    return isNaN(n) ? new Nothing() : new Just(n);
};

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The record module provides functions for treating ES objects as records.
 *
 * Some of the functions provided here are inherently unsafe (tsc will not
 * be able track integrity and may result in runtime errors if not used carefully.
 */
var array_1 = require("../array");
/**
 * assign polyfill.
 */
function assign(target) {
    var _varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        _varArgs[_i - 1] = arguments[_i];
    }
    if (target == null)
        throw new TypeError('Cannot convert undefined or null to object');
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                    to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
}
exports.assign = assign;
/**
 * isRecord tests whether a value is a record.
 *
 * This is a typeof check that excludes arrays.
 *
 * Unsafe.
 */
exports.isRecord = function (value) {
    return (typeof value === 'object') && (!Array.isArray(value));
};
/**
 * keys produces a list of property names from a Record.
 */
exports.keys = function (value) { return Object.keys(value); };
/**
 * map over a Record's properties producing a new record.
 *
 * The order of keys processed is not guaranteed.
 */
exports.map = function (o, f) {
    return exports.keys(o).reduce(function (p, k) {
        var _a;
        return exports.merge(p, (_a = {}, _a[k] = f(o[k], k, o), _a));
    }, {});
};
/**
 * reduce a Record's keys to a single value.
 *
 * The initial value (accum) must be supplied to avoid errors when
 * there are no properites on the Record.
 * The order of keys processed is not guaranteed.
 */
exports.reduce = function (o, accum, f) {
    return exports.keys(o).reduce(function (p, k) { return f(p, o[k], k); }, accum);
};
/**
 * merge two objects into one.
 *
 * The return value's type is the product of the two types supplied.
 * This function may be unsafe.
 */
exports.merge = function (left, right) { return assign({}, left, right); };
/**
 * merge3 merges 3 records into one.
 */
exports.merge3 = function (a, b, c) { return assign({}, a, b, c); };
/**
 * merge4 merges 4 records into one.
 */
exports.merge4 = function (a, b, c, d) {
    return assign({}, a, b, c, d);
};
/**
 * merge5 merges 5 records into one.
 */
exports.merge5 = function (a, b, c, d, e) { return assign({}, a, b, c, d, e); };
/**
 * rmerge merges 2 records recursively.
 *
 * This function may be unsafe.
 */
exports.rmerge = function (left, right) {
    return exports.reduce(right, left, deepMerge);
};
/**
 * rmerge3 merges 3 records recursively.
 */
exports.rmerge3 = function (r, s, t) {
    return [s, t]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
/**
 * rmerge4 merges 4 records recursively.
 */
exports.rmerge4 = function (r, s, t, u) {
    return [s, t, u]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
/**
 * rmerge5 merges 5 records recursively.
 */
exports.rmerge5 = function (r, s, t, u, v) {
    return [s, t, u, v]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
var deepMerge = function (pre, curr, key) {
    var _a, _b;
    return exports.isRecord(curr) ?
        exports.merge(pre, (_a = {},
            _a[key] = exports.isRecord(pre[key]) ?
                exports.rmerge(pre[key], curr) :
                curr,
            _a)) :
        exports.merge(pre, (_b = {}, _b[key] = curr, _b));
};
/**
 * exclude removes the specified properties from a Record.
 */
exports.exclude = function (o, keys) {
    var list = Array.isArray(keys) ? keys : [keys];
    return exports.reduce(o, {}, function (p, c, k) {
        var _a;
        return list.indexOf(k) > -1 ? p : exports.merge(p, (_a = {}, _a[k] = c, _a));
    });
};
/**
 * partition a Record into two sub-records using a separating function.
 *
 * This function produces an array where the first element is a record
 * of passing values and the second the failing values.
 */
exports.partition = function (r, f) {
    return exports.reduce(r, [{}, {}], function (_a, c, k) {
        var yes = _a[0], no = _a[1];
        var _b, _c;
        return f(c, k, r) ?
            [exports.merge(yes, (_b = {}, _b[k] = c, _b)), no] :
            [yes, exports.merge(no, (_c = {}, _c[k] = c, _c))];
    });
};
/**
 * group the properties of a Record into another Record using a grouping
 * function.
 */
exports.group = function (r, f) {
    return exports.reduce(r, {}, function (p, c, k) {
        var _a, _b, _c;
        var g = f(c, k, r);
        return exports.merge(p, (_a = {},
            _a[g] = exports.isRecord(p[g]) ?
                exports.merge(p[g], (_b = {}, _b[k] = c, _b)) : (_c = {}, _c[k] = c, _c),
            _a));
    });
};
/**
 * values returns a shallow array of the values of a record.
 */
exports.values = function (r) {
    return exports.reduce(r, [], function (p, c) { return array_1.concat(p, c); });
};
/**
 * contains indicates whether a Record has a given key.
 */
exports.contains = function (r, key) {
    return Object.hasOwnProperty.call(r, key);
};
/**
 * clone a Record.
 *
 * Breaks references and deep clones arrays.
 * This function should only be used on Records or objects that
 * are not class instances.
 */
exports.clone = function (r) {
    return exports.reduce(r, {}, function (p, c, k) { p[k] = _clone(c); return p; });
};
var _clone = function (a) {
    if (Array.isArray(a))
        return a.map(_clone);
    else if (typeof a === 'object')
        return exports.clone(a);
    else
        return a;
};

},{"../array":18}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This module provides a syntax and associated functions for
 * getting and setting values on ES objects easily.
 *
 * Given a path, a value can either be retrieved or set on an object.
 *
 * The path syntax follows typical ES dot notation, bracket notation or a mixture
 * of both.
 *
 * Note that quotes are not used when describing a path via bracket notation.
 *
 * If you need to use a dot or square brackets in your paths, prefix them with
 * the "\" (backslash) character.
 */
/** imports **/
var maybe_1 = require("../maybe");
var _1 = require("./");
var TOKEN_DOT = '.';
var TOKEN_BRACKET_LEFT = '[';
var TOKEN_BRACKET_RIGHT = ']';
var TOKEN_ESCAPE = '\\';
/**
 * tokenize a path into a list of sequential property names.
 */
exports.tokenize = function (str) {
    var i = 0;
    var buf = '';
    var curr = '';
    var next = '';
    var tokens = [];
    while (i < str.length) {
        curr = str[i];
        next = str[i + 1];
        if (curr === TOKEN_ESCAPE) {
            //escape sequence
            buf = "" + buf + next;
            i++;
        }
        else if (curr === TOKEN_DOT) {
            if (buf !== '')
                tokens.push(buf); //recognize a path and push a new token
            buf = '';
        }
        else if ((curr === TOKEN_BRACKET_LEFT) &&
            next === TOKEN_BRACKET_RIGHT) {
            //intercept empty bracket paths
            i++;
        }
        else if (curr === TOKEN_BRACKET_LEFT) {
            var bracketBuf = '';
            var firstDot = -1;
            var firstDotBuf = '';
            i++;
            while (true) {
                //everything between brackets is treated as a path
                //if no closing bracket is found, we back track to the first dot
                //if there is no dot the whole buffer is treated as a path
                curr = str[i];
                next = str[i + 1];
                if ((curr === TOKEN_BRACKET_RIGHT) &&
                    (next === TOKEN_BRACKET_RIGHT)) {
                    //escaped right bracket
                    bracketBuf = "" + bracketBuf + TOKEN_BRACKET_RIGHT;
                    i++;
                }
                else if (curr === TOKEN_BRACKET_RIGHT) {
                    //successfully tokenized the path
                    if (buf !== '')
                        tokens.push(buf); //save the previous path
                    tokens.push(bracketBuf); //save the current path
                    buf = '';
                    break;
                }
                else if (curr == null) {
                    //no closing bracket found and we ran out of string to search
                    if (firstDot !== -1) {
                        //backtrack to the first dot encountered
                        i = firstDot;
                        //save the paths so far
                        tokens.push("" + buf + TOKEN_BRACKET_LEFT + firstDotBuf);
                        buf = '';
                        break;
                    }
                    else {
                        //else if no dots were found treat the current buffer
                        // and rest of the string as part of one path.
                        buf = "" + buf + TOKEN_BRACKET_LEFT + bracketBuf;
                        break;
                    }
                }
                if ((curr === TOKEN_DOT) && (firstDot === -1)) {
                    //take note of the location and tokens between 
                    //the opening bracket and first dot.
                    //If there is no closing bracket, we use this info to
                    //lex properly.
                    firstDot = i;
                    firstDotBuf = bracketBuf;
                }
                bracketBuf = "" + bracketBuf + curr;
                i++;
            }
        }
        else {
            buf = "" + buf + curr;
        }
        i++;
    }
    if ((buf.length > 0))
        tokens.push(buf);
    return tokens;
};
/**
 * unsafeGet retrieves a value at the specified path
 * on any ES object.
 *
 * This function does not check if getting the value succeeded or not.
 */
exports.unsafeGet = function (path, src) {
    var toks = exports.tokenize(path);
    var head = src[toks.shift()];
    return toks.reduce(function (p, c) { return (p == null) ? p : p[c]; }, head);
};
/**
 * get a value from a Record given its path safely.
 */
exports.get = function (path, src) {
    return maybe_1.fromNullable(exports.unsafeGet(path, src));
};
/**
 * set sets a value on an object given a path.
 */
exports.set = function (p, v, r) {
    var toks = exports.tokenize(p);
    return _set(r, v, toks);
};
var _set = function (r, value, toks) {
    var o;
    if (toks.length === 0)
        return value;
    o = _1.isRecord(r) ? _1.clone(r) : {};
    o[toks[0]] = _set(o[toks[0]], value, toks.slice(1));
    return o;
};
/**
 * escape a path so that occurences of dots are not interpreted as paths.
 *
 * This function escapes dots and dots only.
 */
exports.escape = function (p) {
    var i = 0;
    var buf = '';
    var curr = '';
    while (i < p.length) {
        curr = p[i];
        if ((curr === TOKEN_ESCAPE) || (curr === TOKEN_DOT))
            buf = "" + buf + TOKEN_ESCAPE + curr;
        else
            buf = "" + buf + curr;
        i++;
    }
    return buf;
};
/**
 * unescape a path that has been previously escaped.
 */
exports.unescape = function (p) {
    var i = 0;
    var curr = '';
    var next = '';
    var buf = '';
    while (i < p.length) {
        curr = p[i];
        next = p[i + 1];
        if (curr === TOKEN_ESCAPE) {
            buf = "" + buf + next;
            i++;
        }
        else {
            buf = "" + buf + curr;
        }
        i++;
    }
    return buf;
};
/**
 * escapeRecord escapes each property of a record recursively.
 */
exports.escapeRecord = function (r) {
    return _1.reduce(r, {}, function (p, c, k) {
        if (typeof c === 'object')
            p[exports.escape(k)] = exports.escapeRecord(c);
        else
            p[exports.escape(k)] = c;
        return p;
    });
};
/**
 * unescapeRecord unescapes each property of a record recursively.
 */
exports.unescapeRecord = function (r) {
    return _1.reduce(r, {}, function (p, c, k) {
        if (_1.isRecord(c))
            p[exports.unescape(k)] = exports.unescapeRecord(c);
        else
            p[exports.unescape(k)] = c;
        return p;
    });
};
/**
 * flatten an object into a Record where each key is a path to a non-complex
 * value or array.
 *
 * If any of the paths contain dots, they will be escaped.
 */
exports.flatten = function (r) {
    return (flatImpl('')({})(r));
};
var flatImpl = function (pfix) { return function (prev) {
    return function (r) {
        return _1.reduce(r, prev, function (p, c, k) {
            var _a;
            return _1.isRecord(c) ?
                (flatImpl(prefix(pfix, k))(p)(c)) :
                _1.merge(p, (_a = {}, _a[prefix(pfix, k)] = c, _a));
        });
    };
}; };
var prefix = function (pfix, key) { return (pfix === '') ?
    exports.escape(key) : pfix + "." + exports.escape(key); };
/**
 * unflatten a flattened Record so that any nested paths are expanded
 * to their full representation.
 */
exports.unflatten = function (r) {
    return _1.reduce(r, {}, function (p, c, k) { return exports.set(k, c, p); });
};

},{"../maybe":21,"./":22}],24:[function(require,module,exports){
"use strict";
/**
 *  Common functions used to manipulate strings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** imports */
var path_1 = require("./record/path");
var record_1 = require("./record");
;
/**
 * startsWith polyfill.
 */
exports.startsWith = function (str, search, pos) {
    if (pos === void 0) { pos = 0; }
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
};
/**
 * endsWith polyfill.
 */
exports.endsWith = function (str, search, this_len) {
    if (this_len === void 0) { this_len = str.length; }
    return (this_len === undefined || this_len > str.length) ?
        this_len = str.length :
        str.substring(this_len - search.length, this_len) === search;
};
/**
 * contains uses String#indexOf to determine if a substring occurs
 * in a string.
 */
exports.contains = function (str, match) {
    return (str.indexOf(match) > -1);
};
/**
 * camelCase transforms a string into CamelCase.
 */
exports.camelCase = function (str) {
    return [str[0].toUpperCase()]
        .concat(str
        .split(str[0])
        .slice(1)
        .join(str[0]))
        .join('')
        .replace(/(\-|_|\s)+(.)?/g, function (_, __, c) {
        return (c ? c.toUpperCase() : '');
    });
};
/**
 * capitalize a string.
 *
 * Note: spaces are treated as part of the string.
 */
exports.capitalize = function (str) {
    return "" + str[0].toUpperCase() + str.slice(1);
};
/**
 * uncapitalize a string.
 *
 * Note: spaces are treated as part of the string.
 */
exports.uncapitalize = function (str) {
    return "" + str[0].toLowerCase() + str.slice(1);
};
var interpolateDefaults = {
    start: '\{',
    end: '\}',
    regex: '([\\w\$\.\-]+)',
    leaveMissing: true,
    applyFunctions: false
};
/**
 * interpolate a template string replacing variable paths with values
 * in the data object.
 */
exports.interpolate = function (str, data, opts) {
    if (opts === void 0) { opts = {}; }
    var options = record_1.assign({}, interpolateDefaults, opts);
    var reg = new RegExp("" + options.start + options.regex + options.end, 'g');
    return str.replace(reg, function (_, k) {
        return path_1.get(k, data)
            .map(function (v) {
            if (typeof v === 'function')
                return v(k);
            else
                return '' + v;
        })
            .orJust(function () {
            if (opts.leaveMissing)
                return k;
            else
                return '';
        })
            .get();
    });
};

},{"./record":22,"./record/path":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * isMultipleOf tests whether the Integer 'y' is a multiple of x.
 */
exports.isMultipleOf = function (x, y) { return ((y % x) === 0); };

},{}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stringify = require("json-stringify-safe");
var deepEqual = require("deep-equal");
/**
 * Positive value matcher.
 */
var Positive = /** @class */ (function () {
    function Positive(value, throwErrors) {
        this.value = value;
        this.throwErrors = throwErrors;
        this.prefix = 'must';
    }
    Object.defineProperty(Positive.prototype, "be", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "not", {
        get: function () {
            return new Negative(this.value, this.throwErrors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "instance", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Positive.prototype.assert = function (ok, condition) {
        if (!ok) {
            if (this.throwErrors)
                throw new Error("The value " + exports.toString(this.value) + " " + this.prefix + " " +
                    (condition + "!"));
            return new Failed(this.value, this.throwErrors);
        }
        return this;
    };
    Positive.prototype.of = function (cons) {
        return this.assert((this.value instanceof cons), "be instanceof " + cons.name);
    };
    Positive.prototype.object = function () {
        return this.assert(((typeof this.value === 'object') &&
            (this.value !== null)), 'be typeof object');
    };
    Positive.prototype.array = function () {
        return this.assert(Array.isArray(this.value), 'be an array');
    };
    Positive.prototype.string = function () {
        return this.assert((typeof this.value === 'string'), 'be typeof string');
    };
    Positive.prototype.number = function () {
        return this.assert((typeof this.value === 'number'), 'be typeof number');
    };
    Positive.prototype.boolean = function () {
        return this.assert((typeof this.value === 'boolean'), 'be typeof boolean');
    };
    Positive.prototype.true = function () {
        return this.assert((this.value === true), 'be true');
    };
    Positive.prototype.false = function () {
        return this.assert((this.value === false), 'be false');
    };
    Positive.prototype.null = function () {
        return this.assert(this.value === null, 'be null');
    };
    Positive.prototype.undefined = function () {
        return this.assert((this.value === undefined), 'be undefined');
    };
    Positive.prototype.equal = function (b) {
        return this.assert(this.value === b, "equal " + exports.toString(b));
    };
    Positive.prototype.equate = function (b) {
        return this.assert(deepEqual(this.value, b), "equate " + exports.toString(b));
    };
    Positive.prototype.throw = function (message) {
        var ok = false;
        try {
            this.value();
        }
        catch (e) {
            if (message != null) {
                ok = e.message === message;
            }
            else {
                ok = true;
            }
        }
        return this.assert(ok, "throw " + ((message != null) ? message : ''));
    };
    return Positive;
}());
exports.Positive = Positive;
/**
 * Negative value matcher.
 */
var Negative = /** @class */ (function (_super) {
    __extends(Negative, _super);
    function Negative() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = 'must not';
        return _this;
    }
    Negative.prototype.assert = function (ok, condition) {
        return _super.prototype.assert.call(this, !ok, condition);
    };
    Object.defineProperty(Negative.prototype, "not", {
        get: function () {
            return new Positive(this.value, this.throwErrors); // not not == true
        },
        enumerable: true,
        configurable: true
    });
    return Negative;
}(Positive));
exports.Negative = Negative;
/**
 * Failed matcher.
 */
var Failed = /** @class */ (function (_super) {
    __extends(Failed, _super);
    function Failed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Failed.prototype.assert = function (_, __) {
        return this;
    };
    return Failed;
}(Positive));
exports.Failed = Failed;
/**
 * @private
 */
exports.toString = function (value) {
    if (typeof value === 'function') {
        return value.name;
    }
    else if (value instanceof Date) {
        return value.toISOString();
    }
    else if (value instanceof RegExp) {
        return value.toString();
    }
    else if (typeof value === 'object') {
        if ((value.constructor !== Object) && (!Array.isArray(value)))
            return value.constructor.name;
        else
            return stringify(value);
    }
    return stringify(value);
};
/**
 * assert turns a value into a Matcher so it can be tested.
 *
 * The Matcher returned is positive and configured to throw
 * errors if any tests fail.
 */
exports.assert = function (value) { return new Positive(value, true); };

},{"deep-equal":27,"json-stringify-safe":30}],27:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":28,"./lib/keys.js":29}],28:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],29:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],30:[function(require,module,exports){
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],31:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],32:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

},{}],33:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":32,"./parse":34,"./stringify":35}],34:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }
        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'undefined' ? defaults.allowDots : !!options.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (typeof options.charset !== 'undefined' && options.charset !== 'utf-8' && options.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    if (typeof options.charset === 'undefined') {
        options.charset = defaults.charset;
    }

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":36}],35:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var formats = require('./formats');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? defaults.allowDots : !!options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    var charset = options.charset || defaults.charset;
    if (typeof options.charset !== 'undefined' && options.charset !== 'utf-8' && options.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

},{"./formats":32,"./utils":36}],36:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};

},{}],37:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var agent_1 = require("../../../../../lib/agent");
var memory_1 = require("../../../../../lib/cookie/container/memory");
var json_1 = require("../../../../../lib/agent/transform/json");
var multipart_1 = require("../../../../../lib/agent/transform/multipart");
var json_2 = require("../../../../../lib/agent/parser/json");
var xhr_1 = require("../../../../../lib/agent/transport/xhr");
var response_1 = require("../../../../../lib/response");
var host = process.env.HOST || 'http://localhost';
var port = process.env.PORT || '9999';
var newAgent = function (h) {
    if (h === void 0) { h = host + ":" + port; }
    return new agent_1.Agent(h, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: {}, context: {}, port: 80 }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []);
};
describe('xhr', function () {
    it('should make successful requests ', function () {
        var codes = [200, 201, 204];
        var expected = [response_1.Ok, response_1.Created, response_1.NoContent];
        var agent = newAgent();
        return future_1.toPromise(future_1.parallel(codes.map(function (code) { return agent.get("/status/" + code); }))
            .map(function (list) { return list.map(function (r, i) { return r instanceof expected[i]; }); }))
            .then(function (results) { return results.reduce(function (_, c) {
            assert_1.assert(c).equal(true);
            return c;
        }, true); });
    });
    it('should detect transport errors', function () {
        return future_1.toPromise(newAgent('hddp://example.com').get('/'))
            .catch(function (e) {
            assert_1.assert(e).be.instance.of(Error);
            assert_1.assert(e.message).equal('TransportError');
        });
    });
    it('should send the correct body', function () {
        var body = { "email": "me@email.com", "password": "password" };
        return future_1.toPromise(newAgent().post('/login', body)).
            then(function (res) {
            assert_1.assert(res.code).equal(200);
        });
    });
    it('should provide the correct body', function () {
        return future_1.toPromise(newAgent().get('/json'))
            .then(function (res) {
            assert_1.assert(res.body).equate({
                "a": true, "b": false, "c": 1, "d": "1"
            });
        });
    });
    it('should work with multiparts', function () {
        var fd = new FormData();
        var agent = newAgent()
            .setTransport(new xhr_1.XHRTransport('', new multipart_1.MultipartTransform(), new json_2.JSONParser()));
        fd.append('filename', 'somefile');
        fd.append('file', new Blob(['some file']));
        return future_1.toPromise(agent.post('/file', fd))
            .then(function (res) {
            assert_1.assert(res.code).equal(204);
        });
    });
});

}).call(this,require('_process'))
},{"../../../../../lib/agent":1,"../../../../../lib/agent/parser/json":2,"../../../../../lib/agent/transform/json":3,"../../../../../lib/agent/transform/multipart":4,"../../../../../lib/agent/transport/xhr":5,"../../../../../lib/cookie/container/memory":7,"../../../../../lib/response":12,"@quenk/noni/lib/control/monad/future":16,"@quenk/test/lib/assert":26,"_process":31}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var browser_1 = require("../../../lib/browser");
describe('browser', function () {
    describe('splitUrl', function () {
        it('should work with domain alone', function () {
            assert_1.assert(browser_1.splitUrl('localhost:8080')).equate([
                'localhost:8080',
                '/'
            ]);
        });
        it('should work with domain and path', function () {
            assert_1.assert(browser_1.splitUrl('localhost:8080/path/to')).equate([
                'localhost:8080',
                '/path/to'
            ]);
        });
        it('should work when the protocol is present', function () {
            assert_1.assert(browser_1.splitUrl('http://localhost/path/to')).equate([
                'localhost',
                '/path/to'
            ]);
            assert_1.assert(browser_1.splitUrl('http://localhost')).equate([
                'localhost',
                '/'
            ]);
        });
    });
});

},{"../../../lib/browser":6,"@quenk/test/lib/assert":26}],39:[function(require,module,exports){
require("./browser_test.js");
require("./agent/transport/xhr_test.js");

},{"./agent/transport/xhr_test.js":37,"./browser_test.js":38}]},{},[39]);
