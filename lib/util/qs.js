"use strict";
/* Based on code from https://github.com/ljharb/qs/blob/master/lib/stringify.js
 * See LICENSE file for copyright information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.formats = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const percentTwenties = /%20/g;
const Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};
/**
 * @private
 */
exports.formats = (0, record_1.assign)({
    'default': Format.RFC3986,
    formatters: {
        RFC1738: (value) => replace.call(value, percentTwenties, '+'),
        RFC3986: String
    }
}, Format);
const arrayPrefixGenerators = {
    brackets: (prefix) => prefix + '[]',
    comma: 'comma',
    indices: (prefix, key) => prefix + '[' + key + ']',
    repeat: (prefix) => prefix
};
const has = Object.prototype.hasOwnProperty;
const replace = String.prototype.replace;
const isArray = Array.isArray;
const push = Array.prototype.push;
const pushToArray = (arr, valueOrArray) => {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};
const toISO = Date.prototype.toISOString;
const defaultFormat = exports.formats['default'];
const hexTable = (function () {
    let array = [];
    for (let i = 0; i < 256; ++i)
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    return array;
}());
const utilsEncode = (str, _, charset) => {
    // This code was originally written by Brian White (mscdex) for the io.js
    // core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }
    let string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    }
    else if (typeof str !== 'string') {
        string = String(str);
    }
    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }
    let out = '';
    for (let i = 0; i < string.length; ++i) {
        let c = string.charCodeAt(i);
        if (c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }
        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }
        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] +
                hexTable[0x80 | (c & 0x3F)]);
            continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)]);
            continue;
        }
        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }
    return out;
};
const utilsMaybeMap = (val, fn) => {
    if (isArray(val)) {
        let mapped = [];
        for (let i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};
const utilsIsBuffer = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};
const isNonNullishPrimitive = (v) => typeof v === 'string'
    || typeof v === 'number'
    || typeof v === 'boolean'
    || typeof v === 'symbol'
    || typeof v === 'bigint';
const defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utilsEncode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: exports.formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: (date) => toISO.call(date),
    skipNulls: false,
    strictNullHandling: false
};
function doStringify(target, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
    let obj = target;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    }
    else if (obj instanceof Date) {
        obj = serializeDate(obj);
    }
    else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utilsMaybeMap(obj, function (value) {
            if (value instanceof Date) {
                return new String(serializeDate(value));
            }
            return value;
        });
    }
    if (obj === null) {
        if (strictNullHandling) {
            return encoder &&
                !encodeValuesOnly ?
                encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }
        obj = '';
    }
    if (isNonNullishPrimitive(obj) || utilsIsBuffer(obj)) {
        if (encoder) {
            let keyValue = encodeValuesOnly ?
                prefix :
                encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '='
                    + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }
    let values = [];
    if (typeof obj === 'undefined') {
        return values;
    }
    let objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    }
    else if (isArray(filter)) {
        objKeys = filter;
    }
    else {
        let keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }
    for (let i = 0; i < objKeys.length; ++i) {
        let key = objKeys[i];
        let value = typeof key === 'object' &&
            key.value !== undefined ? key.value : obj[key];
        if (skipNulls && value === null) {
            continue;
        }
        let keyPrefix = isArray(obj) ?
            typeof generateArrayPrefix === 'function' ?
                generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');
        pushToArray(values, doStringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
    }
    return values;
}
;
const normalizeStringifyOptions = (opts) => {
    if (!opts) {
        return defaults;
    }
    if (opts.encoder !== null &&
        opts.encoder !== undefined &&
        typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }
    let charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' &&
        opts.charset !== 'utf-8' &&
        opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8,' +
            ' iso-8859-1, or undefined');
    }
    let format = exports.formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(exports.formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    let formatter = exports.formats.formatters[format];
    let filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }
    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ?
            opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ?
            defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ?
            opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ?
            defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ?
            opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ?
            opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ?
            opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ?
            opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ?
            opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ?
            opts.sort : undefined,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ?
            opts.strictNullHandling : defaults.strictNullHandling
    };
};
/**
 * stringify the target object into a valid query string.
 */
function stringify(target, opts = {}) {
    let obj = target;
    let options = normalizeStringifyOptions(opts);
    let objKeys;
    let filter;
    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    }
    else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }
    let keys = [];
    if (typeof obj !== 'object' || obj === null) {
        return '';
    }
    let arrayFormat;
    if (opts && opts.arrayFormat && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    }
    else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    }
    else {
        arrayFormat = 'indices';
    }
    let generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (!objKeys) {
        objKeys = Object.keys(obj);
    }
    if (options.sort) {
        objKeys.sort(options.sort);
    }
    for (let i = 0; i < objKeys.length; ++i) {
        let key = objKeys[i];
        if (options.skipNulls && (obj)[key] === null) {
            continue;
        }
        pushToArray(keys, doStringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : undefined, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
    }
    let joined = keys.join(options.delimiter);
    let prefix = options.addQueryPrefix === true ? '?' : '';
    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), 
            // the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        }
        else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }
    return joined.length > 0 ? prefix + joined : '';
}
exports.stringify = stringify;
;
//# sourceMappingURL=qs.js.map