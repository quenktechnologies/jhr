"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryContainer = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var array_1 = require("@quenk/noni/lib/data/array");
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
    /**
     * create a new MemoryContainer instance.
     *
     * An array of Set-Cookie header values can be passed to intialize the
     * internal store.
     */
    MemoryContainer.create = function (headers) {
        if (headers === void 0) { headers = []; }
        return new MemoryContainer(__1.fromList(array_1.compact(headers.map(parser_1.parseCookie))));
    };
    MemoryContainer.prototype.getCookie = function (name) {
        return __1.getCookieByName(this.cookies, name);
    };
    MemoryContainer.prototype.getCookies = function () {
        return record_1.make(this.cookies);
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