"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var util_1 = require("afpl/lib/util");
var agent_1 = require("../agent");
var cookie_1 = require("../cookie");
var XHRTransport_1 = require("./XHRTransport");
exports.XHRTransport = XHRTransport_1.XHRTransport;
exports.createAgent = function (headers) {
    if (headers === void 0) { headers = {}; }
    return new agent_1.Agent(headers, new cookie_1.MemJar(), new agent_1.JSONTransform(), [], new XHRTransport_1.XHRTransport());
};
/**
 * csrfAdapter for automatically updating a header used for CSRF
 * protection based on a cookie value.
 */
exports.csrfAdapter = function (o) { return function (e) {
    return Promise
        .resolve(e
        .agent
        .cookies.get(o.cookie)
        .then(function (value) {
        if (value)
            e.headers = util_1.merge(e.headers, (_a = {},
                _a[o.header] = value,
                _a));
        return Promise.resolve(e);
        var _a;
    }));
}; };
//# sourceMappingURL=index.js.map