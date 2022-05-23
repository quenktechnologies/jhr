"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@quenk/test/lib/assert");
const browser_1 = require("../../../../lib/browser");
describe('browser', () => {
    describe('splitUrl', () => {
        it('should work with domain alone', () => {
            (0, assert_1.assert)((0, browser_1.splitUrl)('localhost:8080')).equate([
                'localhost:8080',
                '/'
            ]);
        });
        it('should work with domain and path', () => {
            (0, assert_1.assert)((0, browser_1.splitUrl)('localhost:8080/path/to')).equate([
                'localhost:8080',
                '/path/to'
            ]);
        });
        it('should work when the protocol is present', () => {
            (0, assert_1.assert)((0, browser_1.splitUrl)('http://localhost/path/to')).equate([
                'localhost',
                '/path/to'
            ]);
            (0, assert_1.assert)((0, browser_1.splitUrl)('http://localhost')).equate([
                'localhost',
                '/'
            ]);
        });
    });
});
//# sourceMappingURL=browser_test.js.map