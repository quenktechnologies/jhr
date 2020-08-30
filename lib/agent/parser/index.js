"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoParser = void 0;
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * NoParser does no actual parsing instead just
 * yielding the data as given.
 */
var NoParser = /** @class */ (function () {
    function NoParser(accepts) {
        if (accepts === void 0) { accepts = '*/*'; }
        this.accepts = accepts;
    }
    NoParser.prototype.apply = function (raw) {
        return either_1.right(raw);
    };
    return NoParser;
}());
exports.NoParser = NoParser;
//# sourceMappingURL=index.js.map