import * as json from '@quenk/noni/lib/data/json';
import { Except } from '@quenk/noni/lib/control/error';
import { Parser } from './';
/**
 * Options for the JSON parser.
 */
export interface Options {
    /**
     * prefix is a sequence that will be stripped from the payload before
     * parsing.
     *
     * This is a counter-measure for avoiding a known exploit of JSON apis
     * the retunr arrays instead of objects however a top level array is actually
     * NOT valid JSON.
     */
    prefix?: RegExp;
    /**
     * lenient if true, will return undefined when parsing fails instead of
     * raising an error.
     */
    lenient?: boolean;
}
/**
 * JSONParser parse a string representing a request body into an object.
 *
 * The optional options argument can be specified to modify its behaviour.
 */
export declare class JSONParser<D extends json.Object> implements Parser<string, D> {
    options: Partial<Options>;
    responseType: string;
    accepts: string;
    constructor(options?: Partial<Options>);
    opts: Options & Partial<Options>;
    apply(body: string): Except<D>;
}
