/**
 * Value type.
 */
export declare type Value = string;
/**
 * CookieOptions used when creating cookies.
 */
export interface Options {
    /**
     * expires datae.
     */
    expires?: number;
    /**
     * domain to associate the cookie with.
     */
    domain?: string;
    /**
     * path the cookie belongs to.
     */
    path?: string;
    /**
     * secure indicates whether the cookie requires SSL/TLS.
     */
    secure?: boolean;
    /**
     *httpOnly indicates whether the cookie can not be accessed by
     *client-side scripts.
     */
    httpOnly?: boolean;
}
/**
 * Cookies is a map of key cookie values.
 */
export interface Cookies {
    [key: string]: Value;
}
