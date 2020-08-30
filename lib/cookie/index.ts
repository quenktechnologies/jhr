import { make, pickValue, merge, mapTo } from '@quenk/noni/lib/data/record';
import { Maybe } from '@quenk/noni/lib/data/maybe';

/**
 * Name of a Cookie.
 */
export type Name = string;

/**
 * Value of a Cookie
 */
export type Value = string;

/**
 * SetCookieHeader is a string in the format of the SetCookie header.
 */
export type SetCookieHeader = string;

/**
 * CookieHeader is a string in the format of the Cookie header.
 */
export type CookieHeader = string;

/**
 * Cookies is a map of zero or more Cookie objects.
 *
 * The key consists of the the name,domain and path value joined together
 * by ;;;.
 */
export interface Cookies {

    [key: string]: Cookie

}

/**
 * Cookie reprensents an HTTP cookie sent via the Set-Cookie header.
 */
export interface Cookie {

    /**
     * name of the Cookie.
     */
    name: Name,

    /**
     * value of the Cookie.
     */
    value: Value,

    /**
     * expires is the time when the Cookie should be considered no longer valid.
     */
    expires?: Date,

    /**
     * maxAge is an alternative to expires (in seconds).
     */
    maxAge?: number,

    /**
     * domain to restrict access to the Cookie to.
     */
    domain?: string,

    /**
     * path of the domain the Cookie belongs to.
     */
    path?: string,

    /**
     * secure indicates whether the Cookie should only be transmitted on
     * secure connections.
     */
    secure?: boolean,

    /**
     * httpOnly indicates whether the Cookie should be restricted from
     * client-side scripts.
     */
    httpOnly?: boolean,

    /**
     * sameSite attribute.
     */
    sameSite?: string,

    /**
     * created is the Date the cookie was created.
     *
     * Consider this property read-only.
     */
    created: Date

}

/**
 * fromCookieHeader creates a Cookies map from a string compliant with the
 * value of the Cookie header.
 *
 * Note: Only the name and value is available in this header and as a result
 * only those fields will be available in the individual Cookie objects.
 */
export const fromCookieHeader = (str: string): Cookies => {

    let rec: Cookies = make();
    let cookies = str.split(';');
    let created = new Date();

    for (let i = 0; i < cookies.length; i++) {

        let cookie = cookies[i];
        let cookieLength = cookie.length;
        let delimIdx = cookie.indexOf('=');

        delimIdx = delimIdx < 0 ? cookieLength : delimIdx;

        let name = decodeURIComponent(
            cookie.substring(0, delimIdx)
                .replace(/^\s+|\s+$/g, '')
        );

        let value = decodeURIComponent(
            cookie.substring(delimIdx + 1, cookieLength)
        );

        let c = { name, value, created };
        rec[getPath(c)] = c;

    }

    return rec;

}

/**
 * fromList constructs a Cookies object from a list of Cookie objects.
 */
export const fromList = (list: Cookie[]): Cookies =>
    list.reduce((p, c) => merge(p, { [getPath(c)]: c }), {});

const getPath = (c: Cookie) => [c.name, c.domain, c.path].join(';;');

/**
 * getCookieByName retrieves a Cookie object from a map using its name.
 *
 * The path is not considered by this function.
 */
export const getCookieByName = (store: Cookies, name: Name): Maybe<Cookie> =>
    pickValue(store, c => c.name === name);

/**
 * toCookieHeader converts a Cookies map into a string suitable for use as the
 * value of the Cookie header.
 */
export const toCookieHeader = (store: Cookies): CookieHeader =>
    mapTo(store, c => `${c.name}=${c.value}`).join('; ');
