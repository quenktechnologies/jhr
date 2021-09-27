(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.defaultOptions = void 0;
var util = require("../util");
var record_1 = require("@quenk/noni/lib/data/record");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var request_1 = require("../request");
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
    Agent.prototype.head = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Head(path, params, headers));
    };
    Agent.prototype.get = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Get(path, params, headers));
    };
    Agent.prototype.post = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Post(path, body, headers));
    };
    Agent.prototype.put = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Put(path, body, headers));
    };
    Agent.prototype.patch = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.send(new request_1.Patch(path, body, headers));
    };
    Agent.prototype.delete = function (path, body, headers) {
        return this.send(new request_1.Delete(path, body, headers));
    };
    Agent.prototype.send = function (req) {
        var _a = this, host = _a.host, cookies = _a.cookies, headers = _a.headers, transport = _a.transport, plugins = _a.plugins;
        var options = (0, record_1.rmerge3)(exports.defaultOptions, this.options, req.options);
        var port = options.port;
        var method = req.method, params = req.params, body = req.body;
        var tags = options.tags, context = options.context, ttl = options.ttl;
        var path = util.urlFromString((0, string_1.interpolate)(req.path, context), params);
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
        }, (0, future_1.pure)(ctx));
        return ft.chain(function (ctx) { return transport.send(ctx); })
            .chain(function (r) {
            return plugins.reduce(function (f, p) {
                return f.chain(function (res) { return p.afterResponse(res); });
            }, (0, future_1.pure)(r));
        });
    };
    return Agent;
}());
exports.Agent = Agent;

},{"../request":14,"../util":18,"@quenk/noni/lib/control/monad/future":21,"@quenk/noni/lib/data/record":28,"@quenk/noni/lib/data/string":30}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var error_1 = require("@quenk/noni/lib/control/error");
var either_1 = require("@quenk/noni/lib/data/either");
var defaultOptions = {
    prefix: /^\)\]\}',?\n/,
    lenient: false
};
/**
 * JSONParser parse a string representing a request body into an object.
 *
 * The optional options argument can be specified to modify its behaviour.
 */
var JSONParser = /** @class */ (function () {
    function JSONParser(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.responseType = '';
        this.accepts = 'application/json';
        this.opts = (0, record_1.merge)(defaultOptions, this.options);
    }
    JSONParser.prototype.apply = function (body) {
        var _a = this.opts, prefix = _a.prefix, lenient = _a.lenient;
        var str = body.replace(prefix, '');
        var eresult = (0, error_1.attempt)(function () { return JSON.parse(str); });
        return (eresult.isLeft() && lenient) ? (0, either_1.right)({}) : eresult;
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;

},{"@quenk/noni/lib/control/error":20,"@quenk/noni/lib/data/either":25,"@quenk/noni/lib/data/record":28}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRFProtectionPlugin = exports.DEFAULT_CSRF_HEADER_NAME = exports.DEFAULT_CSRF_COOKIE_NAME = void 0;
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
exports.DEFAULT_CSRF_COOKIE_NAME = 'xsrf-token';
exports.DEFAULT_CSRF_HEADER_NAME = 'x-xsrf-token';
/**
 * CSRFProtectionPlugin
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
var CSRFProtectionPlugin = /** @class */ (function () {
    function CSRFProtectionPlugin(cookie, header) {
        if (cookie === void 0) { cookie = exports.DEFAULT_CSRF_COOKIE_NAME; }
        if (header === void 0) { header = exports.DEFAULT_CSRF_HEADER_NAME; }
        this.cookie = cookie;
        this.header = header;
    }
    CSRFProtectionPlugin.prototype.beforeRequest = function (ctx) {
        var _a;
        var mvalue = ctx.cookies.getCookie(this.cookie);
        if (mvalue.isJust())
            ctx.headers = (0, record_1.merge)(ctx.headers, (_a = {},
                _a[this.header] = mvalue.get().value,
                _a));
        return (0, future_1.pure)(ctx);
    };
    CSRFProtectionPlugin.prototype.afterResponse = function (r) {
        return (0, future_1.pure)(r);
    };
    return CSRFProtectionPlugin;
}());
exports.CSRFProtectionPlugin = CSRFProtectionPlugin;

},{"@quenk/noni/lib/control/monad/future":21,"@quenk/noni/lib/data/record":28}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONTransform = void 0;
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
        return (0, error_1.attempt)(function () {
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

},{"../../util":18,"@quenk/noni/lib/control/error":20}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipartTransform = void 0;
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * MultipartTransform transforms data into the multi part format.
 */
var MultipartTransform = /** @class */ (function () {
    function MultipartTransform() {
        this.type = 'multipart/form-data';
    }
    MultipartTransform.prototype.apply = function (body) {
        return (0, either_1.right)(body);
    };
    return MultipartTransform;
}());
exports.MultipartTransform = MultipartTransform;

},{"@quenk/noni/lib/data/either":25}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XHRTransport = void 0;
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
        var host = ctx.host, port = ctx.port, path = ctx.path, method = ctx.method, body = ctx.body, headers = ctx.headers, options = ctx.options, cookies = ctx.cookies;
        var xhr = new XMLHttpRequest();
        var portNumer = (port && (port !== 80) && (port !== 443)) ? ":" + port : '';
        var url = "" + host + portNumer + (path[0] === '/' ? '' : '/') + path;
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
                cookies.setCookies(document.cookie.split(';'));
                var exceptRes = parser.apply(xhr.response);
                if (exceptRes.isLeft()) {
                    s.onError(new Error(exceptRes.takeLeft().message));
                }
                else {
                    var r = (0, response_1.createResponse)(xhr.status, exceptRes.takeRight(), (0, header_1.fromString)(xhr.getAllResponseHeaders()), options);
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

},{"../../header":12,"../../headers":13,"../../request/method":15,"../../response":16,"@quenk/noni/lib/control/monad/future":21}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.createAgent = exports.splitUrl = void 0;
var document_1 = require("./cookie/container/document");
var json_1 = require("./agent/transform/json");
var json_2 = require("./agent/parser/json");
var xhr_1 = require("./agent/transport/xhr");
var request_1 = require("./request");
var csrf_1 = require("./agent/plugin/csrf");
var agent_1 = require("./agent");
var HTTP = 'http://';
var HTTPS = 'https://';
/**
 * @private
 */
var splitUrl = function (url) {
    var split = url.split(HTTP).join('').split(HTTPS).join('').split('/');
    if ((split.length === 1) || ((split.length === 2) && (split[1] === '')))
        return [split[0], '/'];
    return [split[0], '/' + split.slice(1).join('/')];
};
exports.splitUrl = splitUrl;
/**
 * createAgent produces a new default Agent for use in the browser.
 */
var createAgent = function (host, port) {
    if (host === void 0) { host = getHost(); }
    if (port === void 0) { port = getPort(); }
    return new agent_1.Agent(host, {}, document_1.DocumentContainer.create(), { ttl: 0, tags: {}, context: {}, port: port }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser({ lenient: true })), [new csrf_1.CSRFProtectionPlugin()]);
};
exports.createAgent = createAgent;
var getHost = function () {
    return window.location.protocol + "//" + window.location.hostname;
};
var getPort = function () {
    var port = window.location.port;
    return Number(((port === '') || (port == null)) ? 80 : port);
};
/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
var get = function (url, params, headers) {
    if (params === void 0) { params = {}; }
    if (headers === void 0) { headers = {}; }
    var _a = (0, exports.splitUrl)(url), host = _a[0], path = _a[1];
    return (0, exports.createAgent)(host).send(new request_1.Get(path, params, headers));
};
exports.get = get;

},{"./agent":1,"./agent/parser/json":2,"./agent/plugin/csrf":3,"./agent/transform/json":4,"./agent/transport/xhr":6,"./cookie/container/document":8,"./request":14}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentContainer = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var __1 = require("../");
/**
 * DocumentContainer uses `document.cookie` as its backing store.
 *
 * This Container is meant to be used in the browser typically with the
 * XHRTransport.
 */
var DocumentContainer = /** @class */ (function () {
    function DocumentContainer(store, cookies) {
        if (store === void 0) { store = document; }
        if (cookies === void 0) { cookies = {}; }
        this.store = store;
        this.cookies = cookies;
    }
    DocumentContainer.create = function (store) {
        if (store === void 0) { store = document; }
        return new DocumentContainer(store, (0, __1.fromCookieHeader)(store.cookie));
    };
    DocumentContainer.prototype.getCookies = function () {
        return (0, record_1.make)(this.cookies);
    };
    DocumentContainer.prototype.getCookie = function (name) {
        return (0, __1.getCookieByName)(this.cookies, name);
    };
    /**
     * setCookies ignores the provided cookie string and ALWAYS reads from
     * the document.
     */
    DocumentContainer.prototype.setCookies = function (_) {
        this.cookies = (0, __1.fromCookieHeader)(this.store.cookie);
        return this;
    };
    return DocumentContainer;
}());
exports.DocumentContainer = DocumentContainer;

},{"../":10,"@quenk/noni/lib/data/record":28}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryContainer = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var array_1 = require("@quenk/noni/lib/data/array");
var parser_1 = require("../parser");
var __1 = require("../");
/**
 * MemoryContainer stores cookie values in memory.
 */
var MemoryContainer = /** @class */ (function () {
    function MemoryContainer(cookies) {
        if (cookies === void 0) { cookies = {}; }
        this.cookies = cookies;
    }
    /**
     * create a new MemoryContainer instance.
     *
     * An array of Set-Cookie header values can be passed to intialize the
     * internal store.
     */
    MemoryContainer.create = function (headers) {
        if (headers === void 0) { headers = []; }
        return new MemoryContainer((0, __1.fromList)((0, array_1.compact)(headers.map(parser_1.parseCookie))));
    };
    MemoryContainer.prototype.getCookie = function (name) {
        return (0, __1.getCookieByName)(this.cookies, name);
    };
    MemoryContainer.prototype.getCookies = function () {
        return (0, record_1.make)(this.cookies);
    };
    MemoryContainer.prototype.setCookies = function (str) {
        var unfiltered = str.map(function (s) { return (0, parser_1.parseCookie)(s); });
        var filtered = unfiltered.filter(function (c) { return c != null; });
        var cookies = (0, record_1.merge)(this.cookies, (0, __1.fromList)(filtered));
        var now = new Date();
        this.cookies = (0, record_1.filter)(cookies, function (c) { return willKeep(now, c); });
        return this;
    };
    return MemoryContainer;
}());
exports.MemoryContainer = MemoryContainer;
var willKeep = function (now, c) {
    if (c.maxAge)
        return ((now.getTime() / 1000) - c.created.getTime()) <= c.maxAge;
    else if (c.expires)
        return now <= c.expires;
    else
        return true;
};

},{"../":10,"../parser":11,"@quenk/noni/lib/data/array":24,"@quenk/noni/lib/data/record":28}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCookieHeader = exports.getCookieByName = exports.fromList = exports.fromCookieHeader = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
/**
 * fromCookieHeader creates a Cookies map from a string compliant with the
 * value of the Cookie header.
 *
 * Note: Only the name and value is available in this header and as a result
 * only those fields will be available in the individual Cookie objects.
 */
var fromCookieHeader = function (str) {
    var rec = (0, record_1.make)();
    var cookies = str.split(';');
    var created = new Date();
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var cookieLength = cookie.length;
        var delimIdx = cookie.indexOf('=');
        delimIdx = delimIdx < 0 ? cookieLength : delimIdx;
        var name_1 = decodeURIComponent(cookie.substring(0, delimIdx)
            .replace(/^\s+|\s+$/g, ''));
        var value = decodeURIComponent(cookie.substring(delimIdx + 1, cookieLength));
        var c = { name: name_1, value: value, created: created };
        rec[getPath(c)] = c;
    }
    return rec;
};
exports.fromCookieHeader = fromCookieHeader;
/**
 * fromList constructs a Cookies object from a list of Cookie objects.
 */
var fromList = function (list) {
    return list.reduce(function (p, c) {
        var _a;
        return (0, record_1.merge)(p, (_a = {}, _a[getPath(c)] = c, _a));
    }, {});
};
exports.fromList = fromList;
var getPath = function (c) { return [c.name, c.domain, c.path].join(';;'); };
/**
 * getCookieByName retrieves a Cookie object from a map using its name.
 *
 * The path is not considered by this function.
 */
var getCookieByName = function (store, name) {
    return (0, record_1.pickValue)(store, function (c) { return c.name === name; });
};
exports.getCookieByName = getCookieByName;
/**
 * toCookieHeader converts a Cookies map into a string suitable for use as the
 * value of the Cookie header.
 */
var toCookieHeader = function (store) {
    return (0, record_1.mapTo)(store, function (c) { return c.name + "=" + c.value; }).join('; ');
};
exports.toCookieHeader = toCookieHeader;

},{"@quenk/noni/lib/data/record":28}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
var CONTROL_CHARS = /[\x00-\x1F]/;
// From Chromium // '\r', '\n' and '\0' should be treated as a terminator in
// the "relaxed" mode, see:
// https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60
var TERMINATORS = ["\n", "\r", "\0"];
// date-time parsing constants (RFC6265 S5.1.1)
var DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
var monthNums = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
};
/*
 * Parses a Natural number (i.e., non-negative integer) with either the
 *    <min>*<max>DIGIT ( non-digit *OCTET )
 * or
 *    <min>*<max>DIGIT
 * grammar (RFC6265 S5.1.1).
 *
 * The "trailingOK" boolean controls if the grammar accepts a
 * "( non-digit *OCTET )" trailer.
 */
function parseDigits(token, minDigits, maxDigits, trailingOK) {
    var count = 0;
    while (count < token.length) {
        var c = token.charCodeAt(count);
        // "non-digit = %x00-2F / %x3A-FF"
        if (c <= 0x2f || c >= 0x3a) {
            break;
        }
        count++;
    }
    // constrain to a minimum and maximum number of digits.
    if (count < minDigits || count > maxDigits) {
        return null;
    }
    if (!trailingOK && count != token.length) {
        return null;
    }
    return parseInt(token.substr(0, count), 10);
}
function parseTime(token) {
    var parts = token.split(":");
    var result = [0, 0, 0];
    /* RF6256 S5.1.1:
     *      time            = hms-time ( non-digit *OCTET )
     *      hms-time        = time-field ":" time-field ":" time-field
     *      time-field      = 1*2DIGIT
     */
    if (parts.length !== 3) {
        return null;
    }
    for (var i = 0; i < 3; i++) {
        // "time-field" must be strictly "1*2DIGIT", HOWEVER, "hms-time" can be
        // followed by "( non-digit *OCTET )" so therefore the last time-field 
        // can have a trailer
        var trailingOK = i == 2;
        var num = parseDigits(parts[i], 1, 2, trailingOK);
        if (num === null) {
            return null;
        }
        result[i] = num;
    }
    return result;
}
function parseMonth(token) {
    token = String(token)
        .substr(0, 3)
        .toLowerCase();
    var num = monthNums[token];
    return num >= 0 ? num : null;
}
/*
 * RFC6265 S5.1.1 date parser (see RFC for full grammar)
 */
function parseDate(str) {
    if (!str) {
        return;
    }
    /* RFC6265 S5.1.1:
     * 2. Process each date-token sequentially in the order the date-tokens
     * appear in the cookie-date
     */
    var tokens = str.split(DATE_DELIM);
    if (!tokens) {
        return;
    }
    var hour = null;
    var minute = null;
    var second = null;
    var dayOfMonth = null;
    var month = null;
    var year = null;
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i].trim();
        if (!token.length) {
            continue;
        }
        var result = void 0;
        /* 2.1. If the found-time flag is not set and the token matches the time
         * production, set the found-time flag and set the hour- value,
         * minute-value, and second-value to the numbers denoted by the digits
         * in the date-token, respectively.  Skip the remaining sub-steps and
         * continue to the next date-token.
         */
        if (second === null) {
            result = parseTime(token);
            if (result) {
                hour = result[0];
                minute = result[1];
                second = result[2];
                continue;
            }
        }
        /* 2.2. If the found-day-of-month flag is not set and the date-token
         * matches the day-of-month production, set the found-day-of- month flag
         * and set the day-of-month-value to the number denoted by the
         * date-token. Skip the remaining sub-steps and continue to the next
         * date-token.
         */
        if (dayOfMonth === null) {
            // "day-of-month = 1*2DIGIT ( non-digit *OCTET )"
            result = parseDigits(token, 1, 2, true);
            if (result !== null) {
                dayOfMonth = result;
                continue;
            }
        }
        /* 2.3. If the found-month flag is not set and the date-token matches the
         * month production, set the found-month flag and set the month-value to
         * the month denoted by the date-token.  Skip the remaining sub-stepsa
         * and continue to the next date-token.
         */
        if (month === null) {
            result = parseMonth(token);
            if (result !== null) {
                month = result;
                continue;
            }
        }
        /* 2.4. If the found-year flag is not set and the date-token matches the
         * year production, set the found-year flag and set the year-value to
         * the number denoted by the date-token.  Skip the remaining sub-steps
         * and continue to the next date-token.
         */
        if (year === null) {
            // "year = 2*4DIGIT ( non-digit *OCTET )"
            result = parseDigits(token, 2, 4, true);
            if (result !== null) {
                year = result;
                /* From S5.1.1:
                 * 3.  If the year-value is greater than or equal to 70 and less
                 * than or equal to 99, increment the year-value by 1900.
                 * 4.  If the year-value is greater than or equal to 0 and less
                 * than or equal to 69, increment the year-value by 2000.
                 */
                if (year >= 70 && year <= 99) {
                    year += 1900;
                }
                else if (year >= 0 && year <= 69) {
                    year += 2000;
                }
            }
        }
    }
    /* RFC 6265 S5.1.1
     * "5. Abort these steps and fail to parse the cookie-date if:
     *     *  at least one of the found-day-of-month, found-month, found-
     *        year, or found-time flags is not set,
     *     *  the day-of-month-value is less than 1 or greater than 31,
     *     *  the year-value is less than 1601,
     *     *  the hour-value is greater than 23,
     *     *  the minute-value is greater than 59, or
     *     *  the second-value is greater than 59.
     *     (Note that leap seconds cannot be represented in this syntax.)"
     *
     * So, in order as above:
     */
    if (dayOfMonth === null ||
        month === null ||
        year === null ||
        second === null ||
        dayOfMonth < 1 ||
        dayOfMonth > 31 ||
        year < 1601 ||
        hour > 23 ||
        minute > 59 ||
        second > 59) {
        return;
    }
    return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
}
function trimTerminator(str) {
    if (str === '')
        return str;
    for (var t = 0; t < TERMINATORS.length; t++) {
        var terminatorIdx = str.indexOf(TERMINATORS[t]);
        if (terminatorIdx !== -1) {
            str = str.substr(0, terminatorIdx);
        }
    }
    return str;
}
function parseCookiePair(cookiePair, looseMode) {
    if (looseMode === void 0) { looseMode = false; }
    cookiePair = trimTerminator(cookiePair);
    var firstEq = cookiePair.indexOf("=");
    if (looseMode) {
        if (firstEq === 0) {
            // '=' is immediately at start
            cookiePair = cookiePair.substr(1);
            firstEq = cookiePair.indexOf("="); // might still need to split on '='
        }
    }
    else {
        // non-loose mode
        if (firstEq <= 0) {
            // no '=' or is at start
            return; // needs to have non-empty "cookie-name"
        }
    }
    var cookieName, cookieValue;
    if (firstEq <= 0) {
        cookieName = "";
        cookieValue = cookiePair.trim();
    }
    else {
        cookieName = cookiePair.substr(0, firstEq).trim();
        cookieValue = cookiePair.substr(firstEq + 1).trim();
    }
    if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
        return;
    }
    return { name: cookieName, value: cookieValue, created: new Date() };
}
/**
 * parseCookie parses a string containing a single cookie into a Cookie
 * object.
 *
 * If the string cannot be properly parsed, undefined is returned.
 */
function parseCookie(str) {
    str = String(str).trim();
    // We use a regex to parse the "name-value-pair" part of S5.2
    var firstSemi = str.indexOf(";"); // S5.2 step 1
    var cookiePair = firstSemi === -1 ? str : str.substr(0, firstSemi);
    var c = parseCookiePair(cookiePair);
    if (!c) {
        return;
    }
    if (firstSemi === -1) {
        return c;
    }
    // S5.2.3 "unparsed-attributes consist of the remainder of the set-cookie-string
    // (including the %x3B (";") in question)." plus later on in the same section
    // "discard the first ";" and trim".
    var unparsed = str.slice(firstSemi + 1).trim();
    // "If the unparsed-attributes string is empty, skip the rest of these
    // steps."
    if (unparsed.length === 0) {
        return c;
    }
    /*
     * S5.2 says that when looping over the items "[p]rocess the attribute-name
     * and attribute-value according to the requirements in the following
     * subsections" for every item.  Plus, for many of the individual attributes
     * in S5.3 it says to use the "attribute-value of the last attribute in the
     * cookie-attribute-list".  Therefore, in this implementation, we overwrite
     * the previous value.
     */
    var cookie_avs = unparsed.split(";");
    while (cookie_avs.length > 0) {
        var av = cookie_avs.shift().trim();
        if (av.length === 0) {
            // happens if ";;" appears
            continue;
        }
        var av_sep = av.indexOf("=");
        var av_key = void 0, av_value = void 0;
        if (av_sep === -1) {
            av_key = av;
            av_value = null;
        }
        else {
            av_key = av.substr(0, av_sep);
            av_value = av.substr(av_sep + 1);
        }
        av_key = av_key.trim().toLowerCase();
        if (av_value) {
            av_value = av_value.trim();
        }
        switch (av_key) {
            case "expires": // S5.2.1
                if (av_value) {
                    var exp = parseDate(av_value);
                    // "If the attribute-value failed to parse as a cookie date, 
                    // ignore the cookie-av."
                    if (exp) {
                        // over and underflow not realistically a concern: V8's
                        // getTime() seems to store something larger than a 
                        // 32-bit time_t (even with 32-bit node)
                        c.expires = exp;
                    }
                }
                break;
            case "max-age": // S5.2.2
                if (av_value) {
                    // "If the first character of the attribute-value is not a
                    // DIGIT or a "-"/ character ...[or]... If the remainder of
                    // attribute-value contains a non-DIGIT character, ignore 
                    // the cookie-av."
                    if (/^-?[0-9]+$/.test(av_value)) {
                        c.maxAge = parseInt(av_value, 10);
                    }
                }
                break;
            case "domain": // S5.2.3
                // "If the attribute-value is empty, the behavior is undefined.
                // However, the user agent SHOULD ignore the cookie-av
                // entirely."
                if (av_value) {
                    // S5.2.3 "Let cookie-domain be the attribute-value 
                    // without the leading %x2E (".") character."
                    var domain = av_value.trim().replace(/^\./, "");
                    if (domain) {
                        // "Convert the cookie-domain to lower case."
                        c.domain = domain.toLowerCase();
                    }
                }
                break;
            case "path": // S5.2.4
                /*
                 * "If the attribute-value is empty or if the first character of
                 * the attribute-value is not %x2F ("/"):
                 *   Let cookie-path be the default-path.
                 * Otherwise:
                 *   Let cookie-path be the attribute-value."
                 *
                 * We'll represent the default-path as null since it depends on
                 * the context of the parsing.
                 */
                c.path = av_value && av_value[0] === "/" ? av_value : undefined;
                break;
            case "secure": // S5.2.5
                /*
                 * "If the attribute-name case-insensitively matches the
                 * string "Secure", the user agent MUST append an attribute to
                 * the cookie-attribute-list
                 * with an attribute-name of Secure and an empty
                 * attribute-value."
                 */
                c.secure = true;
                break;
            case "httponly": // S5.2.6 -- effectively the same as 'secure'
                c.httpOnly = true;
                break;
            case "samesite": // RFC6265bis-02 S5.3.7
                var enforcement = av_value ? av_value.toLowerCase() : "";
                switch (enforcement) {
                    case "strict":
                        c.sameSite = "strict";
                        break;
                    case "lax":
                        c.sameSite = "lax";
                        break;
                    default:
                        // RFC6265bis-02 S5.3.7 step 1:
                        // "If cookie-av's attribute-value is not a
                        // case-insensitive match for "Strict" or "Lax",
                        // ignore the "cookie-av"." This effectively sets it to
                        // 'none' from the prototype.
                        break;
                }
                break;
            default:
                break;
        }
    }
    return c;
}
exports.parseCookie = parseCookie;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.fromString = void 0;
/**
 * fromString a string of headers into an object.
 */
var fromString = function (headers) {
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
exports.fromString = fromString;
/**
 * set headers on an XMLHttpRequest object.
 */
var set = function (xhr) {
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
exports.set = set;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPTS = exports.CONTENT_TYPE = void 0;
/**
 * Common HTTP header constants.
 */
exports.CONTENT_TYPE = 'Content-Type';
exports.ACCEPTS = 'Accept';

},{}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.Head = void 0;
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

},{"./method":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
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

},{}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = exports.InternalServerError = exports.ServerError = exports.Conflict = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.ClientError = exports.Created = exports.NoContent = exports.Accepted = exports.Ok = exports.Success = exports.GenericResponse = void 0;
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
var createResponse = function (code, body, headers, options) {
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
exports.createResponse = createResponse;

},{"./status":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_IMPLEMENTED = exports.INTERNAL_SERVER_ERROR = exports.UNAVAILABLE_FOR_LEGAL_RREASONS = exports.REQUEST_HEADER_FIELDS_TOO_LARGE = exports.TOO_MANY_REQUESTS = exports.PRECONDITION_REQUIRED = exports.UPGRADE_REQUIRED = exports.FAILED_DEPENDENCY = exports.LOCKED = exports.UNPROCESSABLE_ENTITY = exports.TEAPOT = exports.EXPECTATION_FAILED = exports.REQUESTED_RANGE_NOT_SATISFIABLE = exports.UNSUPPORTED_MEDIA_TYPE = exports.REQUEST_URI_TOO_LONG = exports.REQUEST_ENTITY_TOO_LARGE = exports.PRECONDITION_FAILED = exports.LENGTH_REQUIRED = exports.GONE = exports.CONFLICT = exports.REQUEST_TIMEOUT = exports.PROXY_AUTH_REQUIRED = exports.NOT_ACCEPTABLE = exports.METHOD_NOT_ALLOWED = exports.NOT_FOUND = exports.FORBIDDEN = exports.PAYMENT_REQUIRED = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.PERMANENT_REDIRECT = exports.TEMPORARY_REDIRECT = exports.USE_PROXY = exports.NOT_MODIFIED = exports.SEE_OTHER = exports.FOUND = exports.MOVED_PERMANENTLY = exports.MULTIPLE_CHOICES = exports.IM_USED = exports.ALREADY_REPORTED = exports.MULTI_STATUS = exports.PARTIAL_CONTENT = exports.RESET_CONTENT = exports.NO_CONTENT = exports.NON_AUTHORITATIV_INFO = exports.ACCEPTED = exports.CREATED = exports.OK = exports.PROCESSING = exports.SWITCHING_PROTOCOLS = exports.CONTINUE = void 0;
exports.NETWORK_AUTHENTICATION_REQUIRED = exports.NOT_EXTENDED = exports.LOOP_DETECTED = exports.INSUFFICIENT_STORAGE = exports.VARIANT_ALSO_NEGOTIATES = exports.HTTP_VERSION_NOT_SUPPORTED = exports.GATEWAY_TIMEOUT = exports.SERVICE_UNAVAILABLE = exports.BAD_GATEWAY = void 0;
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

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFromString = exports.isBlob = exports.isFormData = exports.isFile = exports.isObject = void 0;
var qs_1 = require("./qs");
/**
 * isObject test.
 */
var isObject = function (obj) {
    return typeof obj === 'object';
};
exports.isObject = isObject;
/**
 * isFile test.
 */
var isFile = function (obj) {
    return toString.call(obj) === '[object File]';
};
exports.isFile = isFile;
/**
 * isFormData test.
 */
var isFormData = function (obj) {
    return toString.call(obj) === '[object FormData]';
};
exports.isFormData = isFormData;
/**
 * isBlob test.
 */
var isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
};
exports.isBlob = isBlob;
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
var urlFromString = function (url, params) {
    if (params === void 0) { params = {}; }
    return url + "?" + (0, qs_1.stringify)(params);
};
exports.urlFromString = urlFromString;

},{"./qs":19}],19:[function(require,module,exports){
"use strict";
/* Based on code from https://github.com/ljharb/qs/blob/master/lib/stringify.js
 * See LICENSE file for copyright information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.formats = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var percentTwenties = /%20/g;
var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};
/**
 * @private
 */
exports.formats = (0, record_1.assign)({
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) { return replace.call(value, percentTwenties, '+'); },
        RFC3986: String
    }
}, Format);
var arrayPrefixGenerators = {
    brackets: function (prefix) { return prefix + '[]'; },
    comma: 'comma',
    indices: function (prefix, key) { return prefix + '[' + key + ']'; },
    repeat: function (prefix) { return prefix; }
};
var has = Object.prototype.hasOwnProperty;
var replace = String.prototype.replace;
var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = exports.formats['default'];
var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i)
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    return array;
}());
var utilsEncode = function (str, _, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js
    // core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }
    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    }
    else if (typeof str !== 'string') {
        string = String(str);
    }
    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }
    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 0x2D // -
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
            out = out + (hexTable[0xC0 | (c >> 6)] +
                hexTable[0x80 | (c & 0x3F)]);
            continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)]);
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
var utilsMaybeMap = function (val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};
var utilsIsBuffer = function (obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};
var isNonNullishPrimitive = function (v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utilsEncode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: exports.formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function (date) { return toISO.call(date); },
    skipNulls: false,
    strictNullHandling: false
};
function doStringify(target, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
    var obj = target;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    }
    else if (obj instanceof Date) {
        obj = serializeDate(obj);
    }
    else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utilsMaybeMap(obj, function (value) {
            if (value instanceof Date) {
                return new String(serializeDate(value));
            }
            return value;
        });
    }
    if (obj === null) {
        if (strictNullHandling) {
            return encoder &&
                !encodeValuesOnly ?
                encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }
        obj = '';
    }
    if (isNonNullishPrimitive(obj) || utilsIsBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ?
                prefix :
                encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '='
                    + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }
    var values = [];
    if (typeof obj === 'undefined') {
        return values;
    }
    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    }
    else if (isArray(filter)) {
        objKeys = filter;
    }
    else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' &&
            key.value !== undefined ? key.value : obj[key];
        if (skipNulls && value === null) {
            continue;
        }
        var keyPrefix = isArray(obj) ?
            typeof generateArrayPrefix === 'function' ?
                generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');
        pushToArray(values, doStringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
    }
    return values;
}
;
var normalizeStringifyOptions = function (opts) {
    if (!opts) {
        return defaults;
    }
    if (opts.encoder !== null &&
        opts.encoder !== undefined &&
        typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }
    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' &&
        opts.charset !== 'utf-8' &&
        opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8,' +
            ' iso-8859-1, or undefined');
    }
    var format = exports.formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(exports.formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = exports.formats.formatters[format];
    var filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }
    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ?
            opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ?
            defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ?
            opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ?
            defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ?
            opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ?
            opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ?
            opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ?
            opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ?
            opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ?
            opts.sort : undefined,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ?
            opts.strictNullHandling : defaults.strictNullHandling
    };
};
/**
 * stringify the target object into a valid query string.
 */
function stringify(target, opts) {
    if (opts === void 0) { opts = {}; }
    var obj = target;
    var options = normalizeStringifyOptions(opts);
    var objKeys;
    var filter;
    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    }
    else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }
    var keys = [];
    if (typeof obj !== 'object' || obj === null) {
        return '';
    }
    var arrayFormat;
    if (opts && opts.arrayFormat && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    }
    else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    }
    else {
        arrayFormat = 'indices';
    }
    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (!objKeys) {
        objKeys = Object.keys(obj);
    }
    if (options.sort) {
        objKeys.sort(options.sort);
    }
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && (obj)[key] === null) {
            continue;
        }
        pushToArray(keys, doStringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : undefined, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
    }
    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';
    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), 
            // the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        }
        else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }
    return joined.length > 0 ? prefix + joined : '';
}
exports.stringify = stringify;
;

},{"@quenk/noni/lib/data/record":28}],20:[function(require,module,exports){
"use strict";
/**
 * This module provides functions and types to make dealing with ES errors
 * easier.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.attempt = exports.raise = exports.convert = void 0;
/** imports */
var either_1 = require("../data/either");
/**
 * convert an Err to an Error.
 */
var convert = function (e) {
    return (e instanceof Error) ? e : new Error(e.message);
};
exports.convert = convert;
/**
 * raise the supplied Error.
 *
 * This function exists to maintain a functional style in situations where
 * you may actually want to throw an error.
 */
var raise = function (e) {
    if (e instanceof Error) {
        throw e;
    }
    else {
        throw new Error(e.message);
    }
};
exports.raise = raise;
/**
 * attempt a synchronous computation that may throw an exception.
 */
var attempt = function (f) {
    try {
        return (0, either_1.right)(f());
    }
    catch (e) {
        return (0, either_1.left)(e);
    }
};
exports.attempt = attempt;

},{"../data/either":25}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doFuture = exports.liftP = exports.fromExcept = exports.toPromise = exports.race = exports.reduce = exports.sequential = exports.parallel = exports.batch = exports.fromCallback = exports.fromAbortable = exports.wait = exports.delay = exports.attempt = exports.raise = exports.pure = exports.Compute = exports.Run = exports.Raise = exports.Trap = exports.Finally = exports.Catch = exports.Step = exports.Bind = exports.Pure = exports.Future = void 0;
var function_1 = require("../../data/function");
var timer_1 = require("../timer");
var error_1 = require("../error");
var _1 = require("./");
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
        if (onError === void 0) { onError = function_1.noop; }
        if (onSuccess === void 0) { onSuccess = function_1.noop; }
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
        (0, timer_1.tick)(function () { return c.run(); });
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
        var e = (0, error_1.convert)(this.value);
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
            if ((next == null) || (typeof next.__exec !== 'function')) {
                try {
                    throw new Error("Invalid Compute stack member: \"" + next + "\"!");
                }
                catch (e) {
                    this.onError(e);
                    return this;
                }
            }
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
var pure = function (a) { return new Pure(a); };
exports.pure = pure;
/**
 * raise wraps an Error in a Future.
 *
 * This future will be considered a failure.
 */
var raise = function (e) { return new Raise(e); };
exports.raise = raise;
/**
 * attempt a synchronous task, trapping any thrown errors in the Future.
 */
var attempt = function (f) {
    return new Run(function (s) {
        (0, timer_1.tick)(function () {
            try {
                s.onSuccess(f());
            }
            catch (e) {
                s.onError(e);
            }
        });
        return function_1.noop;
    });
};
exports.attempt = attempt;
/**
 * delay execution of a function f after n milliseconds have passed.
 *
 * Any errors thrown are caught and processed in the Future chain.
 */
var delay = function (f, n) {
    if (n === void 0) { n = 0; }
    return new Run(function (s) {
        setTimeout(function () {
            try {
                s.onSuccess(f());
            }
            catch (e) {
                s.onError(e);
            }
        }, n);
        return function_1.noop;
    });
};
exports.delay = delay;
/**
 * wait n milliseconds before continuing the Future chain.
 */
var wait = function (n) {
    return new Run(function (s) {
        setTimeout(function () { s.onSuccess(undefined); }, n);
        return function_1.noop;
    });
};
exports.wait = wait;
/**
 * fromAbortable takes an Aborter and a node style async function and
 * produces a Future.
 *
 * Note: The function used here is not called in the "next tick".
 */
var fromAbortable = function (abort) { return function (f) { return new Run(function (s) {
    f(function (err, a) {
        return (err != null) ? s.onError(err) : s.onSuccess(a);
    });
    return abort;
}); }; };
exports.fromAbortable = fromAbortable;
/**
 * fromCallback produces a Future from a node style async function.
 *
 * Note: The function used here is not called in the "next tick".
 */
var fromCallback = function (f) { return (0, exports.fromAbortable)(function_1.noop)(f); };
exports.fromCallback = fromCallback;
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
var batch = function (list) {
    return (0, exports.sequential)(list.map(function (w) { return (0, exports.parallel)(w); }));
};
exports.batch = batch;
/**
 * parallel runs a list of Futures in parallel failing if any
 * fail and succeeding with a list of successful values.
 */
var parallel = function (list) { return new Run(function (s) {
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
exports.parallel = parallel;
/**
 * sequential execution of a list of futures.
 *
 * This function succeeds with a list of all results or fails on the first
 * error.
 */
var sequential = function (list) { return new Run(function (s) {
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
exports.sequential = sequential;
/**
 * reduce a list of values into a single value using a reducer function that
 * produces a Future.
 */
var reduce = function (list, initValue, f) { return (0, exports.doFuture)(function () {
    var accumValue, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accumValue = initValue;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < list.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, f(accumValue, list[i], i)];
            case 2:
                accumValue = _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, (0, exports.pure)(accumValue)];
        }
    });
}); };
exports.reduce = reduce;
/**
 * race given a list of Futures, will return a Future that is settled by
 * the first error or success to occur.
 */
var race = function (list) { return new Run(function (s) {
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
exports.race = race;
/**
 * toPromise transforms a Future into a Promise.
 *
 * This function depends on the global promise constructor and
 * will fail if the enviornment does not provide one.
 */
var toPromise = function (ft) {
    return new Promise(function (yes, no) { return ft.fork(no, yes); });
};
exports.toPromise = toPromise;
/**
 * fromExcept converts an Except to a Future.
 */
var fromExcept = function (e) {
    return e.fold(function (e) { return (0, exports.raise)(e); }, function (a) { return (0, exports.pure)(a); });
};
exports.fromExcept = fromExcept;
/**
 * liftP turns a function that produces a Promise into a Future.
 */
var liftP = function (f) { return new Run(function (s) {
    f()
        .then(function (a) { return s.onSuccess(a); })
        .catch(function (e) { return s.onError(e); });
    return function_1.noop;
}); };
exports.liftP = liftP;
/**
 * doFuture provides a do notation function specialized to Futures.
 *
 * Use this function to avoid explicit type assertions with control/monad#doN.
 */
var doFuture = function (f) { return (0, _1.doN)(f); };
exports.doFuture = doFuture;

},{"../../data/function":26,"../error":20,"../timer":23,"./":22}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doMonad = exports.doN = exports.pipeN = exports.pipe = exports.compose = exports.join = void 0;
/**
 * join flattens a Monad that contains another Monad.
 */
var join = function (outer) {
    return outer.chain(function (x) { return x; });
};
exports.join = join;
/**
 * compose right composes functions that produce Monads so that the output
 * of the second is the input of the first.
 */
var compose = function (g, f) { return (0, exports.pipe)(f, g); };
exports.compose = compose;
/**
 * pipe left composes functions that produce Monads so that the output of the
 * first is the input of the second.
 */
var pipe = function (f, g) { return function (value) { return f(value).chain(function (b) { return g(b); }); }; };
exports.pipe = pipe;
/**
 * pipeN is like pipe but takes variadic parameters.
 *
 * Because of this, the resulting function only maps from A -> B.
 */
var pipeN = function (f) {
    var list = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        list[_i - 1] = arguments[_i];
    }
    return function (value) {
        return list.reduce(function (p, c) { return p.chain(function (v) { return c(v); }); }, f(value));
    };
};
exports.pipeN = pipeN;
/**
 * doN simulates haskell's do notation using ES6's generator syntax.
 *
 * Example:
 *
 * ```typescript
 * doN(function*() {
 *
 *   const a = yield pure(1);
 *   const b = yield pure(a+2);
 *   const c = yield pure(b+1);
 *
 *   return c;
 *
 * })
 * ```
 * Each yield is results in a level of nesting added to the chain. The above
 * could be re-written as:
 *
 * ```typescript
 *
 * pure(1)
 *  .chain(a =>
 *   pure(a + 2)
 *    .chain(b =>
 *       pure(b + 1)));
 *
 * ```
 *
 * NOTE: You MUST wrap your return values manually, this function
 *       will not do it for you.
 *
 * NOTE1: Errors thrown in the body of a generator function simply
 * bring the generator to an end. According to MDN:
 *
 * "Much like a return statement, an error thrown inside the generator will
 * make the generator finished -- unless caught within the generator's body."
 *
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator.
 *
 * Beware of uncaught errors being swallowed in the function body.
 */
var doN = function (f) {
    var gen = f();
    var next = function (val) {
        var r = gen.next(val);
        if (r.done)
            return r.value;
        else
            return r.value.chain(next);
    };
    return next();
};
exports.doN = doN;
exports.doMonad = exports.doN;

},{}],23:[function(require,module,exports){
(function (process){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = exports.tick = void 0;
/**
 * tick runs a function in the "next tick" using process.nextTick in node
 * or setTimeout(f, 0) elsewhere.
 */
var tick = function (f) { return (typeof window == 'undefined') ?
    setTimeout(f, 0) :
    process.nextTick(f); };
exports.tick = tick;
/**
 * debounce delays the application of a function until the specified time
 * has passed.
 *
 * If multiple attempts to apply the function have occured, then each attempt
 * will restart the delay process. The function will only ever be applied once
 * after the delay, using the value of the final attempt for application.
 */
var debounce = function (f, delay) {
    var id = -1;
    return function (a) {
        if (id === -1) {
            id = setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(id);
            id = setTimeout(function () { return f(a); }, delay);
        }
    };
};
exports.debounce = debounce;
/**
 * throttle limits the application of a function to occur only one within the
 * specified duration.
 *
 * The first application will execute immediately subsequent applications
 * will be ignored until the duration has passed.
 */
var throttle = function (f, duration) {
    var wait = false;
    return function (a) {
        if (wait === false) {
            f(a);
            wait = true;
            setTimeout(function () { return wait = false; }, duration);
        }
    };
};
exports.throttle = throttle;

}).call(this)}).call(this,require('_process'))
},{"_process":56}],24:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = exports.flatten = exports.combine = exports.make = exports.removeAt = exports.remove = exports.dedupe = exports.distribute = exports.group = exports.partition = exports.concat = exports.flatMap = exports.map = exports.contains = exports.empty = exports.tail = exports.head = void 0;
/**
 * The array module provides helper functions
 * for working with JS arrays.
 */
var record_1 = require("../record");
var math_1 = require("../../math");
/**
 * head returns the item at index 0 of an array
 */
var head = function (list) { return list[0]; };
exports.head = head;
/**
 * tail returns the last item in an array
 */
var tail = function (list) { return list[list.length - 1]; };
exports.tail = tail;
/**
 * empty indicates whether an array is empty or not.
 */
var empty = function (list) { return (list.length === 0); };
exports.empty = empty;
/**
 * contains indicates whether an element exists in an array.
 */
var contains = function (list, a) { return (list.indexOf(a) > -1); };
exports.contains = contains;
/**
 * map is a curried version of the Array#map method.
 */
var map = function (list) { return function (f) { return list.map(f); }; };
exports.map = map;
/**
 * flatMap allows a function to produce a combined set of arrays from a map
 * operation over each member of a list.
 */
var flatMap = function (list, f) {
    return list.reduce(function (p, c, i) { return p.concat(f(c, i, list)); }, []);
};
exports.flatMap = flatMap;
/**
 * concat concatenates elements to the end of an array without flattening
 * if any of the elements are an array.
 *
 * This function also ignores null and undefined.
 */
var concat = function (list) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    return __spreadArray(__spreadArray([], list, true), items.filter(function (item) { return item != null; }), true);
};
exports.concat = concat;
/**
 * partition an array into two using a partitioning function.
 *
 * The first array contains values that return true and the second false.
 */
var partition = function (list, f) { return (0, exports.empty)(list) ?
    [[], []] :
    list.reduce(function (_a, c, i) {
        var yes = _a[0], no = _a[1];
        return (f(c, i, list) ?
            [(0, exports.concat)(yes, c), no] :
            [yes, (0, exports.concat)(no, c)]);
    }, [[], []]); };
exports.partition = partition;
/**
 * group the elements of an array into a Record where each property
 * is an array of elements assigned to it's property name.
 */
var group = function (list, f) {
    return list.reduce(function (p, c, i) {
        var _a;
        var g = f(c, i, list);
        return (0, record_1.merge)(p, (_a = {},
            _a[g] = Array.isArray(p[g]) ?
                (0, exports.concat)(p[g], c) : [c],
            _a));
    }, {});
};
exports.group = group;
/**
 * distribute breaks an array into an array of equally (approximate) sized
 * smaller arrays.
 */
var distribute = function (list, size) {
    var r = list.reduce(function (p, c, i) {
        return (0, math_1.isMultipleOf)(size, i + 1) ?
            [(0, exports.concat)(p[0], (0, exports.concat)(p[1], c)), []] :
            [p[0], (0, exports.concat)(p[1], c)];
    }, [[], []]);
    return (r[1].length === 0) ? r[0] : (0, exports.concat)(r[0], r[1]);
};
exports.distribute = distribute;
/**
 * dedupe an array by filtering out elements
 * that appear twice.
 */
var dedupe = function (list) {
    return list.filter(function (e, i, l) { return l.indexOf(e) === i; });
};
exports.dedupe = dedupe;
/**
 * remove an element from an array returning a new copy with the element
 * removed.
 */
var remove = function (list, target) {
    var idx = list.indexOf(target);
    if (idx === -1) {
        return list.slice();
    }
    else {
        var a = list.slice();
        a.splice(idx, 1);
        return a;
    }
};
exports.remove = remove;
/**
 * removeAt removes an element at the specified index returning a copy
 * of the original array with the element removed.
 */
var removeAt = function (list, idx) {
    if ((list.length > idx) && (idx > -1)) {
        var a = list.slice();
        a.splice(idx, 1);
        return a;
    }
    else {
        return list.slice();
    }
};
exports.removeAt = removeAt;
/**
 * make an array of elements of a given size using a function to provide
 * each element.
 *
 * The function receives the index number for each step.
 */
var make = function (size, f) {
    var a = new Array(size);
    for (var i = 0; i < size; i++)
        a[i] = f(i);
    return a;
};
exports.make = make;
/**
 * combine a list of of lists into one list.
 */
var combine = function (list) {
    return list.reduce(function (p, c) { return p.concat(c); }, []);
};
exports.combine = combine;
/**
 * flatten a list of items that may be multi-dimensional.
 *
 * This function may not be stack safe.
 */
var flatten = function (list) {
    return list.reduce(function (p, c) {
        return p.concat(Array.isArray(c) ? (0, exports.flatten)(c) : c);
    }, []);
};
exports.flatten = flatten;
/**
 * compact removes any occurences of null or undefined in the list.
 */
var compact = function (list) {
    return list.filter(function (v) { return (v != null); });
};
exports.compact = compact;

},{"../../math":32,"../record":28}],25:[function(require,module,exports){
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.either = exports.fromBoolean = exports.right = exports.left = exports.Right = exports.Left = exports.Either = void 0;
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
        return (0, maybe_1.nothing)();
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
        return (0, maybe_1.just)(this.value);
    };
    return Right;
}(Either));
exports.Right = Right;
/**
 * left constructor helper.
 */
var left = function (a) { return new Left(a); };
exports.left = left;
/**
 * right constructor helper.
 */
var right = function (b) { return new Right(b); };
exports.right = right;
/**
 * fromBoolean constructs an Either using a boolean value.
 */
var fromBoolean = function (b) {
    return b ? (0, exports.right)(true) : (0, exports.left)(false);
};
exports.fromBoolean = fromBoolean;
/**
 * either given two functions, first for Left, second for Right, will return
 * the result of applying the appropriate function to an Either's internal value.
 */
var either = function (f) { return function (g) { return function (e) {
    return (e instanceof Right) ? g(e.takeRight()) : f(e.takeLeft());
}; }; };
exports.either = either;

},{"./maybe":27}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.curry5 = exports.curry4 = exports.curry3 = exports.curry = exports.id = exports.identity = exports.flip = exports.cons = exports.compose5 = exports.compose4 = exports.compose3 = exports.compose = void 0;
/**
 * compose two functions into one.
 */
var compose = function (f, g) { return function (a) { return g(f(a)); }; };
exports.compose = compose;
/**
 * compose3 functions into one.
 */
var compose3 = function (f, g, h) { return function (a) { return h(g(f(a))); }; };
exports.compose3 = compose3;
/**
 * compose4 functions into one.
 */
var compose4 = function (f, g, h, i) {
    return function (a) { return i(h(g(f(a)))); };
};
exports.compose4 = compose4;
/**
 * compose5 functions into one.
 */
var compose5 = function (f, g, h, i, j) { return function (a) { return j(i(h(g(f(a))))); }; };
exports.compose5 = compose5;
/**
 * cons given two values, ignore the second and always return the first.
 */
var cons = function (a) { return function (_) { return a; }; };
exports.cons = cons;
/**
 * flip the order of arguments to a curried function that takes 2 arguments.
 */
var flip = function (f) { return function (b) { return function (a) { return (f(a)(b)); }; }; };
exports.flip = flip;
/**
 * identity function.
 */
var identity = function (a) { return a; };
exports.identity = identity;
exports.id = exports.identity;
/**
 * curry an ES function that accepts 2 parameters.
 */
var curry = function (f) { return function (a) { return function (b) { return f(a, b); }; }; };
exports.curry = curry;
/**
 * curry3 curries an ES function that accepts 3 parameters.
 */
var curry3 = function (f) { return function (a) { return function (b) { return function (c) { return f(a, b, c); }; }; }; };
exports.curry3 = curry3;
/**
 * curry4 curries an ES function that accepts 4 parameters.
 */
var curry4 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return f(a, b, c, d); }; }; }; };
};
exports.curry4 = curry4;
/**
 * curry5 curries an ES function that accepts 5 parameters.
 */
var curry5 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return f(a, b, c, d, e); }; }; }; }; };
};
exports.curry5 = curry5;
/**
 * noop function
 */
var noop = function () { };
exports.noop = noop;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNaN = exports.fromNumber = exports.fromBoolean = exports.fromString = exports.fromObject = exports.fromArray = exports.fromNullable = exports.just = exports.nothing = exports.of = exports.Just = exports.Nothing = void 0;
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
var of = function (a) { return new Just(a); };
exports.of = of;
/**
 * nothing convenience constructor
 */
var nothing = function () { return new Nothing(); };
exports.nothing = nothing;
/**
 * just convenience constructor
 */
var just = function (a) { return new Just(a); };
exports.just = just;
/**
 * fromNullable constructs a Maybe from a value that may be null.
 */
var fromNullable = function (a) { return a == null ?
    new Nothing() : new Just(a); };
exports.fromNullable = fromNullable;
/**
 * fromArray checks an array to see if it's empty
 *
 * Returns [[Nothing]] if it is, [[Just]] otherwise.
 */
var fromArray = function (a) {
    return (a.length === 0) ? new Nothing() : new Just(a);
};
exports.fromArray = fromArray;
/**
 * fromObject uses Object.keys to turn see if an object
 * has any own properties.
 */
var fromObject = function (o) {
    return Object.keys(o).length === 0 ? new Nothing() : new Just(o);
};
exports.fromObject = fromObject;
/**
 * fromString constructs Nothing<A> if the string is empty or Just<A> otherwise.
 */
var fromString = function (s) {
    return (s === '') ? new Nothing() : new Just(s);
};
exports.fromString = fromString;
/**
 * fromBoolean constructs Nothing if b is false, Just<A> otherwise
 */
var fromBoolean = function (b) {
    return (b === false) ? new Nothing() : new Just(b);
};
exports.fromBoolean = fromBoolean;
/**
 * fromNumber constructs Nothing if n is 0 Just<A> otherwise.
 */
var fromNumber = function (n) {
    return (n === 0) ? new Nothing() : new Just(n);
};
exports.fromNumber = fromNumber;
/**
 * fromNaN constructs Nothing if a value is not a number or
 * Just<A> otherwise.
 */
var fromNaN = function (n) {
    return isNaN(n) ? new Nothing() : new Just(n);
};
exports.fromNaN = fromNaN;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickValue = exports.pickKey = exports.make = exports.rcompact = exports.compact = exports.isBadKey = exports.set = exports.every = exports.some = exports.empty = exports.count = exports.clone = exports.hasKey = exports.values = exports.group = exports.partition = exports.exclude = exports.rmerge5 = exports.rmerge4 = exports.rmerge3 = exports.rmerge = exports.merge5 = exports.merge4 = exports.merge3 = exports.merge = exports.filter = exports.reduce = exports.forEach = exports.mapTo = exports.map = exports.keys = exports.isRecord = exports.assign = exports.badKeys = void 0;
/**
 * The record module provides functions for treating ES objects as records.
 *
 * Some of the functions provided here are not type safe and may result in
 * runtime errors if not used carefully.
 */
var array_1 = require("../array");
var type_1 = require("../type");
var maybe_1 = require("../maybe");
/**
 * badKeys is a list of keys we don't want to copy around between objects.
 *
 * Mostly due to prototype pollution but who knows what other keys may become
 * a problem as the language matures.
 */
exports.badKeys = ['__proto__'];
/**
 * assign is an Object.assign polyfill.
 *
 * It is used internally and should probably not be used directly elsewhere.
 */
function assign(target) {
    var _varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        _varArgs[_i - 1] = arguments[_i];
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null)
            for (var nextKey in nextSource)
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                    (0, exports.set)(to, nextKey, nextSource[nextKey]);
    }
    return to;
}
exports.assign = assign;
/**
 * isRecord tests whether a value is a record.
 *
 * To be a Record, a value must be an object and:
 * 1. must not be null
 * 2. must not be an Array
 * 2. must not be an instance of Date
 * 3. must not be an instance of RegExp
 */
var isRecord = function (value) {
    return (typeof value === 'object') &&
        (value != null) &&
        (!Array.isArray(value)) &&
        (!(value instanceof Date)) &&
        (!(value instanceof RegExp));
};
exports.isRecord = isRecord;
/**
 * keys is an Object.keys shortcut.
 */
var keys = function (obj) { return Object.keys(obj); };
exports.keys = keys;
/**
 * map over a Record's properties producing a new record.
 *
 * The order of keys processed is not guaranteed.
 */
var map = function (rec, f) {
    return (0, exports.keys)(rec)
        .reduce(function (p, k) { return (0, exports.merge)(p, (0, exports.set)({}, k, f(rec[k], k, rec))); }, {});
};
exports.map = map;
/**
 * mapTo an array the properties of the provided Record.
 *
 * The elements of the array are the result of applying the function provided
 * to each property. The order of elements is not guaranteed.
 */
var mapTo = function (rec, f) {
    return (0, exports.keys)(rec).map(function (k) { return f(rec[k], k, rec); });
};
exports.mapTo = mapTo;
/**
 * forEach is similar to map only the result of each function call is not kept.
 *
 * The order of keys processed is not guaranteed.
 */
var forEach = function (rec, f) {
    return (0, exports.keys)(rec).forEach(function (k) { return f(rec[k], k, rec); });
};
exports.forEach = forEach;
/**
 * reduce a Record's keys to a single value.
 *
 * The initial value (accum) must be supplied to avoid errors when
 * there are no properties on the Record. The order of keys processed is
 * not guaranteed.
 */
var reduce = function (rec, accum, f) {
    return (0, exports.keys)(rec).reduce(function (p, k) { return f(p, rec[k], k); }, accum);
};
exports.reduce = reduce;
/**
 * filter the keys of a Record using a filter function.
 */
var filter = function (rec, f) {
    return (0, exports.keys)(rec)
        .reduce(function (p, k) { return f(rec[k], k, rec) ?
        (0, exports.merge)(p, (0, exports.set)({}, k, rec[k])) : p; }, {});
};
exports.filter = filter;
/**
 * merge two objects (shallow) into one new object.
 *
 * The return value's type is the product of the two objects provided.
 */
var merge = function (left, right) { return assign({}, left, right); };
exports.merge = merge;
/**
 * merge3
 */
var merge3 = function (a, b, c) { return assign({}, a, b, c); };
exports.merge3 = merge3;
/**
 * merge4
 */
var merge4 = function (a, b, c, d) {
    return assign({}, a, b, c, d);
};
exports.merge4 = merge4;
/**
 * merge5
 */
var merge5 = function (a, b, c, d, e) {
    return assign({}, a, b, c, d, e);
};
exports.merge5 = merge5;
/**
 * rmerge merges 2 records recursively.
 *
 * This function may violate type safety.
 */
var rmerge = function (left, right) {
    return (0, exports.reduce)(right, left, deepMerge);
};
exports.rmerge = rmerge;
/**
 * rmerge3
 */
var rmerge3 = function (r, s, t) {
    return [s, t]
        .reduce(function (p, c) {
        return (0, exports.reduce)(c, (p), deepMerge);
    }, r);
};
exports.rmerge3 = rmerge3;
/**
 * rmerge4
 */
var rmerge4 = function (r, s, t, u) {
    return [s, t, u]
        .reduce(function (p, c) {
        return (0, exports.reduce)(c, (p), deepMerge);
    }, r);
};
exports.rmerge4 = rmerge4;
/**
 * rmerge5
 */
var rmerge5 = function (r, s, t, u, v) {
    return [s, t, u, v]
        .reduce(function (p, c) {
        return (0, exports.reduce)(c, (p), deepMerge);
    }, r);
};
exports.rmerge5 = rmerge5;
var deepMerge = function (pre, curr, key) {
    return (0, exports.isRecord)(curr) ?
        (0, exports.merge)(pre, (0, exports.set)({}, key, (0, exports.isRecord)(pre[key]) ?
            (0, exports.rmerge)(pre[key], curr) :
            (0, exports.merge)({}, curr))) :
        (0, exports.merge)(pre, (0, exports.set)({}, key, curr));
};
/**
 * exclude removes the specified properties from a Record.
 */
var exclude = function (rec, keys) {
    var list = Array.isArray(keys) ? keys : [keys];
    return (0, exports.reduce)(rec, {}, function (p, c, k) {
        return list.indexOf(k) > -1 ? p : (0, exports.merge)(p, (0, exports.set)({}, k, c));
    });
};
exports.exclude = exclude;
/**
 * partition a Record into two sub-records using a PartitionFunc function.
 *
 * This function produces an array where the first element is a Record
 * of values that return true and the second, false.
 */
var partition = function (r, f) {
    return (0, exports.reduce)(r, [{}, {}], function (_a, c, k) {
        var yes = _a[0], no = _a[1];
        return f(c, k, r) ?
            [(0, exports.merge)(yes, (0, exports.set)({}, k, c)), no] :
            [yes, (0, exports.merge)(no, (0, exports.set)({}, k, c))];
    });
};
exports.partition = partition;
/**
 * group the properties of a Record into another Record using a GroupFunc
 * function.
 */
var group = function (rec, f) {
    return (0, exports.reduce)(rec, {}, function (prev, curr, key) {
        var category = f(curr, key, rec);
        var value = (0, exports.isRecord)(prev[category]) ?
            (0, exports.merge)(prev[category], (0, exports.set)({}, key, curr)) :
            (0, exports.set)({}, key, curr);
        return (0, exports.merge)(prev, (0, exports.set)({}, category, value));
    });
};
exports.group = group;
/**
 * values returns a shallow array of the values of a record.
 */
var values = function (r) {
    return (0, exports.reduce)(r, [], function (p, c) { return (0, array_1.concat)(p, c); });
};
exports.values = values;
/**
 * hasKey indicates whether a Record has a given key.
 */
var hasKey = function (r, key) {
    return Object.hasOwnProperty.call(r, key);
};
exports.hasKey = hasKey;
/**
 * clone a Record.
 *
 * Breaks references and deep clones arrays.
 * This function should only be used on Records or objects that
 * are not class instances. This function may violate type safety.
 */
var clone = function (r) {
    return (0, exports.reduce)(r, {}, function (p, c, k) { (0, exports.set)(p, k, _clone(c)); return p; });
};
exports.clone = clone;
var _clone = function (a) {
    if ((0, type_1.isArray)(a))
        return a.map(_clone);
    else if ((0, exports.isRecord)(a))
        return (0, exports.clone)(a);
    else
        return a;
};
/**
 * count how many properties exist on the record.
 */
var count = function (r) { return (0, exports.keys)(r).length; };
exports.count = count;
/**
 * empty tests whether the object has any properties or not.
 */
var empty = function (r) { return (0, exports.count)(r) === 0; };
exports.empty = empty;
/**
 * some tests whether at least one property of a Record passes the
 * test implemented by the provided function.
 */
var some = function (o, f) {
    return (0, exports.keys)(o).some(function (k) { return f(o[k], k, o); });
};
exports.some = some;
/**
 * every tests whether each property of a Record passes the
 * test implemented by the provided function.
 */
var every = function (o, f) {
    return (0, exports.keys)(o).every(function (k) { return f(o[k], k, o); });
};
exports.every = every;
/**
 * set the value of a key on a Record ignoring problematic keys.
 *
 * This function exists to avoid unintentionally setting problem keys such
 * as __proto__ on an object.
 *
 * Even though this function mutates the provided record, it should be used
 * as though it does not.
 *
 * Don't:
 * set(obj, key, value);
 *
 * Do:
 * obj = set(obj, key, value);
 */
var set = function (r, k, value) {
    if (!(0, exports.isBadKey)(k))
        r[k] = value;
    return r;
};
exports.set = set;
/**
 * isBadKey tests whether a key is problematic (Like __proto__).
 */
var isBadKey = function (key) {
    return exports.badKeys.indexOf(key) !== -1;
};
exports.isBadKey = isBadKey;
/**
 * compact a Record by removing any properties that == null.
 */
var compact = function (rec) {
    var result = {};
    for (var key in rec)
        if (rec.hasOwnProperty(key))
            if (rec[key] != null)
                result = (0, exports.set)(result, key, rec[key]);
    return result;
};
exports.compact = compact;
/**
 * rcompact recursively compacts a Record.
 */
var rcompact = function (rec) {
    return (0, exports.compact)((0, exports.map)(rec, function (val) { return (0, exports.isRecord)(val) ? (0, exports.rcompact)(val) : val; }));
};
exports.rcompact = rcompact;
/**
 * make creates a new instance of a Record optionally using the provided
 * value as an initializer.
 *
 * This function is intended to assist with curbing prototype pollution by
 * configuring a setter for __proto__ that ignores changes.
 */
var make = function (init) {
    if (init === void 0) { init = {}; }
    var rec = {};
    Object.defineProperty(rec, '__proto__', {
        configurable: false,
        enumerable: false,
        set: function () { }
    });
    for (var key in init)
        if (init.hasOwnProperty(key))
            rec[key] = init[key];
    return rec;
};
exports.make = make;
/**
 * pickKey selects the value of the first property in a Record that passes the
 * provided test.
 */
var pickKey = function (rec, test) {
    return (0, exports.reduce)(rec, (0, maybe_1.nothing)(), function (p, c, k) {
        return p.isJust() ? p : test(c, k, rec) ? (0, maybe_1.just)(k) : p;
    });
};
exports.pickKey = pickKey;
/**
 * pickValue selects the value of the first property in a Record that passes the
 * provided test.
 */
var pickValue = function (rec, test) {
    return (0, exports.reduce)(rec, (0, maybe_1.nothing)(), function (p, c, k) {
        return p.isJust() ? p : test(c, k, rec) ? (0, maybe_1.just)(c) : p;
    });
};
exports.pickValue = pickValue;

},{"../array":24,"../maybe":27,"../type":31}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = exports.unflatten = exports.flatten = exports.unescapeRecord = exports.escapeRecord = exports.unescape = exports.escape = exports.set = exports.getString = exports.getDefault = exports.get = exports.unsafeGet = exports.tokenize = void 0;
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
var tokenize = function (str) {
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
exports.tokenize = tokenize;
/**
 * unsafeGet retrieves a value at the specified path
 * on any ES object.
 *
 * This function does not check if getting the value succeeded or not.
 */
var unsafeGet = function (path, src) {
    if (src == null)
        return undefined;
    var toks = (0, exports.tokenize)(path);
    var head = src[toks.shift()];
    return toks.reduce(function (p, c) { return (p == null) ? p : p[c]; }, head);
};
exports.unsafeGet = unsafeGet;
/**
 * get a value from a Record given its path safely.
 */
var get = function (path, src) {
    return (0, maybe_1.fromNullable)((0, exports.unsafeGet)(path, src));
};
exports.get = get;
/**
 * getDefault is like get but takes a default value to return if
 * the path is not found.
 */
var getDefault = function (path, src, def) {
    return (0, exports.get)(path, src).orJust(function () { return def; }).get();
};
exports.getDefault = getDefault;
/**
 * getString casts the resulting value to a string.
 *
 * An empty string is provided if the path is not found.
 */
var getString = function (path, src) {
    return (0, exports.get)(path, src).map(function (v) { return String(v); }).orJust(function () { return ''; }).get();
};
exports.getString = getString;
/**
 * set sets a value on an object given a path.
 */
var set = function (p, v, r) {
    var toks = (0, exports.tokenize)(p);
    return _set(r, v, toks);
};
exports.set = set;
var _set = function (r, value, toks) {
    var o;
    if (toks.length === 0)
        return value;
    o = (0, _1.isRecord)(r) ? (0, _1.clone)(r) : {};
    o = (0, _1.set)(o, toks[0], _set(o[toks[0]], value, toks.slice(1)));
    return o;
};
/**
 * escape a path so that occurences of dots are not interpreted as paths.
 *
 * This function escapes dots and dots only.
 */
var escape = function (p) {
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
exports.escape = escape;
/**
 * unescape a path that has been previously escaped.
 */
var unescape = function (p) {
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
exports.unescape = unescape;
/**
 * escapeRecord escapes each property of a record recursively.
 */
var escapeRecord = function (r) {
    return (0, _1.reduce)(r, {}, function (p, c, k) {
        if (typeof c === 'object')
            p = (0, _1.set)(p, (0, exports.escape)(k), (0, exports.escapeRecord)(c));
        else
            p = (0, _1.set)(p, (0, exports.escape)(k), c);
        return p;
    });
};
exports.escapeRecord = escapeRecord;
/**
 * unescapeRecord unescapes each property of a record recursively.
 */
var unescapeRecord = function (r) {
    return (0, _1.reduce)(r, {}, function (p, c, k) {
        if ((0, _1.isRecord)(c))
            p = (0, _1.set)(p, (0, exports.unescape)(k), (0, exports.unescapeRecord)(c));
        else
            p = (0, _1.set)(p, (0, exports.unescape)(k), c);
        return p;
    });
};
exports.unescapeRecord = unescapeRecord;
/**
 * flatten an object into a Record where each key is a path to a non-complex
 * value or array.
 *
 * If any of the paths contain dots, they will be escaped.
 */
var flatten = function (r) {
    return (flatImpl('')({})(r));
};
exports.flatten = flatten;
var flatImpl = function (pfix) { return function (prev) {
    return function (r) {
        return (0, _1.reduce)(r, prev, function (p, c, k) { return (0, _1.isRecord)(c) ?
            (flatImpl(prefix(pfix, k))(p)(c)) :
            (0, _1.merge)(p, (0, _1.set)({}, prefix(pfix, k), c)); });
    };
}; };
var prefix = function (pfix, key) { return (pfix === '') ?
    (0, exports.escape)(key) : pfix + "." + (0, exports.escape)(key); };
/**
 * unflatten a flattened Record so that any nested paths are expanded
 * to their full representation.
 */
var unflatten = function (r) {
    return (0, _1.reduce)(r, {}, function (p, c, k) { return (0, exports.set)(k, c, p); });
};
exports.unflatten = unflatten;
/**
 * project a Record according to the field specification given.
 *
 * Only properties that appear in the spec and set to true will be retained.
 * This function may violate type safety and may leave undefined holes in the
 * result.
 */
var project = function (spec, rec) {
    return (0, _1.reduce)(spec, {}, function (p, c, k) {
        return (c === true) ? (0, exports.set)(k, (0, exports.unsafeGet)(k, rec), p) : p;
    });
};
exports.project = project;

},{"../maybe":27,"./":28}],30:[function(require,module,exports){
"use strict";
/**
 *  Common functions used to manipulate strings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphanumeric = exports.numeric = exports.alpha = exports.interpolate = exports.uncapitalize = exports.capitalize = exports.propercase = exports.modulecase = exports.classcase = exports.camelcase = exports.contains = exports.endsWith = exports.startsWith = void 0;
/** imports */
var path_1 = require("../record/path");
var record_1 = require("../record");
;
/**
 * startsWith polyfill.
 */
var startsWith = function (str, search, pos) {
    if (pos === void 0) { pos = 0; }
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
};
exports.startsWith = startsWith;
/**
 * endsWith polyfill.
 */
var endsWith = function (str, search, this_len) {
    if (this_len === void 0) { this_len = str.length; }
    return (this_len === undefined || this_len > str.length) ?
        this_len = str.length :
        str.substring(this_len - search.length, this_len) === search;
};
exports.endsWith = endsWith;
/**
 * contains uses String#indexOf to determine if a substring occurs
 * in a string.
 */
var contains = function (str, match) {
    return (str.indexOf(match) > -1);
};
exports.contains = contains;
var seperator = /([\\\/._-]|\s)+/g;
/**
 * camelcase transforms a string into camelCase.
 */
var camelcase = function (str) {
    var i = 0;
    var curr = '';
    var prev = '';
    var buf = '';
    while (true) {
        if (i === str.length)
            return buf;
        curr = (i === 0) ? str[i].toLowerCase() : str[i];
        if (curr.match(seperator)) {
            prev = '-';
        }
        else {
            buf = buf.concat((prev === '-') ?
                curr.toUpperCase() :
                curr.toLowerCase());
            prev = '';
        }
        i++;
    }
};
exports.camelcase = camelcase;
/**
 * classcase is like camelCase except the first letter of the string is
 * upper case.
 */
var classcase = function (str) {
    return (str === '') ? '' : str[0].toUpperCase().concat((0, exports.camelcase)(str).slice(1));
};
exports.classcase = classcase;
/**
 * modulecase transforms a string into module-case.
 */
var modulecase = function (str) {
    var i = 0;
    var prev = '';
    var curr = '';
    var next = '';
    var buf = '';
    while (true) {
        if (i === str.length)
            return buf;
        curr = str[i];
        next = str[i + 1];
        if (curr.match(/[A-Z]/) && (i > 0)) {
            if (prev !== '-')
                buf = buf.concat('-');
            prev = curr.toLowerCase();
            buf = buf.concat(prev);
        }
        else if (curr.match(seperator)) {
            if ((prev !== '-') && next && !seperator.test(next)) {
                prev = '-';
                buf = buf.concat(prev);
            }
        }
        else {
            prev = curr.toLowerCase();
            buf = buf.concat(prev);
        }
        i++;
    }
};
exports.modulecase = modulecase;
/**
 * propercase converts a string into Proper Case.
 */
var propercase = function (str) {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(function (tok) { return (tok.length > 0) ?
        "" + tok[0].toUpperCase() + tok.slice(1) : tok; })
        .join(' ');
};
exports.propercase = propercase;
/**
 * capitalize a string.
 *
 * Note: spaces are treated as part of the string.
 */
var capitalize = function (str) {
    return (str === '') ? '' : "" + str[0].toUpperCase() + str.slice(1);
};
exports.capitalize = capitalize;
/**
 * uncapitalize a string.
 *
 * Note: spaces are treated as part of the string.
 */
var uncapitalize = function (str) {
    return (str === '') ? '' : "" + str[0].toLowerCase() + str.slice(1);
};
exports.uncapitalize = uncapitalize;
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
var interpolate = function (str, data, opts) {
    if (opts === void 0) { opts = {}; }
    var options = (0, record_1.assign)({}, interpolateDefaults, opts);
    var reg = new RegExp("" + options.start + options.regex + options.end, 'g');
    return str.replace(reg, function (_, k) {
        return (0, path_1.get)(k, data)
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
exports.interpolate = interpolate;
/**
 * alpha omits characters in a string not found in the English alphabet.
 */
var alpha = function (str) {
    return str.replace(/[^a-zA-Z]/g, '');
};
exports.alpha = alpha;
/**
 * numeric omits characters in a string that are decimal digits.
 */
var numeric = function (str) {
    return str.replace(/[^0-9]/g, '');
};
exports.numeric = numeric;
/**
 * alhpanumeric omits characters not found in the English alphabet and not
 * decimal digits.
 */
var alphanumeric = function (str) {
    return str.replace(/[\W]|[_]/g, '');
};
exports.alphanumeric = alphanumeric;

},{"../record":28,"../record/path":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.show = exports.test = exports.is = exports.isPrim = exports.isFunction = exports.isBoolean = exports.isNumber = exports.isString = exports.isArray = exports.isObject = exports.Any = void 0;
var prims = ['string', 'number', 'boolean'];
/**
 * Any is a class used to represent typescript's "any" type.
 */
var Any = /** @class */ (function () {
    function Any() {
    }
    return Any;
}());
exports.Any = Any;
/**
 * isObject test.
 *
 * Does not consider an Array an object.
 */
var isObject = function (value) {
    return (typeof value === 'object') && (!(0, exports.isArray)(value));
};
exports.isObject = isObject;
/**
 * isArray test.
 */
exports.isArray = Array.isArray;
/**
 * isString test.
 */
var isString = function (value) {
    return typeof value === 'string';
};
exports.isString = isString;
/**
 * isNumber test.
 */
var isNumber = function (value) {
    return (typeof value === 'number') && (!isNaN(value));
};
exports.isNumber = isNumber;
/**
 * isBoolean test.
 */
var isBoolean = function (value) {
    return typeof value === 'boolean';
};
exports.isBoolean = isBoolean;
/**
 * isFunction test.
 */
var isFunction = function (value) {
    return typeof value === 'function';
};
exports.isFunction = isFunction;
/**
 * isPrim test.
 */
var isPrim = function (value) {
    return !((0, exports.isObject)(value) ||
        (0, exports.isArray)(value) ||
        (0, exports.isFunction)(value));
};
exports.isPrim = isPrim;
/**
 * is performs a typeof of check on a type.
 */
var is = function (expected) { return function (value) {
    return typeof (value) === expected;
}; };
exports.is = is;
/**
 * test whether a value conforms to some pattern.
 *
 * This function is made available mainly for a crude pattern matching
 * machinery that works as followss:
 * string   -> Matches on the value of the string.
 * number   -> Matches on the value of the number.
 * boolean  -> Matches on the value of the boolean.
 * object   -> Each key of the object is matched on the value, all must match.
 * function -> Treated as a constructor and results in an instanceof check or
 *             for String,Number and Boolean, this uses the typeof check. If
 *             the function is RegExp then we uses the RegExp.test function
 *             instead.
 */
var test = function (value, t) {
    if ((prims.indexOf(typeof t) > -1) && (value === t))
        return true;
    else if ((typeof t === 'function') &&
        (((t === String) && (typeof value === 'string')) ||
            ((t === Number) && (typeof value === 'number')) ||
            ((t === Boolean) && (typeof value === 'boolean')) ||
            ((t === Array) && (Array.isArray(value))) ||
            (t === Any) ||
            (value instanceof t)))
        return true;
    else if ((t instanceof RegExp) &&
        ((typeof value === 'string') &&
            t.test(value)))
        return true;
    else if ((typeof t === 'object') && (typeof value === 'object'))
        return Object
            .keys(t)
            .every(function (k) { return Object.hasOwnProperty.call(value, k) ?
            (0, exports.test)(value[k], t[k]) : false; });
    return false;
};
exports.test = test;
/**
 * show the type of a value.
 *
 * Note: This may crash if the value is an
 * object literal with recursive references.
 */
var show = function (value) {
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return "[" + value.map(exports.show) + "];";
        else if (value.constructor !== Object)
            return (value.constructor.name ||
                value.constructor);
        else
            return JSON.stringify(value);
    }
    else {
        return '' + value;
    }
};
exports.show = show;
/**
 * toString casts a value to a string.
 *
 * If the value is null or undefined an empty string is returned instead of
 * the default.
 */
var toString = function (val) {
    return (val == null) ? '' : String(val);
};
exports.toString = toString;

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = exports.isMultipleOf = void 0;
/**
 * isMultipleOf tests whether the Integer 'y' is a multiple of x.
 */
var isMultipleOf = function (x, y) { return ((y % x) === 0); };
exports.isMultipleOf = isMultipleOf;
/**
 * round a number "x" to "n" places (n defaults to 0 places).
 *
 * This uses the Math.round(x * n) / n method however we take into
 * consideration the Math.round(1.005 * 100) / 100 === 1 issue by use of an
 * offset:
 *
 * sign * (round((abs(x) * 10^n) + (1 / 10^n+1)) / 10^n)
 *
 * Where:
 *
 * sign is the sign of x
 * round is Math.round
 * abs is Math.abs
 * (1 / 10^n+1) is the offset.
 *
 * The offset is only used if n is more than zero. The absolute value of x
 * is used in the calculation to avoid JavaScript idiosyncracies when rounding
 * 0.5:
 * (Math.round((1.005 * 100)+0.001) / 100) === 1.01
 *
 * whereas
 * (Math.round((-1.005 * 100)+0.001) / 100) === -1
 *
 * See the description [here]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
 * for more details.
 *
 */
var round = function (x, n) {
    if (n === void 0) { n = 0; }
    var exp = Math.pow(10, n);
    var sign = x >= 0 ? 1 : -1;
    var offset = (n > 0) ? (1 / (Math.pow(10, n + 1))) : 0;
    return sign * (Math.round((Math.abs(x) * exp) + offset) / exp);
};
exports.round = round;

},{}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.toString = exports.Failed = exports.Negative = exports.Positive = void 0;
var stringify = require("json-stringify-safe");
var deepEqual = require("deep-equal");
/**
 * Positive value matcher.
 */
var Positive = /** @class */ (function () {
    function Positive(name, value, throwErrors) {
        this.name = name;
        this.value = value;
        this.throwErrors = throwErrors;
        this.prefix = 'must';
    }
    Object.defineProperty(Positive.prototype, "be", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "is", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "not", {
        get: function () {
            return new Negative(this.name, this.value, this.throwErrors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "instance", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Positive.prototype.assert = function (ok, condition) {
        if (!ok) {
            if (this.throwErrors)
                throw new Error(this.name + " " + this.prefix + " " + condition + "!");
            return new Failed(this.name, this.value, this.throwErrors);
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
        return this.assert(this.value === b, "equal " + (0, exports.toString)(b));
    };
    Positive.prototype.equate = function (b) {
        return this.assert(deepEqual(this.value, b), "equate " + (0, exports.toString)(b));
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
            // not not == true
            return new Positive(this.name, this.value, this.throwErrors);
        },
        enumerable: false,
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
var toString = function (value) {
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
        if ((value != null) &&
            (value.constructor !== Object) &&
            (!Array.isArray(value)))
            return value.constructor.name;
        else
            return stringify(value);
    }
    return stringify(value);
};
exports.toString = toString;
/**
 * assert turns a value into a Matcher so it can be tested.
 *
 * The Matcher returned is positive and configured to throw
 * errors if any tests fail.
 */
var assert = function (value, name) {
    if (name === void 0) { name = ''; }
    return new Positive(name ? name : (0, exports.toString)(value), value, true);
};
exports.assert = assert;

},{"deep-equal":36,"json-stringify-safe":48}],34:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":35,"get-intrinsic":40}],35:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":39,"get-intrinsic":40}],36:[function(require,module,exports){
var objectKeys = require('object-keys');
var isArguments = require('is-arguments');
var is = require('object-is');
var isRegex = require('is-regex');
var flags = require('regexp.prototype.flags');
var isDate = require('is-date-object');

var getTime = Date.prototype.getTime;

function deepEqual(actual, expected, options) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
    return opts.strict ? is(actual, expected) : actual == expected;
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts);
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }
  return true;
}

function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;
  if (typeof a !== typeof b) { return false; }
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) { return false; }

  if (isArguments(a) !== isArguments(b)) { return false; }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) { return false; }
  if (aIsRegex || bIsRegex) {
    return a.source === b.source && flags(a) === flags(b);
  }

  if (isDate(a) && isDate(b)) {
    return getTime.call(a) === getTime.call(b);
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) { return false; }
  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  if (typeof a !== typeof b) { return false; }

  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) { // happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) { return false; }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false; }
  }
  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) { return false; }
  }

  return true;
}

module.exports = deepEqual;

},{"is-arguments":45,"is-date-object":46,"is-regex":47,"object-is":50,"object-keys":54,"regexp.prototype.flags":58}],37:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":54}],38:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],39:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":38}],40:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":39,"has":44,"has-symbols":41}],41:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":42}],42:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],43:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":42}],44:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":39}],45:[function(require,module,exports){
'use strict';

var hasToStringTag = require('has-tostringtag/shams')();
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":34,"has-tostringtag/shams":43}],46:[function(require,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = require('has-tostringtag/shams')();

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{"has-tostringtag/shams":43}],47:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var hasToStringTag = require('has-tostringtag/shams')();
var has;
var $exec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	has = callBound('Object.prototype.hasOwnProperty');
	$exec = callBound('RegExp.prototype.exec');
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var $toString = callBound('Object.prototype.toString');
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			$exec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};

},{"call-bind/callBound":34,"has-tostringtag/shams":43}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
'use strict';

var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};


},{}],50:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var callBind = require('call-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;

},{"./implementation":49,"./polyfill":51,"./shim":52,"call-bind":35,"define-properties":37}],51:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};

},{"./implementation":49}],52:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};

},{"./polyfill":51,"define-properties":37}],53:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":55}],54:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":53,"./isArguments":55}],55:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
'use strict';

var $Object = Object;
var $TypeError = TypeError;

module.exports = function flags() {
	if (this != null && this !== $Object(this)) {
		throw new $TypeError('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
};

},{}],58:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var callBind = require('call-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var flagsBound = callBind(implementation);

define(flagsBound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = flagsBound;

},{"./implementation":57,"./polyfill":59,"./shim":60,"call-bind":35,"define-properties":37}],59:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var supportsDescriptors = require('define-properties').supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var $TypeError = TypeError;

module.exports = function getPolyfill() {
	if (!supportsDescriptors) {
		throw new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if ((/a/mig).flags === 'gim') {
		var descriptor = $gOPD(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
			return descriptor.get;
		}
	}
	return implementation;
};

},{"./implementation":57,"define-properties":37}],60:[function(require,module,exports){
'use strict';

var supportsDescriptors = require('define-properties').supportsDescriptors;
var getPolyfill = require('./polyfill');
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

module.exports = function shimFlags() {
	if (!supportsDescriptors || !getProto) {
		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill = getPolyfill();
	var proto = getProto(regex);
	var descriptor = gOPD(proto, 'flags');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty(proto, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};

},{"./polyfill":59,"define-properties":37}],61:[function(require,module,exports){
(function (process){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var agent_1 = require("../../../../../../lib/agent");
var memory_1 = require("../../../../../../lib/cookie/container/memory");
var json_1 = require("../../../../../../lib/agent/transform/json");
var multipart_1 = require("../../../../../../lib/agent/transform/multipart");
var json_2 = require("../../../../../../lib/agent/parser/json");
var xhr_1 = require("../../../../../../lib/agent/transport/xhr");
var response_1 = require("../../../../../../lib/response");
var host = process.env.HOST || 'http://localhost';
var port = process.env.PORT || '9999';
var newAgent = function (h) {
    if (h === void 0) { h = host; }
    return new agent_1.Agent(h, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: {}, context: {}, port: Number(port) }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []);
};
describe('xhr', function () {
    it('should make successful requests ', function () {
        var codes = [200, 201, 204];
        var expected = [response_1.Ok, response_1.Created, response_1.NoContent];
        var agent = newAgent();
        return (0, future_1.toPromise)((0, future_1.parallel)(codes.map(function (code) { return agent.get("/status/" + code); }))
            .map(function (list) { return list.map(function (r, i) { return r instanceof expected[i]; }); }))
            .then(function (results) { return results.reduce(function (_, c) {
            (0, assert_1.assert)(c).equal(true);
            return c;
        }, true); });
    });
    it('should detect transport errors', function () {
        return (0, future_1.toPromise)(newAgent('hddp://example.com').get('/'))
            .catch(function (e) {
            (0, assert_1.assert)(e).be.instance.of(Error);
            (0, assert_1.assert)(e.message).equal('TransportError');
        });
    });
    it('should send the correct body', function () {
        var body = { "email": "me@email.com", "password": "password" };
        return (0, future_1.toPromise)(newAgent().post('/login', body)).
            then(function (res) {
            (0, assert_1.assert)(res.code).equal(200);
        });
    });
    it('should provide the correct body', function () {
        return (0, future_1.toPromise)(newAgent().get('/json'))
            .then(function (res) {
            (0, assert_1.assert)(res.body).equate({
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
        return (0, future_1.toPromise)(agent.post('/file', fd))
            .then(function (res) {
            (0, assert_1.assert)(res.code).equal(204);
        });
    });
});

}).call(this)}).call(this,require('_process'))
},{"../../../../../../lib/agent":1,"../../../../../../lib/agent/parser/json":2,"../../../../../../lib/agent/transform/json":4,"../../../../../../lib/agent/transform/multipart":5,"../../../../../../lib/agent/transport/xhr":6,"../../../../../../lib/cookie/container/memory":9,"../../../../../../lib/response":16,"@quenk/noni/lib/control/monad/future":21,"@quenk/test/lib/assert":33,"_process":56}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var browser_1 = require("../../../../lib/browser");
describe('browser', function () {
    describe('splitUrl', function () {
        it('should work with domain alone', function () {
            (0, assert_1.assert)((0, browser_1.splitUrl)('localhost:8080')).equate([
                'localhost:8080',
                '/'
            ]);
        });
        it('should work with domain and path', function () {
            (0, assert_1.assert)((0, browser_1.splitUrl)('localhost:8080/path/to')).equate([
                'localhost:8080',
                '/path/to'
            ]);
        });
        it('should work when the protocol is present', function () {
            (0, assert_1.assert)((0, browser_1.splitUrl)('http://localhost/path/to')).equate([
                'localhost',
                '/path/to'
            ]);
            (0, assert_1.assert)((0, browser_1.splitUrl)('http://localhost')).equate([
                'localhost',
                '/'
            ]);
        });
    });
});

},{"../../../../lib/browser":7,"@quenk/test/lib/assert":33}],63:[function(require,module,exports){
require("./agent/transport/xhr_test.js");
require("./browser_test.js");

},{"./agent/transport/xhr_test.js":61,"./browser_test.js":62}]},{},[63]);
