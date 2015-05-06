import assert from 'assert';
import must from 'must';

import JSONTransform from '../../src/JSONTransform';

var trn;

beforeEach(function() {

    trn = new JSONTransform();
})

describe('JSONTransform.transformRequestBody()', function() {

    it('should not transform numbers', function() {
        assert(1 === trn.transformRequestBody(1));
    })

    it('should not transform strings', function() {
        assert('{a:true}' === trn.transformRequestBody('{a:true}'));
    })

    it('should turn objects to strings', function() {
        assert('{"a":true}' === trn.transformRequestBody({a:true}));
    })

    it('should preserve dates', function() {
        assert('{"a":"2015-05-05T23:42:03.399Z"}' === trn.transformRequestBody({a:new Date('2015-05-05T23:42:03.399Z')}));
    })

});

describe('JSONTransform.transformResponseBody()', function() {
    it('should turn json strings to objects', function() {
        must({a:true}).eql(trn.transformResponseBody('{"a":true}'));
    })
});