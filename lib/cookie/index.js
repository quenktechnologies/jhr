"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCookieHeader = exports.getCookieByName = exports.fromList = exports.fromCookieHeader = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
/**
 * fromCookieHeader creates a Cookies map from a string compliant with the
 * value of the Cookie header.
 *
 * Note: Only the name and value is available in this header and as a result
 * only those fields will be available in the individual Cookie objects.
 */
var fromCookieHeader = function (str) {
    var rec = (0, record_1.make)();
    var cookies = str.split(';');
    var created = new Date();
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var cookieLength = cookie.length;
        var delimIdx = cookie.indexOf('=');
        delimIdx = delimIdx < 0 ? cookieLength : delimIdx;
        var name_1 = decodeURIComponent(cookie.substring(0, delimIdx)
            .replace(/^\s+|\s+$/g, ''));
        var value = decodeURIComponent(cookie.substring(delimIdx + 1, cookieLength));
        var c = { name: name_1, value: value, created: created };
        rec[getPath(c)] = c;
    }
    return rec;
};
exports.fromCookieHeader = fromCookieHeader;
/**
 * fromList constructs a Cookies object from a list of Cookie objects.
 */
var fromList = function (list) {
    return list.reduce(function (p, c) {
        var _a;
        return (0, record_1.merge)(p, (_a = {}, _a[getPath(c)] = c, _a));
    }, {});
};
exports.fromList = fromList;
var getPath = function (c) { return [c.name, c.domain, c.path].join(';;'); };
/**
 * getCookieByName retrieves a Cookie object from a map using its name.
 *
 * The path is not considered by this function.
 */
var getCookieByName = function (store, name) {
    return (0, record_1.pickValue)(store, function (c) { return c.name === name; });
};
exports.getCookieByName = getCookieByName;
/**
 * toCookieHeader converts a Cookies map into a string suitable for use as the
 * value of the Cookie header.
 */
var toCookieHeader = function (store) {
    return (0, record_1.mapTo)(store, function (c) { return c.name + "=" + c.value; }).join('; ');
};
exports.toCookieHeader = toCookieHeader;
//# sourceMappingURL=index.js.map