"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@quenk/test/lib/assert");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const agent_1 = require("../../../../../../lib/agent");
const memory_1 = require("../../../../../../lib/cookie/container/memory");
const json_1 = require("../../../../../../lib/agent/transform/json");
const multipart_1 = require("../../../../../../lib/agent/transform/multipart");
const json_2 = require("../../../../../../lib/agent/parser/json");
const xhr_1 = require("../../../../../../lib/agent/transport/xhr");
const response_1 = require("../../../../../../lib/response");
const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || '9999';
const newAgent = (h = host) => new agent_1.Agent(h, new memory_1.MemoryContainer(), { ttl: 0, tags: {}, context: {}, port: Number(port) }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []);
describe('xhr', () => {
    it('should make successful requests ', function () {
        let codes = [200, 201, 204];
        let expected = [response_1.Ok, response_1.Created, response_1.NoContent];
        let agent = newAgent();
        return (0, future_1.toPromise)((0, future_1.parallel)(codes.map(code => agent.get(`/status/${code}`)))
            .map(list => list.map((r, i) => r instanceof expected[i])))
            .then(results => results.reduce((_, c) => {
            (0, assert_1.assert)(c).equal(true);
            return c;
        }, true));
    });
    it('should detect transport errors', function () {
        return (0, future_1.toPromise)(newAgent('hddp://example.com').get('/'))
            .catch(function (e) {
            (0, assert_1.assert)(e).be.instance.of(Error);
            (0, assert_1.assert)(e.message).equal('TransportError');
        });
    });
    it('should send the correct body', function () {
        var body = { "email": "me@email.com", "password": "password" };
        return (0, future_1.toPromise)(newAgent().post('/login', body)).
            then(function (res) {
            (0, assert_1.assert)(res.code).equal(200);
        });
    });
    it('should provide the correct body', function () {
        return (0, future_1.toPromise)(newAgent().get('/json'))
            .then(function (res) {
            (0, assert_1.assert)(res.body).equate({
                "a": true, "b": false, "c": 1, "d": "1"
            });
        });
    });
    it('should work with multiparts', function () {
        let fd = new FormData();
        let agent = newAgent()
            .setTransport(new xhr_1.XHRTransport('', new multipart_1.MultipartTransform(), new json_2.JSONParser()));
        fd.append('filename', 'somefile');
        fd.append('file', new Blob(['some file']));
        return (0, future_1.toPromise)(agent.post('/file', fd))
            .then(function (res) {
            (0, assert_1.assert)(res.code).equal(204);
        });
    });
});
//# sourceMappingURL=xhr_test.js.map