/**
 * Cookies
 * Originally from:
 * https://github.com/voltace/browser-cookies/blob/master/src/browser-cookies.js
 * License: Public Domain
 */
export declare class Jar {
    defaults: any;
    set(name: string, value: any, options: any): void;
    get(name: string): string;
    erase(name: string, options: any): void;
}
export declare const Cookies: Jar;
