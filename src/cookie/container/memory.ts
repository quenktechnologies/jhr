import { make, filter, merge } from '@quenk/noni/lib/data/record';
import { compact } from '@quenk/noni/lib/data/array';
import { Maybe } from '@quenk/noni/lib/data/maybe';

import { parseCookie } from '../parser';
import {
    Cookie,
    Cookies,
    SetCookieHeader,
    fromList,
    getCookieByName
} from '../';
import { Container } from './';

/**
 * MemoryContainer stores cookie values in memory.
 */
export class MemoryContainer implements Container {

    constructor(public cookies: Cookies = {}) { }

    /**
     * create a new MemoryContainer instance.
     *
     * An array of Set-Cookie header values can be passed to intialize the
     * internal store.
     */
    static create(headers: SetCookieHeader[] = []): MemoryContainer {

        return new MemoryContainer(fromList(compact(headers.map(parseCookie))));

    }

    getCookie(name: string): Maybe<Cookie> {

        return getCookieByName(this.cookies, name);

    }

    getCookies(): Cookies {

        return make(this.cookies);

    }

    setCookies(str: SetCookieHeader[]): MemoryContainer {

        let unfiltered = str.map(s => parseCookie(s));
        let filtered = <Cookie[]>unfiltered.filter(c => c != null);
        let cookies = merge(this.cookies, fromList(filtered));
        let now = new Date();

        this.cookies = filter(cookies, c => willKeep(now, c));
        return this;

    }

}

const willKeep = (now: Date, c: Cookie) => {

    if (c.maxAge)
        return ((now.getTime() / 1000) - c.created.getTime()) <= c.maxAge;
    else if (c.expires)
        return now <= c.expires;
    else
        return true;

}
