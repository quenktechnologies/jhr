import { assert } from '@quenk/test/lib/assert';

import { parseCookie } from '../../../lib/cookie/parser';

interface Case {

    name: string,

    input: () => string,

    output: () => any

}

const tests: Case[] = [
    {

        name: 'should parse a Set-Cookie string',

        input: () => 'alpha=beta; Domain=example.com; Path=/foo; ' +
            'Expires=Tue, 19 Jan 2030 00:00:00 GMT; HttpOnly; SameSite=Lax',

        output: () => ({

            name: 'alpha',

            value: 'beta',

            domain: 'example.com',

            path: '/foo',

            httpOnly: true,

            sameSite: 'lax',

            expires: new Date(Date.UTC(2030, 0, 19, 0, 0, 0, 0))

        })

    },
    {

        name: 'should ignore unknown parts',

        input: () => 'bsid=xfazw; domain=example.com; path=/; cake',

        output: () => ({

            name: 'bsid',

            value: 'xfazw',

            domain: 'example.com',

            path: '/',

        })

    },
    {

        name: 'should parse a cookie without attributes',

        input: () => 'bsid=xfazw',

        output: () => ({

            name: 'bsid',

            value: 'xfazw',

        })

    }
];

const runCase = (c: Case) => {

    it(c.name, () => {

        let a = JSON.parse(JSON.stringify(parseCookie(c.input())));
        let b = JSON.parse(JSON.stringify(c.output()));

        delete a.created;
        assert(a).equate(b);

    });

}

describe('parser', () => {

    tests.forEach(c => runCase(c));

});
