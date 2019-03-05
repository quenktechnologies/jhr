"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util");
var error_1 = require("@quenk/noni/lib/control/error");
/**
 * JSONTransform
 */
var JSONTransform = /** @class */ (function () {
    function JSONTransform() {
        this.type = 'application/json;charset=utf-8';
    }
    JSONTransform.prototype.apply = function (body) {
        return error_1.attempt(function () {
            return (util.isObject(body) &&
                !util.isFile(body) &&
                !util.isBlob(body) &&
                !util.isFormData(body)) ?
                JSON.stringify(body) : ('' + body);
        });
    };
    return JSONTransform;
}());
exports.JSONTransform = JSONTransform;
//# sourceMappingURL=json.js.map