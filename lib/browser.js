"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.createAgent = exports.splitUrl = void 0;
const document_1 = require("./cookie/container/document");
const json_1 = require("./agent/transform/json");
const json_2 = require("./agent/parser/json");
const xhr_1 = require("./agent/transport/xhr");
const request_1 = require("./request");
const csrf_1 = require("./agent/plugin/csrf");
const agent_1 = require("./agent");
const HTTP = 'http://';
const HTTPS = 'https://';
/**
 * @private
 */
const splitUrl = (url) => {
    let split = url.split(HTTP).join('').split(HTTPS).join('').split('/');
    if ((split.length === 1) || ((split.length === 2) && (split[1] === '')))
        return [split[0], '/'];
    return [split[0], '/' + split.slice(1).join('/')];
};
exports.splitUrl = splitUrl;
/**
 * createAgent produces a new default Agent for use in the browser.
 */
const createAgent = (host = getHost(), port = getPort()) => new agent_1.Agent(host, document_1.DocumentContainer.create(), { ttl: 0, tags: {}, context: {}, port }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser({ lenient: true })), [new csrf_1.CSRFProtectionPlugin()]);
exports.createAgent = createAgent;
const getHost = () => `${window.location.protocol}//${window.location.hostname}`;
const getPort = () => {
    let port = window.location.port;
    return Number(((port === '') || (port == null)) ? 80 : port);
};
/**
 * get shorthand helper.
 *
 * Note that url should consist of the domain and path
 * combined or the path alone.
 */
const get = (url, params = {}, options = {}) => {
    let [host, path] = (0, exports.splitUrl)(url);
    return (0, exports.createAgent)(host).send(new request_1.Get(path, params, options));
};
exports.get = get;
//# sourceMappingURL=browser.js.map