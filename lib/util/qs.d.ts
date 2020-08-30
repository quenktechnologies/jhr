declare type Encoder = (str: string, _: any, charset: string, __: string) => string;
declare type Formatter = (str: string) => string;
declare type DateSerializer = (d: Date) => string;
declare type SortFunction = (a: string, b: string) => number;
declare type Filter = Function;
export interface Options {
    prefix?: string;
    generateArrayPrefix?: string;
    strictNullHandling?: boolean;
    encoder?: Encoder;
    filter?: Filter | any[];
    sort?: SortFunction;
    allowDots?: boolean;
    serializeDate?: DateSerializer;
    formatter?: Formatter;
    encodeValuesOnly?: boolean;
    charset?: string;
    charsetSentinel?: boolean;
    addQueryPrefix?: boolean;
    delimiter?: string;
    encode?: boolean;
    indices?: boolean;
    arrayFormat?: string;
    skipNulls?: boolean;
    format?: string;
}
/**
 * @private
 */
export declare const formats: any;
/**
 * stringify the target object into a valid query string.
 */
export declare function stringify(target: any, opts?: Options): string;
export {};
