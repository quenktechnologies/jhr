/**
 * OutgoingHeaders are serialized and sent with a [[Request]].
 */
export interface OutgoingHeaders {
    [key: string]: string;
}
/**
 * IncommingHeaders parsed from a [[Response]].
 */
export interface IncommingHeaders {
    [key: string]: string | string[];
}
/**
 * fromString a string of headers into an object.
 */
export declare const fromString: (headers: string) => IncommingHeaders;
/**
 * set headers on an XMLHttpRequest object.
 */
export declare const set: (xhr: XMLHttpRequest, ...args: IncommingHeaders[]) => void;
