"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methods = require("./method");
/**
 * defaultOptions used in requests.
 */
exports.defaultOptions = {
    tags: {},
    ttl: 0,
    context: {}
};
/**
 * Head request.
 */
var Head = /** @class */ (function () {
    function Head(params, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.params = params;
        this.headers = headers;
        this.options = options;
        this.method = methods.HEAD;
    }
    return Head;
}());
exports.Head = Head;
/**
 * Get request.
 */
var Get = /** @class */ (function () {
    function Get(params, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.params = params;
        this.headers = headers;
        this.options = options;
        this.method = methods.GET;
    }
    return Get;
}());
exports.Get = Get;
/**
 * Post request.
 */
var Post = /** @class */ (function () {
    function Post(body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = methods.POST;
    }
    return Post;
}());
exports.Post = Post;
/**
 * Put request.
 */
var Put = /** @class */ (function () {
    function Put(body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = methods.PUT;
    }
    return Put;
}());
exports.Put = Put;
/**
 * Patch request.
 */
var Patch = /** @class */ (function () {
    function Patch(body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = methods.PATCH;
    }
    return Patch;
}());
exports.Patch = Patch;
/**
 * Delete request.
 */
var Delete = /** @class */ (function () {
    function Delete(body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = exports.defaultOptions; }
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = methods.DELETE;
    }
    return Delete;
}());
exports.Delete = Delete;
//# sourceMappingURL=request.js.map