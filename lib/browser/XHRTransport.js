"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var header_1 = require("../header");
var response_1 = require("../response");
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
var XHRTransport = /** @class */ (function () {
    function XHRTransport(responseType) {
        if (responseType === void 0) { responseType = ''; }
        this.responseType = responseType;
    }
    XHRTransport.prototype.send = function (_a) {
        var _this = this;
        var url = _a.url, method = _a.method, body = _a.body, options = _a.options, headers = _a.headers, agent = _a.agent;
        var xhr = new XMLHttpRequest();
        var _b = options.ttl, ttl = _b === void 0 ? 0 : _b;
        return new Promise(function (resolve, reject) {
            xhr.open(method, url, true);
            xhr.onload = function () {
                return agent
                    .cookies
                    .update(document.cookie)
                    .then(function () {
                    return agent
                        .transform
                        .transformResponseBody(xhr.response)
                        .then(function (body) {
                        return resolve(response_1.createResponse(xhr.status, body, header_1.fromString(xhr.getAllResponseHeaders()), options));
                    });
                });
            };
            xhr.timeout = ttl;
            xhr.responseType = _this.responseType;
            xhr.onerror = function () { return reject(new Error('TransportError')); };
            xhr.onabort = function () { return reject(new Error('TransportError')); };
            Object
                .keys(headers)
                .forEach(function (k) { xhr.setRequestHeader(k, headers[k]); });
            //agent.adapters.forEach(a => a.beforeRequest(this, xhr, agent));
            xhr.send(body);
        });
    };
    return XHRTransport;
}());
exports.XHRTransport = XHRTransport;
//# sourceMappingURL=XHRTransport.js.map