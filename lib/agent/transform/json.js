"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONTransform = void 0;
const util = require("../../util");
const error_1 = require("@quenk/noni/lib/control/error");
/**
 * JSONTransform
 */
class JSONTransform {
    constructor() {
        this.type = 'application/json;charset=utf-8';
    }
    apply(body) {
        return (0, error_1.attempt)(() => (util.isObject(body) &&
            !util.isFile(body) &&
            !util.isBlob(body) &&
            !util.isFormData(body)) ?
            JSON.stringify(body) : ('' + body));
    }
}
exports.JSONTransform = JSONTransform;
//# sourceMappingURL=json.js.map