import { Options, Value, Cookies } from '../';
import { Container } from './';
/**
 * MemoryContainer stores cookie values in memory.
 */
export declare class MemoryContainer implements Container {
    cookies: string;
    defaults: Options;
    constructor(cookies?: string, defaults?: Options);
    set(name: string, value: Value, opts?: Options): Container;
    /**
     * update the internal cookie string representation.
     */
    update(cookies: string): Container;
    get(name: string): Value;
    getCookie(name: string): Value;
    /**
     * getAll the cookies as a map.
     */
    getAll(): Cookies;
    getString(): string;
}
