"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipartTransform = void 0;
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * MultipartTransform transforms data into the multi part format.
 */
var MultipartTransform = /** @class */ (function () {
    function MultipartTransform() {
        this.type = 'multipart/form-data';
    }
    MultipartTransform.prototype.apply = function (body) {
        return (0, either_1.right)(body);
    };
    return MultipartTransform;
}());
exports.MultipartTransform = MultipartTransform;
//# sourceMappingURL=multipart.js.map