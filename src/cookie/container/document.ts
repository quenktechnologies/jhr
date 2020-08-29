import { make } from '@quenk/noni/lib/data/record';
import {Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';

import { SetCookieHeader, Cookie, Cookies, fromCookieHeader } from '../';
import { Container } from './';

/**
 * DocumentContainer uses `document.cookie` as its backing store.
 * 
 * This Container is meant to be used in the browser typically with the
 * XHRTransport.
 */
export class DocumentContainer implements Container {

    constructor(
        public store: HTMLDocument = document,
        public cookies: Cookies = {}) { }

    static create(store: HTMLDocument=document): DocumentContainer {

        return new DocumentContainer(store, fromCookieHeader(store.cookie));

    }

    getCookies(): Cookies {

        return make(this.cookies);

    }

    getCookie(name: string): Maybe<Cookie> {

        return fromNullable(this.cookies[name]);

    }

    /**
     * setCookies ignores the provided cookie string and ALWAYS reads from
     * the document.
     */
    setCookies(_: SetCookieHeader[]): DocumentContainer {

        this.cookies = fromCookieHeader(this.store.cookie);
        return this;

    }

}
