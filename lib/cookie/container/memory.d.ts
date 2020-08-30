import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Cookie, Cookies, SetCookieHeader } from '../';
import { Container } from './';
/**
 * MemoryContainer stores cookie values in memory.
 */
export declare class MemoryContainer implements Container {
    cookies: Cookies;
    constructor(cookies?: Cookies);
    /**
     * create a new MemoryContainer instance.
     *
     * An array of Set-Cookie header values can be passed to intialize the
     * internal store.
     */
    static create(headers?: SetCookieHeader[]): MemoryContainer;
    getCookie(name: string): Maybe<Cookie>;
    getCookies(): Cookies;
    setCookies(str: SetCookieHeader[]): MemoryContainer;
}
