"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var must = require("must");
var agent_1 = require("../../../lib/agent");
var trn;
beforeEach(function () {
    trn = new agent_1.JSONTransform();
});
describe('JSONTransform', function () {
    describe('#transformRequestBody()', function () {
        it('should transform numbers', function () {
            return trn.transformRequestBody(1).then(function (value) { return assert(value === '1'); });
        });
        it('should not transform strings', function () {
            return trn.transformRequestBody('{a:true}').then(function (value) { return assert(value === '{a:true}'); });
        });
        it('should turn objects to strings', function () {
            return trn.transformRequestBody({ a: true }).then(function (value) { return assert(value === '{"a":true}'); });
        });
        it('should preserve dates', function () {
            return trn.transformRequestBody({
                a: new Date('2015-05-05T23:42:03.399Z')
            })
                .then(function (value) { return assert(value === '{"a":"2015-05-05T23:42:03.399Z"}'); });
        });
    });
    describe('#transformResponseBody()', function () {
        return it('should turn json strings to objects', function () {
            return trn
                .transformResponseBody('{"a":true}')
                .then(function (value) { return must(value).eql({ a: true }); });
        });
    });
});
//# sourceMappingURL=JSONTransform_test.js.map