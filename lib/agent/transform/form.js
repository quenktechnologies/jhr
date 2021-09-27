"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormTransform = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const either_1 = require("@quenk/noni/lib/data/either");
/**
 * FormTransform transforms an object into the default format
 * browsers used for form submission.
 */
class FormTransform {
    constructor() {
        this.type = 'application/x-www-form-urlencoded';
    }
    apply(body) {
        return (0, either_1.right)((0, record_1.reduce)(body, [], (p, c, k) => p.concat(encodeURIComponent(k) + '=' + encodeURIComponent(c)))
            .join('&'));
    }
}
exports.FormTransform = FormTransform;
//# sourceMappingURL=form.js.map