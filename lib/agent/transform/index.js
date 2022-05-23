"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTransform = void 0;
const either_1 = require("@quenk/noni/lib/data/either");
/**
 * NoTransform does not modifiy the data in any way.
 *
 * Defaults to text/html mime type.
 */
class NoTransform {
    constructor(type = 'text/html; charset=utf-8') {
        this.type = type;
    }
    apply(body) {
        return (0, either_1.right)(body);
    }
}
exports.NoTransform = NoTransform;
//# sourceMappingURL=index.js.map