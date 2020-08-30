import { Maybe } from '@quenk/noni/lib/data/maybe';
import { SetCookieHeader, Cookie, Cookies } from '../';
import { Container } from './';
/**
 * DocumentContainer uses `document.cookie` as its backing store.
 *
 * This Container is meant to be used in the browser typically with the
 * XHRTransport.
 */
export declare class DocumentContainer implements Container {
    store: HTMLDocument;
    cookies: Cookies;
    constructor(store?: HTMLDocument, cookies?: Cookies);
    static create(store?: HTMLDocument): DocumentContainer;
    getCookies(): Cookies;
    getCookie(name: string): Maybe<Cookie>;
    /**
     * setCookies ignores the provided cookie string and ALWAYS reads from
     * the document.
     */
    setCookies(_: SetCookieHeader[]): DocumentContainer;
}
