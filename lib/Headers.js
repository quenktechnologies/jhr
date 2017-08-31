"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_TYPE = 'Content-Type';
exports.ACCEPTS = 'Accept';
var parseHeaders = function (headers) {
    /*
     *
     *  Copyright (c) 2014 David Björklund
     *
     *  This software is released under the MIT license:
     *
     *  Permission is hereby granted, free of charge, to any person obtaining a copy
     *  of this software and associated documentation files (the "Software"), to deal
     *  in the Software without restriction, including without limitation the rights
     *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     *  copies of the Software, and to permit persons to whom the Software is
     *  furnished to do so, subject to the following conditions:
     *
     *  The above copyright notice and this permission notice shall be included in
     *  all copies or substantial portions of the Software.
     *
     *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     *  THE SOFTWARE.
     *
     */
    if (!headers)
        return {};
    var result = {};
    headers.trim().split('\n').forEach(function (row) {
        var index = row.indexOf(':');
        var key = row.slice(0, index).toLowerCase().trim();
        var value = row.slice(index + 1).trim();
        if (typeof (result[key]) === 'undefined') {
            result[key] = value;
        }
        else if (Array.isArray(result[key])) {
            result[key].push(value);
        }
        else {
            result[key] = [result[key], value];
        }
    });
    return result;
};
/**
 * parse a string of headers into an object.
 */
exports.parse = function (str) { return parseHeaders(str); };
/**
 * set headers on an XMLHttpRequest object.
 */
exports.set = function (xhr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = args.length;
    if (args.length > 0)
        while (i--)
            if (i !== 0)
                Object.keys(args[i]).forEach(function (k) {
                    if (args[i][k] != null)
                        xhr.setRequestHeader(k, args[i][k]);
                });
};
//# sourceMappingURL=Headers.js.map