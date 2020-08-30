"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var browser_1 = require("../../../../lib/browser");
describe('browser', function () {
    describe('splitUrl', function () {
        it('should work with domain alone', function () {
            assert_1.assert(browser_1.splitUrl('localhost:8080')).equate([
                'localhost:8080',
                '/'
            ]);
        });
        it('should work with domain and path', function () {
            assert_1.assert(browser_1.splitUrl('localhost:8080/path/to')).equate([
                'localhost:8080',
                '/path/to'
            ]);
        });
        it('should work when the protocol is present', function () {
            assert_1.assert(browser_1.splitUrl('http://localhost/path/to')).equate([
                'localhost',
                '/path/to'
            ]);
            assert_1.assert(browser_1.splitUrl('http://localhost')).equate([
                'localhost',
                '/'
            ]);
        });
    });
});
//# sourceMappingURL=browser_test.js.map