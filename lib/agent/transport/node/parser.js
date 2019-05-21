"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BufferToStringAdapter adapts the buffer list
 * of the NodeHTTPTransport to a string that is passed
 * to another parser for final parsing.
 */
var BufferToStringAdapter = /** @class */ (function () {
    function BufferToStringAdapter(parser) {
        this.parser = parser;
        this.accepts = this.parser.accepts;
    }
    BufferToStringAdapter.prototype.apply = function (raw) {
        return this.parser.apply(raw.map(function (b) { return b.toString('utf8'); }).join(''));
    };
    return BufferToStringAdapter;
}());
exports.BufferToStringAdapter = BufferToStringAdapter;
//# sourceMappingURL=parser.js.map