import * as assert from 'assert';
import * as must from 'must';
import { JSONTransform } from '../../../lib/agent';

var trn;

beforeEach(function() {

    trn = new JSONTransform();
})

describe('JSONTransform', () => {

    describe('#transformRequestBody()', () => {

        it('should transform numbers', () =>
            trn.transformRequestBody(1).then(value => assert(value === '1')))

        it('should not transform strings', () =>
            trn.transformRequestBody('{a:true}').then(value => assert(value === '{a:true}')))

        it('should turn objects to strings', () =>
            trn.transformRequestBody({ a: true }).then(value => assert(value === '{"a":true}')));

        it('should preserve dates', () =>
            trn.transformRequestBody({
                a: new Date('2015-05-05T23:42:03.399Z')
            })
                .then(value => assert(value === '{"a":"2015-05-05T23:42:03.399Z"}')))

    })

    describe('#transformResponseBody()', () =>

        it('should turn json strings to objects', () =>
            trn
                .transformResponseBody('{"a":true}')
                .then(value => must(value).eql({ a: true }))))


});
