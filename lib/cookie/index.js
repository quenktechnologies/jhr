"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCookieHeader = exports.getCookieByName = exports.fromList = exports.fromCookieHeader = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
/**
 * fromCookieHeader creates a Cookies map from a string compliant with the
 * value of the Cookie header.
 *
 * Note: Only the name and value is available in this header and as a result
 * only those fields will be available in the individual Cookie objects.
 */
const fromCookieHeader = (str) => {
    let rec = (0, record_1.make)();
    let cookies = str.split(';');
    let created = new Date();
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let cookieLength = cookie.length;
        let delimIdx = cookie.indexOf('=');
        delimIdx = delimIdx < 0 ? cookieLength : delimIdx;
        let name = decodeURIComponent(cookie.substring(0, delimIdx)
            .replace(/^\s+|\s+$/g, ''));
        let value = decodeURIComponent(cookie.substring(delimIdx + 1, cookieLength));
        let c = { name, value, created };
        rec[getPath(c)] = c;
    }
    return rec;
};
exports.fromCookieHeader = fromCookieHeader;
/**
 * fromList constructs a Cookies object from a list of Cookie objects.
 */
const fromList = (list) => list.reduce((p, c) => (0, record_1.merge)(p, { [getPath(c)]: c }), {});
exports.fromList = fromList;
const getPath = (c) => [c.name, c.domain, c.path].join(';;');
/**
 * getCookieByName retrieves a Cookie object from a map using its name.
 *
 * The path is not considered by this function.
 */
const getCookieByName = (store, name) => (0, record_1.pickValue)(store, c => c.name === name);
exports.getCookieByName = getCookieByName;
/**
 * toCookieHeader converts a Cookies map into a string suitable for use as the
 * value of the Cookie header.
 */
const toCookieHeader = (store) => (0, record_1.mapTo)(store, c => `${c.name}=${c.value}`).join('; ');
exports.toCookieHeader = toCookieHeader;
//# sourceMappingURL=index.js.map