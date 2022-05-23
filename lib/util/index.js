"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFromString = exports.isBlob = exports.isFormData = exports.isFile = exports.isObject = void 0;
const qs_1 = require("./qs");
/**
 * isObject test.
 */
const isObject = (obj) => typeof obj === 'object';
exports.isObject = isObject;
/**
 * isFile test.
 */
const isFile = (obj) => toString.call(obj) === '[object File]';
exports.isFile = isFile;
/**
 * isFormData test.
 */
const isFormData = (obj) => toString.call(obj) === '[object FormData]';
exports.isFormData = isFormData;
/**
 * isBlob test.
 */
const isBlob = (obj) => toString.call(obj) === '[object Blob]';
exports.isBlob = isBlob;
/**
 * fromString will construct a url optionally merging any parameters passed.
 * @param {string} url
 * @param {object} [params]
 */
const urlFromString = (url, params = {}) => `${url}?${(0, qs_1.stringify)(params)}`;
exports.urlFromString = urlFromString;
//# sourceMappingURL=index.js.map