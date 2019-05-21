"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * StringBufferAdapterParser adapts the buffer list
 * of the NodeHTTPTransport to a string that is passed
 * to another parser for final parsing.
 */
var StringBufferAdapterParser = /** @class */ (function () {
    function StringBufferAdapterParser(parser) {
        this.parser = parser;
        this.accepts = this.parser.accepts;
    }
    StringBufferAdapterParser.prototype.apply = function (raw) {
        return this.parser.apply(raw.map(function (b) { return b.toString('utf8'); }).join(''));
    };
    return StringBufferAdapterParser;
}());
exports.StringBufferAdapterParser = StringBufferAdapterParser;
//# sourceMappingURL=parser.js.map