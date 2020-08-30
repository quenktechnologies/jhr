import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Cookie, Cookies, SetCookieHeader } from '../';
import { Container } from './';
/**
 * MemoryContainer stores cookie values in memory.
 */
export declare class MemoryContainer implements Container {
    cookies: Cookies;
    constructor(cookies?: Cookies);
    static create(store: HTMLDocument): MemoryContainer;
    getCookies(): Cookies;
    getCookie(name: string): Maybe<Cookie>;
    setCookies(str: SetCookieHeader[]): MemoryContainer;
}
