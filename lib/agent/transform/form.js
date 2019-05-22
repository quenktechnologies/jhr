"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = require("@quenk/noni/lib/data/record");
var either_1 = require("@quenk/noni/lib/data/either");
/**
 * FormTransform transforms an object into the default format
 * browsers used for form submission.
 */
var FormTransform = /** @class */ (function () {
    function FormTransform() {
        this.type = 'application/x-www-form-urlencoded';
    }
    FormTransform.prototype.apply = function (body) {
        return either_1.right(record_1.reduce(body, [], function (p, c, k) {
            return p.concat(encodeURIComponent(k) + '=' + encodeURIComponent(c));
        })
            .join('&'));
    };
    return FormTransform;
}());
exports.FormTransform = FormTransform;
//# sourceMappingURL=form.js.map