"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XHRTransport = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const header_1 = require("../../header");
const response_1 = require("../../response");
const method_1 = require("../../request/method");
const headers_1 = require("../../headers");
/**
 * XHRTransport uses the browsers XMLHTTPRequest object as a transport engine.
 */
class XHRTransport {
    constructor(responseType = '', transform, parser) {
        this.responseType = responseType;
        this.transform = transform;
        this.parser = parser;
    }
    send(ctx) {
        let { parser, transform } = this;
        let { host, port, path, method, body, options, cookies } = ctx;
        let xhr = new XMLHttpRequest();
        let portNumer = (port && (port !== 80) && (port !== 443)) ? `:${port}` : '';
        let url = `${host}${portNumer}${path[0] === '/' ? '' : '/'}${path}`;
        return new future_1.Run(() => new Promise((onSuccess, onError) => {
            let transBody = undefined;
            if (body != null) {
                let exceptBody = transform.apply(body);
                if (exceptBody.isLeft()) {
                    onError(new Error(exceptBody.takeLeft().message));
                    return () => { };
                }
                else {
                    transBody = exceptBody.takeRight();
                }
            }
            xhr.open(method, url, true);
            xhr.onload = () => {
                cookies.setCookies(document.cookie.split(';'));
                // 204 should have no body.
                if (xhr.status === 204) {
                    onSuccess((0, response_1.createResponse)(xhr.status, undefined, (0, header_1.fromString)(xhr.getAllResponseHeaders()), ctx));
                }
                else {
                    let exceptRes = parser.apply(xhr.response);
                    if (exceptRes.isLeft()) {
                        onError(new Error(exceptRes.takeLeft().message));
                    }
                    else {
                        let r = (0, response_1.createResponse)(xhr.status, exceptRes.takeRight(), (0, header_1.fromString)(xhr.getAllResponseHeaders()), ctx);
                        onSuccess(r);
                    }
                }
            };
            xhr.timeout = options.ttl;
            xhr.responseType = this.responseType;
            xhr.onerror = () => onError(new Error('TransportError'));
            xhr.onabort = () => onError(new Error('AbortError'));
            Object
                .keys(options.headers)
                .forEach(k => { xhr.setRequestHeader(k, options.headers[k]); });
            if ((method === method_1.Method.Get) || (method === method_1.Method.Head))
                xhr.setRequestHeader(headers_1.ACCEPTS, parser.accepts);
            else if (transform.type !== 'multipart/form-data')
                xhr.setRequestHeader(headers_1.CONTENT_TYPE, transform.type);
            //^ multipart forms set a custom content type
            xhr.send(transBody);
            return () => xhr.abort();
        }));
    }
}
exports.XHRTransport = XHRTransport;
//# sourceMappingURL=xhr.js.map