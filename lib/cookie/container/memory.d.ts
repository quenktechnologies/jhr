import { Future } from '@quenk/noni/lib/control/monad/future';
import { Options, Value, Cookies } from '../';
import { Container } from './';
/**
 * MemoryContainer stores cookie values in memory.
 */
export declare class MemoryContainer implements Container {
    cookies: string;
    defaults: Options;
    constructor(cookies?: string, defaults?: Options);
    set(name: string, value: Value, opts?: Options): Future<Container>;
    /**
     * update the internal cookie string representation.
     */
    update(cookies: string): Future<Container>;
    get(name: string): Future<Value>;
    getCookie(name: string): Value;
    /**
     * getAll the cookies as a map.
     */
    getAll(): Future<Cookies>;
}
