"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var must = require("must");
var agent_1 = require("../../../../lib/agent");
var cookie_1 = require("../../../../lib/cookie");
var XHRTransport_1 = require("../../../../lib/browser/XHRTransport");
var response_1 = require("../../../../lib/response");
var agent;
describe('XHRTransport', function () {
    beforeEach(function () {
        agent = new agent_1.Agent({}, new cookie_1.MemJar(), new agent_1.JSONTransform(), [], new XHRTransport_1.XHRTransport());
    });
    it('should make successful requests ', function () {
        var codes = [200, 201, 204];
        var expected = [response_1.Ok, response_1.Created, response_1.NoContent];
        return Promise
            .all(codes.map(function (code) { return agent.get("http://localhost:8000/status/" + code); }))
            .then(function (list) { return list.map(function (r, i) { return r instanceof expected[i]; }); })
            .then(function (results) { return results.reduce(function (_, c) { must(c).eql(true); return c; }, true); });
    });
    it('should detect transport errors', function () {
        return agent
            .get('hddp://google.com')
            .catch(function (e) {
            must(e).be.instanceOf(Error);
        });
    });
    it('should send the correct body', function () {
        var body = { "email": "me@email.com", "password": "password" };
        return agent.post('http://localhost:8000/login', body).
            then(function (res) {
            must(res.status).eql(200);
        });
    });
    it('should provide the correct body', function () {
        return agent.get('http://localhost:8000/json').
            then(function (res) {
            must(res.body).eql({ "a": true, "b": false, "c": 1, "d": "1" });
        });
    });
});
//# sourceMappingURL=XHRTransport_test.js.map