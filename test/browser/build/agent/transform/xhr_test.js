"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var agent_1 = require("../../../../../lib/agent");
var memory_1 = require("../../../../../lib/cookie/container/memory");
var json_1 = require("../../../../../lib/agent/transform/json");
var multipart_1 = require("../../../../../lib/agent/transform/multipart");
var json_2 = require("../../../../../lib/agent/parser/json");
var xhr_1 = require("../../../../../lib/agent/transport/xhr");
var response_1 = require("../../../../../lib/response");
var host = process.env.HOST || 'http://localhost';
var port = process.env.PORT || '2407';
var newAgent = function (h) {
    if (h === void 0) { h = host + ":" + port; }
    return new agent_1.Agent(h, {}, new memory_1.MemoryContainer(), { ttl: 0, tags: [], context: {} }, new xhr_1.XHRTransport('', new json_1.JSONTransform(), new json_2.JSONParser()), []);
};
describe('xhr', function () {
    it('should make successful requests ', function () {
        var codes = [200, 201, 204];
        var expected = [response_1.Ok, response_1.Created, response_1.NoContent];
        var agent = newAgent();
        return future_1.toPromise(future_1.parallel(codes.map(function (code) { return agent.get("/status/" + code); }))
            .map(function (list) { return list.map(function (r, i) { return r instanceof expected[i]; }); }))
            .then(function (results) { return results.reduce(function (_, c) {
            assert_1.assert(c).equal(true);
            return c;
        }, true); });
    });
    it('should detect transport errors', function () {
        return future_1.toPromise(newAgent('hddp://example.com').get('/'))
            .catch(function (e) {
            assert_1.assert(e).be.instance.of(Error);
            assert_1.assert(e.message).equal('TransportError');
        });
    });
    it('should send the correct body', function () {
        var body = { "email": "me@email.com", "password": "password" };
        return future_1.toPromise(newAgent().post('/login', body)).
            then(function (res) {
            assert_1.assert(res.code).equal(200);
        });
    });
    it('should provide the correct body', function () {
        return future_1.toPromise(newAgent().get('/json'))
            .then(function (res) {
            assert_1.assert(res.body).equate({
                "a": true, "b": false, "c": 1, "d": "1"
            });
        });
    });
    it('should work with multiparts', function () {
        var fd = new FormData();
        var agent = newAgent()
            .setTransport(new xhr_1.XHRTransport('', new multipart_1.MultipartTransform(), new json_2.JSONParser()));
        fd.append('filename', 'somefile');
        fd.append('file', new Blob(['some file']));
        return future_1.toPromise(agent.post('/file', fd))
            .then(function (res) {
            assert_1.assert(res.code).equal(204);
        });
    });
});
//# sourceMappingURL=xhr_test.js.map