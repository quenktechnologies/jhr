import assert from 'assert';
import must from 'must';
import Promise from 'bluebird';

import Agent from '../../src/Agent';

var agent;

describe('Agent', function () {

    describe('Agent.get()', function () {

        it('should send query params', function () {

            agent = new Agent({
                send: function (method, url, params) {
                    must(url).
                        equal('/querystring?name=Jun&comments%5B0%5D%5Btype%5D=remark&comments%5B1%5D%5Btype%5D=reply');
                }
            });

            agent.get('/querystring', {name: 'Jun', comments: [{type: 'remark'}, {type: 'reply'}]});
        })

    });
});