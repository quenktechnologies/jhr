import * as json from '@quenk/noni/lib/data/json';
import { Except } from '@quenk/noni/lib/control/error';
import { Parser } from './';
/**
 * JSONParser
 */
export declare class JSONParser<D extends json.Object> implements Parser<string, D> {
    prefix: RegExp;
    responseType: string;
    accepts: string;
    constructor(prefix?: RegExp);
    apply(body: string): Except<D>;
}
