"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAgent = void 0;
var mock_1 = require("@quenk/test/lib/mock");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var response_1 = require("../response");
var res = future_1.pure(new response_1.GenericResponse(0, {}, {}, { port: 0, ttl: 0, tags: {}, context: {} }));
/**
 * MockAgent is an HTTPAgent that can be used when testing projects that use
 * this library.
 */
var MockAgent = /** @class */ (function () {
    function MockAgent() {
        this.__MOCK__ = new mock_1.Mock();
    }
    MockAgent.prototype.head = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.__MOCK__.invoke('head', [path, params, headers], res);
    };
    MockAgent.prototype.get = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.__MOCK__.invoke('get', [path, params, headers], res);
    };
    MockAgent.prototype.post = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.__MOCK__.invoke('post', [path, body, headers], res);
    };
    MockAgent.prototype.put = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.__MOCK__.invoke('put', [path, body, headers], res);
    };
    MockAgent.prototype.patch = function (path, body, headers) {
        if (headers === void 0) { headers = {}; }
        return this.__MOCK__.invoke('patch', [path, body, headers], res);
    };
    MockAgent.prototype.delete = function (path, body, headers) {
        return this.__MOCK__.invoke('delete', [path, body, headers], res);
    };
    return MockAgent;
}());
exports.MockAgent = MockAgent;
//# sourceMappingURL=mock.js.map