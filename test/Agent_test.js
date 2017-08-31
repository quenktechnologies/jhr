import assert from 'assert';
import must from 'must';
import * as Promise from 'bluebird';
import { Agent, Response, CSRFAdapter } from '../lib/Agent';
import { InternalServerError, TransportError } from '../lib/Errors';

var agent;

describe('Agent', function() {

    beforeEach(function() {

        agent = new Agent({

            contentType: 'application/json',
            accepts: 'application/json',

            parseRequestBody(body) {

                return JSON.stringify(body);

            },
            parseResponseBody(body) {

                return body? JSON.parse(body) : null;

            }
        });

        agent.add(new CSRFAdapter('xsrf-token', 'xsrf-token'));

    });

    it('should make successful requests ', function() {

        var expected = [200, 201, 204];

        return Promise.all(expected.map(function(code) {

            return agent.get(`/status/${code}`).
            then(function(res) {

                assert(res instanceof Response);
                return res.status;

            });

        })).
        then(function(results) {

            must(results).eql(expected);

        });

    });

    it('should recognize client errors.', function() {

        var expected = [400, 401, 403, 404, 405, 409];
        var results = [];

        return Promise.all(expected.map(function(code) {

            return agent.get(`/status/${code}`).
            then(function(res) {

                must.be.true(false);

            }).
            catch(e => e.status);

        })).
        then(function(results) {

            must(results).eql(expected);

        });

    });

    it('should detect transport errors', function() {

        return agent.get('hddp://google.com').
        then(function() {

            must.be.true(false);

        }).
        catch(function(e) {

            must(e).be.instanceOf(TransportError);

        });

    });

    it('should send the correct body', function() {

        var body = { "email": "me@email.com", "password": "password" };

        return agent.post('/login', body).
        then(function(res) {

            must(res.status).be(204);

            return agent.put('/login', body).
            then(function(res) {

                must(res.status).be(204);

            });

        });
    });

    it('should provide the correct body', function() {

        return agent.get('/json').
        then(function(res) {
            must(res.body).eql({ "a": true, "b": false, "c": 1, "d": "1" });
        });

    });

    it('should send the CSRF token in a header', function() {

        return agent.get('/csrfProtected').
        then(function(res) {
            return agent.post('/csrfProtected').
            then(function(res) {

                must(res.status).be(204);

            })
        });

    });

});
