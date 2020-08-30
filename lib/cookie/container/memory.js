"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryContainer = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var parser_1 = require("../parser");
var __1 = require("../");
/**
 * MemoryContainer stores cookie values in memory.
 */
var MemoryContainer = /** @class */ (function () {
    function MemoryContainer(cookies) {
        if (cookies === void 0) { cookies = {}; }
        this.cookies = cookies;
    }
    MemoryContainer.create = function (store) {
        return new MemoryContainer(__1.fromCookieHeader(store.cookie));
    };
    MemoryContainer.prototype.getCookies = function () {
        return record_1.make(this.cookies);
    };
    MemoryContainer.prototype.getCookie = function (name) {
        return maybe_1.fromNullable(this.cookies[name]);
    };
    MemoryContainer.prototype.setCookies = function (str) {
        var unfiltered = str.map(function (s) { return parser_1.parseCookie(s); });
        var filtered = unfiltered.filter(function (c) { return c != null; });
        var cookies = record_1.merge(this.cookies, __1.fromList(filtered));
        var now = new Date();
        this.cookies = record_1.filter(cookies, function (c) { return willKeep(now, c); });
        return this;
    };
    return MemoryContainer;
}());
exports.MemoryContainer = MemoryContainer;
var willKeep = function (now, c) {
    if (c.maxAge)
        return ((now.getTime() / 1000) - c.created.getTime()) <= c.maxAge;
    else if (c.expires)
        return now <= c.expires;
    else
        return true;
};
//# sourceMappingURL=memory.js.map