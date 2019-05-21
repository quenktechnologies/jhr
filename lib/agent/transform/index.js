"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * NoTransform does not modifiy the data in any way.
 *
 * Defaults to text/html mime type.
 */
var JSONTransform = /** @class */ (function () {
    function JSONTransform(type) {
        if (type === void 0) { type = 'text/html; charset=utf-8'; }
        this.type = type;
    }
    JSONTransform.prototype.apply = function (body) {
        return either_1.right(body);
    };
    return JSONTransform;
}());
exports.JSONTransform = JSONTransform;
//# sourceMappingURL=index.js.map