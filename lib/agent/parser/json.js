"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = void 0;
var error_1 = require("@quenk/noni/lib/control/error");
/**
 * JSONParser
 */
var JSONParser = /** @class */ (function () {
    function JSONParser(prefix) {
        if (prefix === void 0) { prefix = /^\)\]\}',?\n/; }
        this.prefix = prefix;
        this.responseType = '';
        this.accepts = 'application/json';
    }
    JSONParser.prototype.apply = function (body) {
        var _this = this;
        return error_1.attempt(function () {
            if ((body == null) || (body.trim() == ''))
                return {};
            return JSON.parse(body.replace(_this.prefix, ''));
        });
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;
//# sourceMappingURL=json.js.map