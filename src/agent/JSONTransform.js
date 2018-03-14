"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
var Promise = require("bluebird");
/**
 * JSONTransform
 *
 * Note that this Transform makes absolutely no attempt to
 * guarantee that transformResponseBody() returns the type
 * of R.
 */
var JSONTransform = /** @class */ (function () {
    function JSONTransform(prefix) {
        if (prefix === void 0) { prefix = /^\)\]\}',?\n/; }
        this.prefix = prefix;
        this.responseType = '';
        this.accepts = 'application/json';
        this.contentType = 'application/json;charset=utf-8';
    }
    JSONTransform.prototype.transformRequestBody = function (body) {
        return Promise
            .resolve((util.isObject(body) &&
            !util.isFile(body) &&
            !util.isBlob(body) &&
            !util.isFormData(body)) ?
            JSON.stringify(body) : ('' + body));
    };
    JSONTransform.prototype.transformResponseBody = function (body) {
        var _this = this;
        if (body === void 0) { body = ''; }
        //About prefix:
        //https://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
        return Promise.try(function () { return JSON.parse(body.replace(_this.prefix, '').trim() || '{}'); });
    };
    return JSONTransform;
}());
exports.JSONTransform = JSONTransform;
//# sourceMappingURL=JSONTransform.js.map