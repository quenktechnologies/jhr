import * as http from 'http';
import * as express from 'express';
import { start } from '../../../../fixtures/server';
import { assert } from '@quenk/test/lib/assert';
import { parallel, toPromise } from '@quenk/noni/lib/control/monad/future';
import { Agent } from '../../../../../lib/agent';
import { MemoryContainer } from '../../../../../lib/cookie/container/memory';
import { JSONTransform } from '../../../../../lib/agent/transform/json';
import { JSONParser } from '../../../../../lib/agent/parser/json';
import {
    StringBufferAdapterParser
} from '../../../../../lib/agent/transport/node/parser';
import { NodeHTTPTransport } from '../../../../../lib/agent/transport/node';
import { Ok, Created, NoContent } from '../../../../../lib/response';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '9999';

const newAgent = (h = host) =>
    new Agent(h, {}, new MemoryContainer(),
        { ttl: 0, tags: {}, context: {}, port: Number(port) },
        new NodeHTTPTransport(
            new JSONTransform(),
            new StringBufferAdapterParser(new JSONParser()),
            new http.Agent()), []);

let app: express.App;

describe('http', () => {

    before(cb => { app = start(p => { console.error(`testing on ${p}.`); cb(); }); })

    after(cb => { app.close(() => cb()); })

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

    it('should maintain cookies', function() {

        let agent = newAgent();

        return toPromise(
            agent
                .get('/cookie')
                .chain(() => agent.post('/cookie', {})))
            .then(function(res) {

                assert(res.code).equal(200);

            });

    });

}); 
