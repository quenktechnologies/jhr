"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var error_1 = require("@quenk/noni/lib/control/error");
var either_1 = require("@quenk/noni/lib/data/either");
var defaultOptions = {
    prefix: /^\)\]\}',?\n/,
    lenient: false
};
/**
 * JSONParser parse a string representing a request body into an object.
 *
 * The optional options argument can be specified to modify its behaviour.
 */
var JSONParser = /** @class */ (function () {
    function JSONParser(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.responseType = '';
        this.accepts = 'application/json';
        this.opts = record_1.merge(defaultOptions, this.options);
    }
    JSONParser.prototype.apply = function (body) {
        var _a = this.opts, prefix = _a.prefix, lenient = _a.lenient;
        var str = body.replace(prefix, '');
        var eresult = error_1.attempt(function () { return JSON.parse(str); });
        return (eresult.isLeft() && lenient) ? either_1.right({}) : eresult;
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;
//# sourceMappingURL=json.js.map