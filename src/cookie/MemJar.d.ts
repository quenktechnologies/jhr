import * as Promise from 'bluebird';
import { Jar, CookieOptions, Cookies } from '.';
/**
 * MemJar stores cookie values in memory.
 */
export declare class MemJar implements Jar {
    cookies: string;
    defaults: CookieOptions;
    constructor(cookies?: string, defaults?: CookieOptions);
    set(name: string, value: string, opts: CookieOptions): Promise<MemJar>;
    get(name: string): Promise<string>;
    /**
     * getAll the cookies as a map.
     */
    getAll(): Promise<Cookies>;
    /**
     * update the internal cookie string representation.
     */
    update(cookies: string): Promise<MemJar>;
    getCookie(name: string): string;
}
