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
exports.createAgent = function (host) { return new agent_1.Agent(host, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: [], context: {} }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []); };
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
//# sourceMappingURL=browser.js.map