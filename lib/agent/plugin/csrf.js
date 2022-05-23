"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRFProtectionPlugin = exports.DEFAULT_CSRF_HEADER_NAME = exports.DEFAULT_CSRF_COOKIE_NAME = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const record_1 = require("@quenk/noni/lib/data/record");
exports.DEFAULT_CSRF_COOKIE_NAME = 'xsrf-token';
exports.DEFAULT_CSRF_HEADER_NAME = 'x-xsrf-token';
/**
 * CSRFProtectionPlugin
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
class CSRFProtectionPlugin {
    constructor(cookie = exports.DEFAULT_CSRF_COOKIE_NAME, header = exports.DEFAULT_CSRF_HEADER_NAME) {
        this.cookie = cookie;
        this.header = header;
    }
    beforeRequest(ctx) {
        let mvalue = ctx.cookies.getCookie(this.cookie);
        if (mvalue.isJust())
            ctx.options.headers = (0, record_1.merge)(ctx.options.headers, {
                [this.header]: mvalue.get().value
            });
        return (0, future_1.pure)(ctx);
    }
    afterResponse(r) {
        return (0, future_1.pure)(r);
    }
}
exports.CSRFProtectionPlugin = CSRFProtectionPlugin;
//# sourceMappingURL=csrf.js.map