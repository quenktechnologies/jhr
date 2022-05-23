"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentContainer = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const __1 = require("../");
/**
 * DocumentContainer uses `document.cookie` as its backing store.
 *
 * This Container is meant to be used in the browser typically with the
 * XHRTransport.
 */
class DocumentContainer {
    constructor(store = document, cookies = {}) {
        this.store = store;
        this.cookies = cookies;
    }
    static create(store = document) {
        return new DocumentContainer(store, (0, __1.fromCookieHeader)(store.cookie));
    }
    getCookies() {
        return (0, record_1.make)(this.cookies);
    }
    getCookie(name) {
        return (0, __1.getCookieByName)(this.cookies, name);
    }
    /**
     * setCookies ignores the provided cookie string and ALWAYS reads from
     * the document.
     */
    setCookies(_) {
        this.cookies = (0, __1.fromCookieHeader)(this.store.cookie);
        return this;
    }
}
exports.DocumentContainer = DocumentContainer;
//# sourceMappingURL=document.js.map