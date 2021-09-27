"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFromString = exports.isBlob = exports.isFormData = exports.isFile = exports.isObject = void 0;
var qs_1 = require("./qs");
/**
 * isObject test.
 */
var isObject = function (obj) {
    return typeof obj === 'object';
};
exports.isObject = isObject;
/**
 * isFile test.
 */
var isFile = function (obj) {
    return toString.call(obj) === '[object File]';
};
exports.isFile = isFile;
/**
 * isFormData test.
 */
var isFormData = function (obj) {
    return toString.call(obj) === '[object FormData]';
};
exports.isFormData = isFormData;
/**
 * isBlob test.
 */
var isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
};
exports.isBlob = isBlob;
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
var urlFromString = function (url, params) {
    if (params === void 0) { params = {}; }
    return url + "?" + (0, qs_1.stringify)(params);
};
exports.urlFromString = urlFromString;
//# sourceMappingURL=index.js.map