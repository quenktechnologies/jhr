import assert from 'assert';
import must from 'must';
import Promise from 'bluebird';

import Response from '../../src/Response';
import ClientError from '../../src/ClientError';
import ServerError from '../../src/ServerError';
import TransportError from '../../src/TransportError';
import XHRTransport from '../../src/XHRTransport';

var trn;

describe('XHRTransport.send()', function () {

    beforeEach(function () {

        trn = new XHRTransport({

            transformRequestBody(body) {
                return body;
            },
            transformResponseBody(body) {
                return body;
            }
        });

    });

    it('should detect ok status requests', function (done) {

        var expected = [200, 201, 204];
        var results = [];

        var list = expected.map(function (code) {

            return trn.send('GET', '/status/' + code).
                then(function (res) {

                    assert(res  instanceof Response);
                    results.push(res);

                });

        });

        return Promise.all(list).
            then(function () {
                assert(results.length === expected.length);
                done();
            });

    });

    it('should detect client error status requests', function (done) {

        var expected = [400, 401, 403, 404, 405, 409];
        var results = [];

        var list = expected.map(function (code) {

            return trn.send('GET', '/status/' + code).
                catch(function (e) {
                    assert(e instanceof ClientError);
                    results.push(e);
                });

        });

        return Promise.all(list).
            then(function () {
                assert(expected.length === results.length);
                done();
            });
    });

    it('should detect server error status requests', function (done) {

        return trn.send('GET', '/status/500').
            then(function () {
                assert(false)
            }).
            catch(function (e) {
                assert(e instanceof ServerError);
                assert(e.status === 500);
                done();
            })

    });

    it('should detect transport errors', function (done) {

        return trn.send('GET', 'http://google.com').
            then(function () {
                assert(false);
            }).
            catch(function (e) {
                assert(e instanceof TransportError);
                done();
            });

    });

    it('should send the correct body', function (done) {

        var body = '{"email": "me@email.com", "password": "password"}';

        return trn.send('POST', '/login', body).
            then(function (res) {

                assert(res.status === 204);

                return trn.send('PUT', '/login', body).
                    then(function (res) {
                        assert(res.status === 204);
                        done();
                    })

            }).catch(done);
    });

    it('should provide the correct body', function (done) {

        return trn.send('GET', '/json').
            then(function (res) {
                assert(res.data === '{"a":true,"b":false,"c":1,"d":"1"}');
                done();
            }).catch(done);

    });

    it('should return the XSRF TOKEN as a header ', function (done) {

        return trn.send('GET', '/csrfProtected').
            then(function(res) {
                console.log('csrf ', res.headers);
                console.log('all the cpploes ',document.cookies);
                return trn.send('POST','/csrfProtected').
                    then(function(res) {
                        assert(res.status === 204);
                        done();
                    })
            }).catch(done);


    })


});