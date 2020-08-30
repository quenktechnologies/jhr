import { assert } from '@quenk/test/lib/assert';
import { splitUrl } from '../../../../lib/browser';

describe('browser', () => {

    describe('splitUrl', () => {

        it('should work with domain alone', () => {

            assert(splitUrl('localhost:8080')).equate([
                'localhost:8080',
                '/'
            ]);

        });

        it('should work with domain and path', () => {

            assert(splitUrl('localhost:8080/path/to')).equate([
                'localhost:8080',
                '/path/to'
            ]);

        });

        it('should work when the protocol is present', () => {

            assert(splitUrl('http://localhost/path/to')).equate([

                'localhost',
                '/path/to'

            ]);

            assert(splitUrl('http://localhost')).equate([

                'localhost',
                '/'

            ]);

        });

    });

});
