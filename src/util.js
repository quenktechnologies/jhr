"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
/**
 * isObject test.
 */
exports.isObject = function (obj) {
    return typeof obj === 'object';
};
/**
 * isFile test.
 */
exports.isFile = function (obj) {
    return toString.call(obj) === '[object File]';
};
/**
 * isFormData test.
 */
exports.isFormData = function (obj) {
    return toString.call(obj) === '[object FormData]';
};
/**
 * isBlob test.
 */
exports.isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
};
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
exports.urlFromString = function (url, params) {
    if (params === void 0) { params = {}; }
    return url + "?" + qs.stringify(params);
};
//# sourceMappingURL=util.js.map