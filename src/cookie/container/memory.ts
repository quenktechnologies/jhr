import { make, filter, merge } from '@quenk/noni/lib/data/record';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';

import { parseCookie } from '../parser';
import { 
  Cookie,
  Cookies, 
  SetCookieHeader,
  fromCookieHeader,
fromList
} from '../';
import { Container } from './';

/**
 * MemoryContainer stores cookie values in memory.
 */
export class MemoryContainer implements Container {

    constructor(public cookies: Cookies = {}) { }

    static create(store: HTMLDocument): MemoryContainer {

        return new MemoryContainer(fromCookieHeader(store.cookie));

    }

    getCookies(): Cookies {

        return make(this.cookies);

    }

    getCookie(name: string): Maybe<Cookie> {

        return fromNullable(this.cookies[name]);

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
