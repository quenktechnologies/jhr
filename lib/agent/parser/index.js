"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoParser = void 0;
const either_1 = require("@quenk/noni/lib/data/either");
/**
 * NoParser does no actual parsing instead just
 * yielding the data as given.
 */
class NoParser {
    constructor(accepts = '*/*') {
        this.accepts = accepts;
    }
    apply(raw) {
        return (0, either_1.right)(raw);
    }
}
exports.NoParser = NoParser;
//# sourceMappingURL=index.js.map