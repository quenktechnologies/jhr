import assert from 'assert';
import must from 'must';

import JSONTransform from '../src/JSONTransform';

var trn;

beforeEach(function() {

    trn = new JSONTransform();
})

describe('JSONTransform.parseRequestBody()', function() {

    it('should not transform numbers', function() {
        assert(1 === trn.parseRequestBody(1));
    })

    it('should not transform strings', function() {
        assert('{a:true}' === trn.parseRequestBody('{a:true}'));
    })

    it('should turn objects to strings', function() {
        assert('{"a":true}' === trn.parseRequestBody({a:true}));
    })

    it('should preserve dates', function() {
        assert('{"a":"2015-05-05T23:42:03.399Z"}' === trn.parseRequestBody({a:new Date('2015-05-05T23:42:03.399Z')}));
    })

});

describe('JSONTransform.parseResponseBody()', function() {
    it('should turn json strings to objects', function() {
        must({a:true}).eql(trn.parseResponseBody('{"a":true}'));
    })
});
