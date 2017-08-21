"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEAD = 'HEAD';
exports.GET = 'GET';
exports.PUT = 'PUT';
exports.POST = 'POST';
exports.DELETE = 'DELETE';
exports.PATCH = 'PATCH';
var Method = (function () {
    function Method(params, headers, tags, ttl) {
        this.params = params;
        this.headers = headers;
        this.tags = tags;
        this.ttl = ttl;
    }
    return Method;
}());
exports.Method = Method;
var Get = (function (_super) {
    __extends(Get, _super);
    function Get() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.GET;
        return _this;
    }
    return Get;
}(Method));
exports.Get = Get;
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.HEAD;
        return _this;
    }
    return Head;
}(Method));
exports.Head = Head;
var Post = (function (_super) {
    __extends(Post, _super);
    function Post() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.POST;
        return _this;
    }
    return Post;
}(Method));
exports.Post = Post;
var Put = (function (_super) {
    __extends(Put, _super);
    function Put() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.PUT;
        return _this;
    }
    return Put;
}(Method));
exports.Put = Put;
var Patch = (function (_super) {
    __extends(Patch, _super);
    function Patch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.PATCH;
        return _this;
    }
    return Patch;
}(Method));
exports.Patch = Patch;
var Delete = (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.method = exports.DELETE;
        return _this;
    }
    return Delete;
}(Method));
exports.Delete = Delete;
//# sourceMappingURL=Methods.js.map