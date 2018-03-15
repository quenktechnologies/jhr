import * as Promise from 'bluebird';

export {MemJar} from './MemJar';

/**
 * CookieOptions used when creating cookies.
 */
export interface CookieOptions {

    /**
     * expires datae.
     */
    expires?: number,

    /**
     * domain to associate the cookie with.
     */
    domain?: string,

    /**
     * path the cookie belongs to.
     */
    path?: string,

    /**
     * secure indicates whether the cookie requires SSL/TLS.
     */
    secure?: boolean,

    /**
     *httpOnly indicates whether the cookie can not be accessed by client-side scripts.
     */
    httpOnly?: boolean

}

/**
 * Cookies is a map of key cookie values.
 */
export interface Cookies {

    [key: string]: string

}

/**
 * Jar provides a container for manipulating cookie values.
 *
 * Implementations may choose to store values in memory, on disk or
 * otherwise. Regardless, the API here assumes asynchrony.
 */
export interface Jar {

    /**
     * set the value of a cookie within the Jar.
     */
    set(name: string, value: string, options: CookieOptions): Promise<Jar>

    /**
     * get the value of a cookie within the Jar.
     */
    get(name: string): Promise<string>

    /**
     * getAll the cookies in the Jar as a map.
     */
    getAll(): Promise<Cookies>

    /**
     * update the value of the string used to store cookies.
     */
    update(cookies: string): Promise<Jar>

}


