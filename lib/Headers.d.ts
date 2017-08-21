export declare const CONTENT_TYPE = "Content-Type";
export declare const ACCEPTS = "Accept";
export interface Map {
    [key: string]: string | string[];
}
/**
 * Headers
 */
export declare class Headers {
    /**
     * parse a string of headers into an object.
     */
    parse(str: string): Map;
    /**
     * set headers on an XMLHttpRequest object.
     * @param {XMLHttpRequest} xhr
     * @param {object} ..headers
     */
    set(xhr: XMLHttpRequest, ...args: Map[]): void;
}
