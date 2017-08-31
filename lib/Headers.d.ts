export declare const CONTENT_TYPE = "Content-Type";
export declare const ACCEPTS = "Accept";
export interface Map {
    [key: string]: string | string[];
}
/**
 * parse a string of headers into an object.
 */
export declare const parse: (str: string) => Map;
/**
 * set headers on an XMLHttpRequest object.
 */
export declare const set: (xhr: XMLHttpRequest, ...args: Map[]) => void;
