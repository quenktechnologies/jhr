import { assert } from '@quenk/test/lib/assert';
import { parallel, toPromise } from '@quenk/noni/lib/control/monad/future';
import { Agent } from '../../../../../lib/agent';
import { MemoryContainer } from '../../../../../lib/cookie/container/memory';
import { JSONTransform } from '../../../../../lib/agent/transform/json';
import { JSONParser } from '../../../../../lib/agent/parser/json';
import { XHRTransport } from '../../../../../lib/agent/transport/xhr';
import { Ok, Created, NoContent } from '../../../../../lib/response';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || '2407';

const newAgent = (h = `${host}:${port}`) =>
    new Agent(h, {}, new MemoryContainer(),
        { ttl: 0, tags: [], context: {} }, new JSONTransform(), new JSONParser(),
        new XHRTransport(), []);

describe('xhr', () => {

    it('should make successful requests ', function() {

        let codes = [200, 201, 204];
        let expected = [Ok, Created, NoContent];
        let agent = newAgent();

        return toPromise(
            parallel(codes.map(code => agent.get(`/status/${code}`)))
                .map(list => list.map((r, i) => r instanceof expected[i])))
            .then(results => results.reduce((_, c) => {

                assert(c).equal(true); return c;

            }, true))

    });

    it('should detect transport errors', function() {

        return toPromise(newAgent('hddp://example.com').get('/'))
            .catch(function(e) {

                assert(e).be.instance.of(Error);
                assert(e.message).equal('TransportError');

            });

    });

    it('should send the correct body', function() {

        var body = { "email": "me@email.com", "password": "password" };

        return toPromise(newAgent().post('/login', body)).
            then(function(res) {

                assert(res.status).equal(200);

            });
    });

    it('should provide the correct body', function() {

        return toPromise(newAgent().get('/json'))
            .then(function(res) {
                assert(res.body).equate({
                    "a": true, "b": false, "c": 1, "d": "1"
                });
            });

    });

}); 
