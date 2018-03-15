import * as must from 'must';
import { Agent, JSONTransform } from '../../../../lib/agent';
import { MemJar } from '../../../../lib/cookie';
import { XHRTransport } from '../../../../lib/browser/XHRTransport';
import { Ok, Created, NoContent } from '../../../../lib/response';

var agent;

describe('XHRTransport', function() {

    beforeEach(function() {

        agent = new Agent({}, new MemJar(), new JSONTransform(), [], new XHRTransport());

    });

    it('should make successful requests ', function() {

        let codes = [200, 201, 204];
        let expected = [Ok, Created, NoContent];

        return Promise
            .all(codes.map(code => agent.get(`http://localhost:8000/status/${code}`)))
            .then(list => list.map((r, i) => r instanceof expected[i]))
            .then(results => results.reduce((_, c) => { must(c).eql(true); return c; }, true))

    });

    it('should detect transport errors', function() {

        return agent
            .get('hddp://google.com')
            .catch(function(e) {

                must(e).be.instanceOf(Error);

            });

    });

    it('should send the correct body', function() {

        var body = { "email": "me@email.com", "password": "password" };

        return agent.post('http://localhost:8000/login', body).
            then(function(res) {

                must(res.status).eql(200);

            });
    });

    it('should provide the correct body', function() {

        return agent.get('http://localhost:8000/json').
            then(function(res) {
                must(res.body).eql({ "a": true, "b": false, "c": 1, "d": "1" });
            });

    });

}); 
