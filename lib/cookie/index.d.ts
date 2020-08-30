import { Maybe } from '@quenk/noni/lib/data/maybe';
/**
 * Name of a Cookie.
 */
export declare type Name = string;
/**
 * Value of a Cookie
 */
export declare type Value = string;
/**
 * SetCookieHeader is a string in the format of the SetCookie header.
 */
export declare type SetCookieHeader = string;
/**
 * CookieHeader is a string in the format of the Cookie header.
 */
export declare type CookieHeader = string;
/**
 * Cookies is a map of zero or more Cookie objects.
 *
 * The key consists of the the name,domain and path value joined together
 * by ;;;.
 */
export interface Cookies {
    [key: string]: Cookie;
}
/**
 * Cookie reprensents an HTTP cookie sent via the Set-Cookie header.
 */
export interface Cookie {
    /**
     * name of the Cookie.
     */
    name: Name;
    /**
     * value of the Cookie.
     */
    value: Value;
    /**
     * expires is the time when the Cookie should be considered no longer valid.
     */
    expires?: Date;
    /**
     * maxAge is an alternative to expires (in seconds).
     */
    maxAge?: number;
    /**
     * domain to restrict access to the Cookie to.
     */
    domain?: string;
    /**
     * path of the domain the Cookie belongs to.
     */
    path?: string;
    /**
     * secure indicates whether the Cookie should only be transmitted on
     * secure connections.
     */
    secure?: boolean;
    /**
     * httpOnly indicates whether the Cookie should be restricted from
     * client-side scripts.
     */
    httpOnly?: boolean;
    /**
     * sameSite attribute.
     */
    sameSite?: string;
    /**
     * created is the Date the cookie was created.
     *
     * Consider this property read-only.
     */
    created: Date;
}
/**
 * fromCookieHeader creates a Cookies map from a string compliant with the
 * value of the Cookie header.
 *
 * Note: Only the name and value is available in this header and as a result
 * only those fields will be available in the individual Cookie objects.
 */
export declare const fromCookieHeader: (str: string) => Cookies;
/**
 * fromList constructs a Cookies object from a list of Cookie objects.
 */
export declare const fromList: (list: Cookie[]) => Cookies;
/**
 * getCookieByName retrieves a Cookie object from a map using its name.
 *
 * The path is not considered by this function.
 */
export declare const getCookieByName: (store: Cookies, name: Name) => Maybe<Cookie>;
/**
 * toCookieHeader converts a Cookies map into a string suitable for use as the
 * value of the Cookie header.
 */
export declare const toCookieHeader: (store: Cookies) => CookieHeader;
