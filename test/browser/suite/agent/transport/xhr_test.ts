import { assert } from '@quenk/test/lib/assert';
import { parallel, toPromise } from '@quenk/noni/lib/control/monad/future';
import { Agent } from '../../../../../lib/agent';
import { MemoryContainer } from '../../../../../lib/cookie/container/memory';
import { JSONTransform } from '../../../../../lib/agent/transform/json';
import { MultipartTransform } from '../../../../../lib/agent/transform/multipart';
import { JSONParser } from '../../../../../lib/agent/parser/json';
import { XHRTransport } from '../../../../../lib/agent/transport/xhr';
import { Ok, Created, NoContent } from '../../../../../lib/response';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || '9999';

const newAgent = (h = `${host}:${port}`) =>
    new Agent(h, {}, new MemoryContainer(),
        { ttl: 0, tags: {}, context: {}, port: 80 },
        new XHRTransport('', new JSONTransform(), new JSONParser()), []);

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

                assert(res.code).equal(200);

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

    it('should work with multiparts', function() {

        let fd = new FormData();

        let agent = newAgent()
            .setTransport(new XHRTransport('',
                new MultipartTransform(), new JSONParser()));

        fd.append('filename', 'somefile');
        fd.append('file', new Blob(['some file']));

        return toPromise(agent.post('/file', fd))
            .then(function(res) {

                assert(res.code).equal(204);

            });

    });

}); 
