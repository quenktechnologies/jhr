"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentContainer = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var __1 = require("../");
/**
 * DocumentContainer uses `document.cookie` as its backing store.
 *
 * This Container is meant to be used in the browser typically with the
 * XHRTransport.
 */
var DocumentContainer = /** @class */ (function () {
    function DocumentContainer(store, cookies) {
        if (store === void 0) { store = document; }
        if (cookies === void 0) { cookies = {}; }
        this.store = store;
        this.cookies = cookies;
    }
    DocumentContainer.create = function (store) {
        if (store === void 0) { store = document; }
        return new DocumentContainer(store, (0, __1.fromCookieHeader)(store.cookie));
    };
    DocumentContainer.prototype.getCookies = function () {
        return (0, record_1.make)(this.cookies);
    };
    DocumentContainer.prototype.getCookie = function (name) {
        return (0, __1.getCookieByName)(this.cookies, name);
    };
    /**
     * setCookies ignores the provided cookie string and ALWAYS reads from
     * the document.
     */
    DocumentContainer.prototype.setCookies = function (_) {
        this.cookies = (0, __1.fromCookieHeader)(this.store.cookie);
        return this;
    };
    return DocumentContainer;
}());
exports.DocumentContainer = DocumentContainer;
//# sourceMappingURL=document.js.map