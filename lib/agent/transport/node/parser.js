"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferToStringAdapter = void 0;
/**
 * BufferToStringAdapter adapts the buffer list
 * of the NodeHTTPTransport to a string that is passed
 * to another parser for final parsing.
 */
class BufferToStringAdapter {
    constructor(parser) {
        this.parser = parser;
        this.accepts = this.parser.accepts;
    }
    apply(raw) {
        return this.parser.apply(raw.map(b => b.toString('utf8')).join(''));
    }
}
exports.BufferToStringAdapter = BufferToStringAdapter;
//# sourceMappingURL=parser.js.map