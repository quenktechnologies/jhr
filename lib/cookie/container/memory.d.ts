import { Future } from '@quenk/noni/lib/control/monad/future';
import { Options, Cookies } from '../';
import { Container } from './';
/**
 * MemoryContainer stores cookie values in memory.
 */
export declare class MemoryContainer implements Container {
    cookies: string;
    defaults: Options;
    constructor(cookies?: string, defaults?: Options);
    set(name: string, value: string, opts?: Options): Future<Container>;
    get(name: string): Future<string>;
    /**
     * getAll the cookies as a map.
     */
    getAll(): Future<Cookies>;
    /**
     * update the internal cookie string representation.
     */
    update(cookies: string): Future<Container>;
    getCookie(name: string): string;
}
