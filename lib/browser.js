"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agent_1 = require("./agent");
var memory_1 = require("./cookie/container/memory");
var json_1 = require("./agent/transform/json");
var json_2 = require("./agent/parser/json");
var xhr_1 = require("./agent/transport/xhr");
/**
 * newAgent produces a new default Agent for use in the browser.
 */
exports.newAgent = function (host) { return new agent_1.Agent(host, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: [], context: {} }, new json_1.JSONTransform(), new json_2.JSONParser(), new xhr_1.XHRTransport(), []); };
//# sourceMappingURL=browser.js.map