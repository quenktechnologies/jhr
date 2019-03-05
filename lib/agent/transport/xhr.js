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
                return cookies
                    .update(document.cookie)
                    .chain(function () { return future_1.fromExcept(parser.apply(xhr.response)); })
                    .fork(function (e) { s.onError(e); }, function (res) {
                    var r = response_1.createResponse(xhr.status, res, header_1.fromString(xhr.getAllResponseHeaders()), options);
                    s.onSuccess(r);
                });
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
            else
                xhr.setRequestHeader(headers_1.CONTENT_TYPE, transform.type);
            xhr.send(transBody);
            return function () { return xhr.abort(); };
        });
    };
    return XHRTransport;
}());
exports.XHRTransport = XHRTransport;
//# sourceMappingURL=xhr.js.map