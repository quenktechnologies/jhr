"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var _defaults = { expires: 365, domain: '', path: '/', secure: true, httpOnly: false };
/**
 * MemJar stores cookie values in memory.
 */
var MemJar = /** @class */ (function () {
    function MemJar(cookies, defaults) {
        if (cookies === void 0) { cookies = ''; }
        if (defaults === void 0) { defaults = _defaults; }
        this.cookies = cookies;
        this.defaults = defaults;
    }
    MemJar.prototype.set = function (name, value, opts) {
        var defaults = this.defaults;
        // Apply default value for unspecified options
        var expires = opts.expires || defaults.expires;
        var domain = opts.domain || defaults.domain;
        var path = opts.path !== undefined ? opts.path : (defaults.path !== undefined ? defaults.path : '/');
        var secure = opts.secure !== undefined ? opts.secure : defaults.secure;
        var httpOnly = opts.httpOnly !== undefined ? opts.httpOnly : defaults.httpOnly;
        // Determine cookie expiration date
        // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
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
        return Promise.resolve(this);
    };
    MemJar.prototype.get = function (name) {
        return Promise.resolve(this.getCookie(name));
    };
    /**
     * getAll the cookies as a map.
     */
    MemJar.prototype.getAll = function () {
        var _this = this;
        var o = {};
        this
            .cookies
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
            .split(/\s*(?:\=[^;]*)?;\s*/)
            .forEach(function (k) { o[k] = _this.getCookie(k); });
        return Promise.resolve(o);
    };
    /**
     * update the internal cookie string representation.
     */
    MemJar.prototype.update = function (cookies) {
        this.cookies = cookies;
        return Promise.resolve(this);
    };
    MemJar.prototype.getCookie = function (name) {
        var cookies = this.cookies.split(';');
        // Iterate all cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var cookieLength = cookie.length;
            // Determine separator index ("name=value")
            var separatorIndex = cookie.indexOf('=');
            // IE<11 emits the equal sign when the cookie value is empty
            separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;
            // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
            if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) === name) {
                return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
            }
        }
        return '';
    };
    return MemJar;
}());
exports.MemJar = MemJar;
//# sourceMappingURL=MemJar.js.map