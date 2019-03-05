import { Future } from '@quenk/noni/lib/control/monad/future';
import { Cookies, Options } from '../';
/**
 * Container for cookies received.
 *
 * Depending on the implementation, values stored here may be
 * immutable or not.
 */
export interface Container {
    /**
     * set the value of a cookie.
     */
    set(name: string, value: string, options: Options): Future<Container>;
    /**
     * get the value of a cookie within the Container.
     */
    get(name: string): Future<string>;
    /**
     * getAll the cookies in the Container as a map.
     */
    getAll(): Future<Cookies>;
    /**
     * update the value of the string used to store cookies.
     */
    update(cookies: string): Future<Container>;
}
