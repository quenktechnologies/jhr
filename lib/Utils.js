"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
exports.isObject = function (obj) {
    return typeof obj === 'object';
};
exports.isFile = function (obj) {
    return toString.call(obj) === '[object File]';
};
exports.isFormData = function (obj) {
    return toString.call(obj) === '[object FormData]';
};
exports.isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
};
/**
 * fromString will construct a url mergining any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
exports.urlFromString = function (url, params) {
    if (params === void 0) { params = {}; }
    return url + "?" + qs.stringify(params);
};
//# sourceMappingURL=Utils.js.map