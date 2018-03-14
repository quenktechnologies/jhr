import * as Promise from 'bluebird';
import { merge } from 'afpl/lib/util';
import { OutgoingHeaders } from '../header';
import { Envelope } from '../agent';

export { XHRTransport } from './XHRTransport';

/**
 * Options for the CSRF adapter.
 */
export type Options = { cookie: string, header: string };

/**
 * csrfAdapter for automatically updating a header used for CSRF 
 * protection based on a cookie value.
 */
export const csrfAdapter = <O, I>(o: Options) => (e: Envelope<O, I>)
    : Promise<Envelope<O, I>> =>
    Promise
        .resolve(
        e
            .agent
            .cookies.get(o.cookie)
            .then((value: string) => {

                if (value)
                    e.headers = merge<OutgoingHeaders, OutgoingHeaders>(e.headers, {
                        [o.header]: value
                    });

                return Promise.resolve(e);

            }));
