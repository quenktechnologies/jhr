"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * MultipartTransform
 */
var MultipartTransform = /** @class */ (function () {
    function MultipartTransform() {
        this.type = 'multipart/form-data';
    }
    MultipartTransform.prototype.apply = function (body) {
        return either_1.right(body);
    };
    return MultipartTransform;
}());
exports.MultipartTransform = MultipartTransform;
//# sourceMappingURL=multipart.js.map