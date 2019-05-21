import { Value, Cookies, Options } from '../';

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
    set(name: string, value: string, options: Options): Container

    /**
     * get the value of a cookie within the Container.
     */
    get(name: string): Value

    /**
     * getAll the cookies in the Container as a map.
     */
    getAll(): Cookies

    /**
     * getString provides the unparsed cookie string.
     */
    getString(): string

    /**
     * update the value of the string used to store cookies.
     */
    update(cookies: string): Container

}


