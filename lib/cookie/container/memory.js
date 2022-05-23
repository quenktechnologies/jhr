"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryContainer = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const array_1 = require("@quenk/noni/lib/data/array");
const parser_1 = require("../parser");
const __1 = require("../");
/**
 * MemoryContainer stores cookie values in memory.
 */
class MemoryContainer {
    constructor(cookies = {}) {
        this.cookies = cookies;
    }
    /**
     * create a new MemoryContainer instance.
     *
     * An array of Set-Cookie header values can be passed to intialize the
     * internal store.
     */
    static create(headers = []) {
        return new MemoryContainer((0, __1.fromList)((0, array_1.compact)(headers.map(parser_1.parseCookie))));
    }
    getCookie(name) {
        return (0, __1.getCookieByName)(this.cookies, name);
    }
    getCookies() {
        return (0, record_1.make)(this.cookies);
    }
    setCookies(str) {
        let unfiltered = str.map(s => (0, parser_1.parseCookie)(s));
        let filtered = unfiltered.filter(c => c != null);
        let cookies = (0, record_1.merge)(this.cookies, (0, __1.fromList)(filtered));
        let now = new Date();
        this.cookies = (0, record_1.filter)(cookies, c => willKeep(now, c));
        return this;
    }
}
exports.MemoryContainer = MemoryContainer;
const willKeep = (now, c) => {
    if (c.maxAge)
        return ((now.getTime() / 1000) - c.created.getTime()) <= c.maxAge;
    else if (c.expires)
        return now <= c.expires;
    else
        return true;
};
//# sourceMappingURL=memory.js.map