"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var method_1 = require("./method");
/**
 * Head request.
 */
var Head = /** @class */ (function () {
    function Head(path, params, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = { ttl: 0, tags: [], context: {} }; }
        this.path = path;
        this.params = params;
        this.headers = headers;
        this.options = options;
        this.method = method_1.Method.Head;
    }
    return Head;
}());
exports.Head = Head;
/**
 * Get request.
 */
var Get = /** @class */ (function (_super) {
    __extends(Get, _super);
    function Get() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Get;
        return _this;
    }
    return Get;
}(Head));
exports.Get = Get;
/**
 * Post request.
 */
var Post = /** @class */ (function () {
    function Post(path, body, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = { ttl: 0, tags: [], context: {} }; }
        this.path = path;
        this.body = body;
        this.headers = headers;
        this.options = options;
        this.method = method_1.Method.Post;
    }
    return Post;
}());
exports.Post = Post;
/**
 * Put request.
 */
var Put = /** @class */ (function (_super) {
    __extends(Put, _super);
    function Put() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Put;
        return _this;
    }
    return Put;
}(Post));
exports.Put = Put;
/**
 * Patch request.
 */
var Patch = /** @class */ (function (_super) {
    __extends(Patch, _super);
    function Patch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Patch;
        return _this;
    }
    return Patch;
}(Post));
exports.Patch = Patch;
/**
 * Delete request.
 */
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = method_1.Method.Delete;
        return _this;
    }
    return Delete;
}(Post));
exports.Delete = Delete;
//# sourceMappingURL=index.js.map