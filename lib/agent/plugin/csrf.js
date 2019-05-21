"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
/**
 * CSRFProtectionPlugin
 *
 * This plugin updates the value of a CSRF token header
 * with the current value of a CSRF token cookie no each request.
 */
var CSRFProtectionPlugin = /** @class */ (function () {
    function CSRFProtectionPlugin(cookie, header) {
        this.cookie = cookie;
        this.header = header;
    }
    CSRFProtectionPlugin.prototype.beforeRequest = function (ctx) {
        var _a;
        var value = ctx.cookies.get(this.cookie);
        ctx.headers = record_1.merge(ctx.headers, (_a = {},
            _a[this.header] = value,
            _a));
        return future_1.pure(ctx);
    };
    CSRFProtectionPlugin.prototype.afterResponse = function (r) {
        return future_1.pure(r);
    };
    return CSRFProtectionPlugin;
}());
exports.CSRFProtectionPlugin = CSRFProtectionPlugin;
//# sourceMappingURL=csrf.js.map