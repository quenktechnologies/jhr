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
//# sourceMappingURL=browser.js.map