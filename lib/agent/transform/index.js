"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTransform = void 0;
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * NoTransform does not modifiy the data in any way.
 *
 * Defaults to text/html mime type.
 */
var NoTransform = /** @class */ (function () {
    function NoTransform(type) {
        if (type === void 0) { type = 'text/html; charset=utf-8'; }
        this.type = type;
    }
    NoTransform.prototype.apply = function (body) {
        return either_1.right(body);
    };
    return NoTransform;
}());
exports.NoTransform = NoTransform;
//# sourceMappingURL=index.js.map