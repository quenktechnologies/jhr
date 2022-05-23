"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const error_1 = require("@quenk/noni/lib/control/error");
const either_1 = require("@quenk/noni/lib/data/either");
const defaultOptions = {
    prefix: /^\)\]\}',?\n/,
    lenient: false
};
/**
 * JSONParser parse a string representing a request body into an object.
 *
 * The optional options argument can be specified to modify its behaviour.
 */
class JSONParser {
    constructor(options = {}) {
        this.options = options;
        this.responseType = '';
        this.accepts = 'application/json';
        this.opts = (0, record_1.merge)(defaultOptions, this.options);
    }
    apply(body) {
        let { prefix, lenient } = this.opts;
        let str = body.replace(prefix, '');
        let eresult = (0, error_1.attempt)(() => JSON.parse(str));
        return (eresult.isLeft() && lenient) ? (0, either_1.right)({}) : eresult;
    }
}
exports.JSONParser = JSONParser;
//# sourceMappingURL=json.js.map