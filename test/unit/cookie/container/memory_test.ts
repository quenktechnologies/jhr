import { assert } from '@quenk/test/lib/assert';

import { MemoryContainer } from '../../../../lib/cookie/container/memory';
import { Cookies } from '../../../../lib/cookie';

const now = new Date();

const cookies = (): Cookies => ({

    'one;;;;/': {

        name: 'one',

        value: '111',

        created: now

    },

    'two;;;;/': {

        name: 'two',

        value: '222',

        created: now

    },

    'three;;;;/': {

        name: 'three',

        value: '333',

        created: now

    }

});

describe('memory', () => {

    describe('MemoryContainer', () => {

        describe('getCookie', () => {

            it('should return the cookie by name', () => {

                let mc = new MemoryContainer(cookies());

                assert(mc.getCookie('two').get())
                    .equate(cookies()['two;;;;/']);

            });

        });

        describe('getCookies', () => {

            it('should return all cookies', () => {

                let mc = new MemoryContainer(cookies());
                assert(mc.getCookies()).equate(cookies());

            });

        });

        describe('setCookies', () => {

            it('should update the internal database', () => {

                let mc = MemoryContainer.create();

                let headers = [

                    'One=1; Path=/',
                    'Two=2; HTTPOnly; SameSite=Strict',
                    'Three=3;;;;araer'
                ];

                mc.setCookies(headers);

                delete mc.cookies['One;;;;/']['created'];
                delete mc.cookies['Two;;;;']['created'];
                delete mc.cookies['Three;;;;']['created'];

                assert(mc.cookies).equate({

                    'One;;;;/': {

                        name: 'One',

                        value: '1',

                        path: '/'

                    },
                    'Two;;;;': {

                        name: 'Two',

                        value: '2',

                        httpOnly: true,

                        sameSite: 'strict'

                    },
                    'Three;;;;': {

                        name: 'Three',

                        value: '3',

                    }
                });

            });

        });

    });

});
