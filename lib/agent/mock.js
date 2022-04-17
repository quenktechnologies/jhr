"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAgent = void 0;
const mock_1 = require("@quenk/test/lib/mock");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const method_1 = require("../request/method");
const response_1 = require("../response");
const res = (0, future_1.pure)(new response_1.GenericResponse(0, {}, {}, {
    method: method_1.Method.Get,
    path: '/',
    headers: {},
    options: { port: 0, ttl: 0, tags: {}, context: {} }
}));
/**
 * MockAgent is an HTTPAgent that can be used when testing projects that use
 * this library.
 */
class MockAgent {
    constructor() {
        this.__MOCK__ = new mock_1.Mock();
    }
    head(path, params = {}, headers = {}) {
        return this.__MOCK__.invoke('head', [path, params, headers], res);
    }
    get(path, params = {}, headers = {}) {
        return this.__MOCK__.invoke('get', [path, params, headers], res);
    }
    post(path, body, headers = {}) {
        return this.__MOCK__.invoke('post', [path, body, headers], res);
    }
    put(path, body, headers = {}) {
        return this.__MOCK__.invoke('put', [path, body, headers], res);
    }
    patch(path, body, headers = {}) {
        return this.__MOCK__.invoke('patch', [path, body, headers], res);
    }
    delete(path, body, headers) {
        return this.__MOCK__.invoke('delete', [path, body, headers], res);
    }
    send(req) {
        return this.__MOCK__.invoke('send', [req], res);
    }
}
exports.MockAgent = MockAgent;
//# sourceMappingURL=mock.js.map