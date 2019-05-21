"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var future_1 = require("@quenk/noni/lib/control/monad/future");
var _defaults = {
    expires: 365, domain: '', path: '/', secure: true, httpOnly: false
};
//NOTE: This is originally based on code from another project, unfortunately
// we lost the source.
//
// If you recognize anything here from another project please send an email
// to info@quenk.com so we can update the LICENSE file.
/**
 * MemoryContainer stores cookie values in memory.
 */
var MemoryContainer = /** @class */ (function () {
    function MemoryContainer(cookies, defaults) {
        if (cookies === void 0) { cookies = ''; }
        if (defaults === void 0) { defaults = _defaults; }
        this.cookies = cookies;
        this.defaults = defaults;
    }
    MemoryContainer.prototype.set = function (name, value, opts) {
        if (opts === void 0) { opts = {}; }
        var defaults = this.defaults;
        // Apply default value for unspecified options
        var expires = opts.expires || defaults.expires;
        var domain = opts.domain || defaults.domain;
        var path = opts.path !== undefined ?
            opts.path : (defaults.path !== undefined ? defaults.path : '/');
        var secure = opts.secure !== undefined ? opts.secure : defaults.secure;
        var httpOnly = opts.httpOnly !== undefined ?
            opts.httpOnly : defaults.httpOnly;
        // Determine cookie expiration date
        // If succesful the result will be a valid Date, 
        // otherwise it will be an invalid Date or false(ish)
        var expDate = new Date(new Date().getTime() + (expires * 864e5));
        // Set cookie
        this.cookies = name.replace(/[^+#$&^`|]/g, encodeURIComponent)
            .replace('(', '%28')
            .replace(')', '%29') +
            '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +
            (expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') +
            (domain ? ';domain=' + domain : '') +
            (path ? ';path=' + path : '') +
            (secure ? ';secure' : '') +
            (httpOnly ? ';httponly' : '');
        return future_1.pure(this);
    };
    /**
     * update the internal cookie string representation.
     */
    MemoryContainer.prototype.update = function (cookies) {
        this.cookies = cookies;
        return future_1.pure(this);
    };
    MemoryContainer.prototype.get = function (name) {
        return future_1.pure(this.getCookie(name));
    };
    MemoryContainer.prototype.getCookie = function (name) {
        var cookies = this.cookies.split(';');
        // Iterate all cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var cookieLength = cookie.length;
            // Determine separator index ("name=value")
            var separatorIndex = cookie.indexOf('=');
            // IE<11 emits the equal sign when the cookie value is empty
            separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;
            // Decode the cookie name and remove any leading/trailing spaces, 
            // then compare to the requested cookie name
            if (decodeURIComponent(cookie.substring(0, separatorIndex)
                .replace(/^\s+|\s+$/g, '')) === name) {
                return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
            }
        }
        return '';
    };
    /**
     * getAll the cookies as a map.
     */
    MemoryContainer.prototype.getAll = function () {
        var _this = this;
        var o = {};
        this
            .cookies
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
            .split(/\s*(?:\=[^;]*)?;\s*/)
            .forEach(function (k) { o[k] = _this.getCookie(k); });
        return future_1.pure(o);
    };
    return MemoryContainer;
}());
exports.MemoryContainer = MemoryContainer;
//# sourceMappingURL=memory.js.map