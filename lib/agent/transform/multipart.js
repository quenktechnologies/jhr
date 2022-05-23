"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipartTransform = void 0;
const either_1 = require("@quenk/noni/lib/data/either");
/**
 * MultipartTransform transforms data into the multi part format.
 */
class MultipartTransform {
    constructor() {
        this.type = 'multipart/form-data';
    }
    apply(body) {
        return (0, either_1.right)(body);
    }
}
exports.MultipartTransform = MultipartTransform;
//# sourceMappingURL=multipart.js.map